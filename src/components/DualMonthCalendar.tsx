
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

const DualMonthCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const nextMonthDate = addMonths(currentDate, 1);

  const navigatePrevious = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const navigateNext = () => {
    setCurrentDate(addMonths(currentDate, 1));
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
          {days.map((day) => (
            <button
              key={day.getTime()}
              className="h-10 w-10 text-sm hover:bg-gray-100 rounded flex items-center justify-center text-gray-700"
            >
              {format(day, 'd')}
            </button>
          ))}
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
              <span>0 Religious</span>
              <span>0 Personal</span>
            </div>
          </div>
          <p className="text-gray-600">
            No upcoming events. Try selecting different religions or create your own events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DualMonthCalendar;
