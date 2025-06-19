import { useState, useEffect, useCallback } from "react";
import { PersonalEvent } from "@/data/religiousEvents";
import { auditLogger } from "@/utils/auditLog";
import { toast } from "@/components/ui/sonner";

export const usePersonalEvents = () => {
  const [personalEvents, setPersonalEvents] = useState<PersonalEvent[]>([]);

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

    // Remove from main list permanently
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

    // Log permanent deletion immediately
    auditLogger.logPermanentDeletion(
      eventToDelete.id,
      eventToDelete.title,
      eventToDelete.date
    );

    toast.success("Event deleted successfully");
  }, [personalEvents, saveEvents]);

  return {
    personalEvents,
    addEvent,
    deleteEvent
  };
};