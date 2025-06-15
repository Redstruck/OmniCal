
import { useState } from "react";
import { CalendarIcon, Clock, MapPin, Users, BookOpen, Heart, HandHeart, Church } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isTomorrow } from "date-fns";
import { getAllEventsForDateRange, CalendarEvent, PersonalEvent, ReligiousEvent, getEventDuration } from "@/data/religiousEvents";

interface EventsViewProps {
  selectedReligions: string[];
  personalEvents?: PersonalEvent[];
}

const EventsView = ({ selectedReligions, personalEvents = [] }: EventsViewProps) => {
  // Get events for the next 6 months
  const today = new Date();
  const sixMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  const allEvents = getAllEventsForDateRange(today, sixMonthsFromNow, selectedReligions, personalEvents)
    .sort((a, b) => {
      const aDate = a.type === "personal" ? a.date : (a as ReligiousEvent).startDate;
      const bDate = b.type === "personal" ? b.date : (b as ReligiousEvent).startDate;
      return aDate.getTime() - bDate.getTime();
    });

  const getEventIcon = (event: CalendarEvent) => {
    if (event.type === "personal") {
      return <CalendarIcon className="h-6 w-6" />;
    }
    
    const religEvent = event as ReligiousEvent;
    switch (religEvent.type) {
      case "holiday":
      case "celebration":
        return <Heart className="h-6 w-6" />;
      case "observance":
      case "ceremony":
        return <Church className="h-6 w-6" />;
      case "fast":
        return <Clock className="h-6 w-6" />;
      default:
        return <CalendarIcon className="h-6 w-6" />;
    }
  };

  const getEventTypeColor = (event: CalendarEvent): string => {
    if (event.type === "personal") {
      return "bg-purple-500";
    }
    
    const religion = (event as any).religion;
    switch (religion) {
      case "Christianity":
        return "bg-blue-500";
      case "Islam":
        return "bg-green-500";
      case "Judaism":
        return "bg-yellow-500";
      case "Hinduism":
        return "bg-orange-500";
      case "Buddhism":
        return "bg-teal-500";
      default:
        return "bg-gray-500";
    }
  };

  const getEventCardColor = (event: CalendarEvent): string => {
    if (event.type === "personal") {
      return "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200";
    }
    
    const religion = (event as any).religion;
    switch (religion) {
      case "Christianity":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
      case "Islam":
        return "bg-gradient-to-br from-green-50 to-green-100 border-green-200";
      case "Judaism":
        return "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200";
      case "Hinduism":
        return "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200";
      case "Buddhism":
        return "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200";
    }
  };

  const getDateLabel = (date: Date): string => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMMM d, yyyy");
  };

  const getEventDateDisplay = (event: CalendarEvent): string => {
    if (event.type === "personal") {
      return getDateLabel(event.date);
    } else {
      const religEvent = event as ReligiousEvent;
      if (religEvent.endDate) {
        const duration = getEventDuration(religEvent);
        return `${getDateLabel(religEvent.startDate)} - ${format(religEvent.endDate, 'MMMM d, yyyy')} (${duration} days)`;
      } else {
        return getDateLabel(religEvent.startDate);
      }
    }
  };

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Events</h1>
          <p className="text-gray-600 text-lg">Comprehensive view of all your upcoming religious festivals and personal events</p>
          <div className="mt-6 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Religious Events ({allEvents.filter(e => e.type !== "personal").length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Personal Events ({allEvents.filter(e => e.type === "personal").length})</span>
            </div>
          </div>
        </div>

        {allEvents.length > 0 ? (
          <div className="grid gap-6">
            {allEvents.map((event) => (
              <Card key={event.id} className={`${getEventCardColor(event)} border-2 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${getEventTypeColor(event)} text-white shadow-lg`}>
                        {getEventIcon(event)}
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{event.title}</CardTitle>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{getEventDateDisplay(event)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="text-sm px-3 py-1 font-medium">
                        {event.type === "personal" ? "Personal Event" : (event as any).religion}
                      </Badge>
                      {event.type !== "personal" && (event as ReligiousEvent).endDate && (
                        <Badge variant="secondary" className="text-xs px-2 py-1">
                          {getEventDuration(event as ReligiousEvent)} days
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {event.description && (
                    <div className="bg-white/50 rounded-lg p-4">
                      <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
                    </div>
                  )}
                  
                  {event.type !== "personal" && (event as ReligiousEvent).significance && (
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Significance
                      </h4>
                      <p className="text-gray-700">{(event as ReligiousEvent).significance}</p>
                    </div>
                  )}
                  
                  {event.type !== "personal" && (event as ReligiousEvent).traditions && (
                    <div className="bg-white/70 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Traditions & Practices
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {(event as ReligiousEvent).traditions?.map((tradition, idx) => (
                          <span 
                            key={idx} 
                            className="text-sm bg-white px-3 py-2 rounded-full text-gray-700 border font-medium text-center"
                          >
                            {tradition}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <CalendarIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Upcoming Events</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              {selectedReligions.length === 0 
                ? "Select religions from the sidebar to see upcoming festivals and observances, or add your own personal events." 
                : "No upcoming events found. Try selecting different religions or create your own events."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsView;
