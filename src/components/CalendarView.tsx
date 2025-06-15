
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EventCard from "./EventCard";
import { format } from "date-fns";

interface FaithEvent {
  id: string;
  title: string;
  time: string;
  type: "prayer" | "service" | "study" | "fellowship" | "outreach";
  description?: string;
}

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Sample faith-based events
  const events: Record<string, FaithEvent[]> = {
    [format(new Date(), "yyyy-MM-dd")]: [
      {
        id: "1",
        title: "Morning Prayer",
        time: "7:00 AM",
        type: "prayer",
        description: "Start the day with gratitude and reflection"
      },
      {
        id: "2",
        title: "Bible Study Group",
        time: "7:00 PM",
        type: "study",
        description: "Weekly discussion on the Book of Psalms"
      }
    ],
    [format(new Date(Date.now() + 86400000), "yyyy-MM-dd")]: [
      {
        id: "3",
        title: "Sunday Service",
        time: "10:00 AM",
        type: "service",
        description: "Weekly worship service"
      },
      {
        id: "4",
        title: "Youth Fellowship",
        time: "6:00 PM",
        type: "fellowship",
        description: "Games, food, and faith sharing for young adults"
      }
    ]
  };

  const selectedDateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const dayEvents = events[selectedDateKey] || [];

  const eventDates = Object.keys(events).map(dateStr => new Date(dateStr));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-800">
            {selectedDate ? format(selectedDate, "MMMM yyyy") : "Select a Date"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border shadow-sm"
            modifiers={{
              hasEvents: eventDates,
            }}
            modifiersStyles={{
              hasEvents: {
                backgroundColor: "#e0f2fe",
                color: "#0369a1",
                fontWeight: "bold",
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Events Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">
            {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "Select a Date"}
          </CardTitle>
          {dayEvents.length > 0 && (
            <Badge variant="secondary" className="w-fit">
              {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {dayEvents.length > 0 ? (
            dayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">No events scheduled</p>
              <p className="text-sm">Take time for personal reflection and prayer</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
