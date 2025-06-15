
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday } from "date-fns";
import { getAllEventsForDateRange, getEventsForDateRange, CalendarEvent, PersonalEvent } from "@/data/religiousEvents";
import AddEventDialog from "./AddEventDialog";

interface DualMonthCalendarProps {
  selectedReligions: string[];
}

const DualMonthCalendar = ({ selectedReligions }: DualMonthCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [personalEvents, setPersonalEvents] = useState<PersonalEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const navigatePrevious = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const navigateNext = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleAddEvent = (newEvent: PersonalEvent) => {
    setPersonalEvents(prev => [...prev, newEvent]);
  };

  // Get events for the current and next month
  const currentMonthStart = startOfMonth(currentDate);
  const nextMonthDate = addMonths(currentDate, 1);
  const nextMonthEnd = endOfMonth(nextMonthDate);
  const allEvents = getAllEventsForDateRange(currentMonthStart, nextMonthEnd, selectedReligions, personalEvents);

  // Get upcoming events (next 30 days)
  const today = new Date();
  const thirtyDaysFromNow = addMonths(today, 1);
  const upcomingEvents = getAllEventsForDateRange(today, thirtyDaysFromNow, selectedReligions, personalEvents)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const hasEventOnDate = (date: Date): boolean => {
    return allEvents.some(event => isSameDay(event.date, date));
  };

  const getReligionColor = (religion: string): string => {
    switch (religion) {
      case "Christianity":
        return "bg-blue-100 border-blue-300";
      case "Islam":
        return "bg-green-100 border-green-300";
      case "Judaism":
        return "bg-yellow-100 border-yellow-300";
      case "Hinduism":
        return "bg-orange-100 border-orange-300";
      case "Buddhism":
        return "bg-teal-100 border-teal-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const getEventTypeColor = (event: CalendarEvent): string => {
    if (event.type === "personal") {
      return "bg-purple-100 border-purple-300";
    }
    
    return getReligionColor((event as any).religion);
  };

  const getCalendarDayColor = (date: Date): string => {
    const dayEvents = allEvents.filter(event => isSameDay(event.date, date));
    if (dayEvents.length === 0) return "";

    // If there are personal events, prioritize purple
    const hasPersonalEvent = dayEvents.some(event => event.type === "personal");
    if (hasPersonalEvent) {
      return "bg-purple-100 text-purple-800";
    }

    // Otherwise, use the first religious event's color
    const firstReligiousEvent = dayEvents.find(event => event.type !== "personal");
    if (firstReligiousEvent) {
      const religion = (firstReligiousEvent as any).religion;
      switch (religion) {
        case "Christianity":
          return "bg-blue-100 text-blue-800";
        case "Islam":
          return "bg-green-100 text-green-800";
        case "Judaism":
          return "bg-yellow-100 text-yellow-800";
        case "Hinduism":
          return "bg-orange-100 text-orange-800";
        case "Buddhism":
          return "bg-teal-100 text-teal-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }

    return "";
  };

  const renderCalendar = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startDay = getDay(monthStart);

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
      <div className="bg-white">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-gray-900">{format(date, 'MMMM yyyy')}</h3>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={index} className="h-10"></div>
          ))}
          {days.map((day) => {
            const hasEvent = hasEventOnDate(day);
            const dayEvents = allEvents.filter(event => isSameDay(event.date, day));
            const isCurrentDay = isToday(day);
            const dayColorClass = getCalendarDayColor(day);
            
            if (hasEvent) {
              return (
                <Popover key={day.getTime()}>
                  <PopoverTrigger asChild>
                    <button
                      className={`h-10 w-10 text-sm rounded flex items-center justify-center relative ${
                        isCurrentDay 
                          ? 'bg-blue-600 text-white font-bold' 
                          : hasEvent 
                          ? `${dayColorClass} font-semibold hover:opacity-80` 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {format(day, 'd')}
                      {hasEvent && !isCurrentDay && (
                        <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
                          dayEvents.some(e => e.type === "personal") ? "bg-purple-600" :
                          dayEvents.some(e => (e as any).religion === "Christianity") ? "bg-blue-600" :
                          dayEvents.some(e => (e as any).religion === "Islam") ? "bg-green-600" :
                          dayEvents.some(e => (e as any).religion === "Judaism") ? "bg-yellow-600" :
                          dayEvents.some(e => (e as any).religion === "Hinduism") ? "bg-orange-600" :
                          dayEvents.some(e => (e as any).religion === "Buddhism") ? "bg-teal-600" :
                          "bg-gray-600"
                        }`}></div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3 bg-white border shadow-lg">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-900">
                        {format(day, 'MMMM d, yyyy')}
                      </h4>
                      {dayEvents.map((event) => (
                        <div key={event.id} className="text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">{event.title}</span>
                            <span className="text-gray-500">
                              {event.type === "personal" ? "Personal" : (event as any).religion}
                            </span>
                          </div>
                          {event.description && (
                            <p className="text-gray-600 mt-1">{event.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              );
            }
            
            return (
              <button
                key={day.getTime()}
                className={`h-10 w-10 text-sm rounded flex items-center justify-center relative ${
                  isCurrentDay 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const personalEventsCount = upcomingEvents.filter(event => event.type === "personal").length;
  const religiousEventsCount = upcomingEvents.filter(event => event.type !== "personal").length;

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Calendar</h1>
          <p className="text-gray-600">View events and festivals for your selected religions.</p>
        </div>
        <AddEventDialog onAddEvent={handleAddEvent} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center mb-6">
          <Button variant="ghost" size="icon" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-12 mx-8">
            {renderCalendar(currentDate)}
            {renderCalendar(nextMonthDate)}
          </div>
          <Button variant="ghost" size="icon" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>{religiousEventsCount} Religious</span>
              <span>{personalEventsCount} Personal</span>
            </div>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event)}`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                      {event.type === "personal" ? "Personal" : (event as any).religion}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{format(event.date, 'EEEE, MMMM d, yyyy')}</p>
                  {event.description && (
                    <p className="text-sm text-gray-500">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              {selectedReligions.length === 0 
                ? "Select religions from the sidebar to see upcoming events or add your own personal events." 
                : "No upcoming events. Try selecting different religions or create your own events."
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DualMonthCalendar;
