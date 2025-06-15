
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday } from "date-fns";
import { getEventsForDateRange, ReligiousEvent } from "@/data/religiousEvents";

interface DualMonthCalendarProps {
  selectedReligions: string[];
}

const DualMonthCalendar = ({ selectedReligions }: DualMonthCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const nextMonthDate = addMonths(currentDate, 1);

  const navigatePrevious = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const navigateNext = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Get events for the current and next month
  const currentMonthStart = startOfMonth(currentDate);
  const nextMonthEnd = endOfMonth(nextMonthDate);
  const events = getEventsForDateRange(currentMonthStart, nextMonthEnd, selectedReligions);

  // Get upcoming events (next 30 days)
  const today = new Date();
  const thirtyDaysFromNow = addMonths(today, 1);
  const upcomingEvents = getEventsForDateRange(today, thirtyDaysFromNow, selectedReligions)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const hasEventOnDate = (date: Date): boolean => {
    return events.some(event => isSameDay(event.date, date));
  };

  const getEventTypeColor = (type: string): string => {
    switch (type) {
      case "holiday":
        return "bg-red-100 border-red-300";
      case "celebration":
        return "bg-yellow-100 border-yellow-300";
      case "observance":
        return "bg-blue-100 border-blue-300";
      case "fast":
        return "bg-purple-100 border-purple-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
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
            const dayEvents = events.filter(event => isSameDay(event.date, day));
            const isCurrentDay = isToday(day);
            
            return (
              <button
                key={day.getTime()}
                className={`h-10 w-10 text-sm rounded flex items-center justify-center relative ${
                  isCurrentDay 
                    ? 'bg-blue-600 text-white font-bold' 
                    : hasEvent 
                    ? 'bg-green-100 text-green-800 font-semibold hover:bg-green-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={dayEvents.length > 0 ? dayEvents.map(e => e.title).join(', ') : undefined}
              >
                {format(day, 'd')}
                {hasEvent && !isCurrentDay && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Calendar</h1>
          <p className="text-gray-600">View events and festivals for your selected religions.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
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
              <span>{upcomingEvents.length} Religious</span>
              <span>0 Personal</span>
            </div>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                      {event.religion}
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
                ? "Select religions from the sidebar to see upcoming events." 
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
