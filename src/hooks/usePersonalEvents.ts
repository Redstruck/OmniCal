import { useState, useEffect, useCallback } from "react";
import { PersonalEvent } from "@/data/religiousEvents";
import { auditLogger } from "@/utils/auditLog";
import { showUndoToast } from "@/components/UndoToast";
import { toast } from "@/components/ui/sonner";

interface PendingDeletion {
  event: PersonalEvent;
  timeoutId: NodeJS.Timeout;
}

export const usePersonalEvents = () => {
  const [personalEvents, setPersonalEvents] = useState<PersonalEvent[]>([]);
  const [pendingDeletions, setPendingDeletions] = useState<Map<string, PendingDeletion>>(new Map());

  // Load personal events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('personalEvents');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        if (Array.isArray(parsedEvents)) {
          const eventsWithDates = parsedEvents.map(event => ({
            ...event,
            date: new Date(event.date)
          }));
          setPersonalEvents(eventsWithDates);
        }
      } catch (error) {
        console.error('Error parsing saved personal events from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever events change
  const saveEvents = useCallback((events: PersonalEvent[]) => {
    try {
      localStorage.setItem('personalEvents', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving personal events to localStorage:', error);
    }
  }, []);

  const addEvent = useCallback((newEvent: PersonalEvent) => {
    setPersonalEvents(prev => {
      const updated = [...prev, newEvent];
      saveEvents(updated);
      return updated;
    });
  }, [saveEvents]);

  const deleteEvent = useCallback((eventId: string) => {
    const eventToDelete = personalEvents.find(event => event.id === eventId);
    if (!eventToDelete) {
      toast.error("Event not found");
      return;
    }

    // Remove from main list immediately
    setPersonalEvents(prev => {
      const updated = prev.filter(event => event.id !== eventId);
      saveEvents(updated);
      return updated;
    });

    // Log the deletion
    auditLogger.logEventDeletion(
      eventToDelete.id,
      eventToDelete.title,
      eventToDelete.date,
      'User initiated deletion'
    );

    // Set up undo functionality
    const timeoutId = setTimeout(() => {
      // Permanent deletion after 5 seconds
      setPendingDeletions(prev => {
        const newMap = new Map(prev);
        newMap.delete(eventId);
        return newMap;
      });

      auditLogger.logPermanentDeletion(
        eventToDelete.id,
        eventToDelete.title,
        eventToDelete.date
      );

      toast.success("Event permanently deleted");
    }, 5000);

    // Add to pending deletions
    setPendingDeletions(prev => {
      const newMap = new Map(prev);
      newMap.set(eventId, { event: eventToDelete, timeoutId });
      return newMap;
    });

    // Show undo toast
    showUndoToast(
      eventToDelete,
      (event) => restoreEvent(event.id),
      () => {
        // This will be called when the toast expires naturally
        // The timeout above will handle the permanent deletion
      }
    );

  }, [personalEvents, saveEvents]);

  const restoreEvent = useCallback((eventId: string) => {
    const pendingDeletion = pendingDeletions.get(eventId);
    if (!pendingDeletion) {
      toast.error("Cannot restore event - restoration period expired");
      return;
    }

    // Clear the timeout
    clearTimeout(pendingDeletion.timeoutId);

    // Remove from pending deletions
    setPendingDeletions(prev => {
      const newMap = new Map(prev);
      newMap.delete(eventId);
      return newMap;
    });

    // Restore to main list
    setPersonalEvents(prev => {
      const updated = [...prev, pendingDeletion.event].sort((a, b) => a.date.getTime() - b.date.getTime());
      saveEvents(updated);
      return updated;
    });

    // Log the restoration
    auditLogger.logEventRestore(
      pendingDeletion.event.id,
      pendingDeletion.event.title,
      pendingDeletion.event.date
    );

    toast.success("Event restored successfully");
  }, [pendingDeletions, saveEvents]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      pendingDeletions.forEach(({ timeoutId }) => {
        clearTimeout(timeoutId);
      });
    };
  }, [pendingDeletions]);

  return {
    personalEvents,
    addEvent,
    deleteEvent,
    restoreEvent,
    pendingDeletions: Array.from(pendingDeletions.values()).map(pd => pd.event)
  };
};