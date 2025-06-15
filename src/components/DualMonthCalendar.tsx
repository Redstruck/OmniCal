
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
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

  const getEventTypeColor = (event: CalendarEvent): string => {
    if (event.type === "personal") {
      return "bg-purple-100 border-purple-300";
    }
    
    const religion = (event as any).religion;
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

  const getCalendarDayColor = (date: Date): string => {
    const dayEvents = allEvents.filter(event => isSameDay(event.date, date));
    if (dayEvents.length === 0) return "";

    const hasPersonalEvent = dayEvents.some(event => event.type === "personal");
    if (hasPersonalEvent) {
      return "bg-purple-100 text-purple-800 border-purple-200";
    }

    const firstReligiousEvent = dayEvents.find(event => event.type !== "personal");
    if (firstReligiousEvent) {
      const religion = (firstReligiousEvent as any).religion;
      switch (religion) {
        case "Christianity":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "Islam":
          return "bg-green-100 text-green-800 border-green-200";
        case "Judaism":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "Hinduism":
          return "bg-orange-100 text-orange-800 border-orange-200";
        case "Buddhism":
          return "bg-teal-100 text-teal-800 border-teal-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{format(date, 'MMMM yyyy')}</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-sm font-semibold text-gray-500 py-3">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={index} className="h-12"></div>
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
                      className={`h-12 w-12 text-sm rounded-xl flex items-center justify-center relative transition-all duration-200 hover:scale-105 ${
                        isCurrentDay 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg' 
                          : hasEvent 
                          ? `${dayColorClass} font-semibold hover:shadow-md border` 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {format(day, 'd')}
                      {hasEvent && !isCurrentDay && (
                        <div className="absolute -bottom-1 -right-1 flex gap-1">
                          {dayEvents.slice(0, 3).map((event, index) => (
                            <div 
                              key={index} 
                              className={`w-2 h-2 rounded-full shadow-sm ${
                                event.type === "personal" ? "bg-purple-600" :
                                (event as any).religion === "Christianity" ? "bg-blue-600" :
                                (event as any).religion === "Islam" ? "bg-green-600" :
                                (event as any).religion === "Judaism" ? "bg-yellow-600" :
                                (event as any).religion === "Hinduism" ? "bg-orange-600" :
                                (event as any).religion === "Buddhism" ? "bg-teal-600" :
                                "bg-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 bg-white border shadow-xl rounded-xl animate-fade-in">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <h4 className="font-semibold text-gray-900">
                          {format(day, 'EEEE, MMMM d, yyyy')}
                        </h4>
                      </div>
                      {dayEvents.map((event) => (
                        <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event)} hover-lift`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-800">{event.title}</span>
                            <span className="text-xs px-2 py-1 bg-white rounded-md font-medium text-gray-600 shadow-sm">
                              {event.type === "personal" ? "Personal" : (event as any).religion}
                            </span>
                          </div>
                          {event.description && (
                            <p className="text-sm text-gray-600 mt-2">{event.description}</p>
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
                className={`h-12 w-12 text-sm rounded-xl flex items-center justify-center relative transition-all duration-200 hover:scale-105 ${
                  isCurrentDay 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg' 
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
    <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar Dashboard</h1>
            <p className="text-gray-600">View events and festivals for your selected religions.</p>
          </div>
          <AddEventDialog onAddEvent={handleAddEvent} />
        </div>

        <div className="modern-card p-8 mb-8">
          <div className="flex items-center justify-center mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={navigatePrevious}
              className="hover:bg-gray-100 rounded-xl hover-lift"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-16 mx-12">
              {renderCalendar(currentDate)}
              {renderCalendar(nextMonthDate)}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={navigateNext}
              className="hover:bg-gray-100 rounded-xl hover-lift"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="modern-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">{religiousEventsCount} Religious</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">{personalEventsCount} Personal</span>
              </div>
            </div>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-4 rounded-xl border ${getEventTypeColor(event)} hover-lift`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-lg">{event.title}</h4>
                    <span className="text-xs px-3 py-1 bg-white rounded-full font-medium text-gray-600 shadow-sm">
                      {event.type === "personal" ? "Personal" : (event as any).religion}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 font-medium">{format(event.date, 'EEEE, MMMM d, yyyy')}</p>
                  {event.description && (
                    <p className="text-sm text-gray-500">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                {selectedReligions.length === 0 
                  ? "Select religions from the sidebar to see upcoming events or add your own personal events." 
                  : "No upcoming events. Try selecting different religions or create your own events."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DualMonthCalendar;
