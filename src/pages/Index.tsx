import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ReligionSidebar from "@/components/ReligionSidebar";
import DualMonthCalendar from "@/components/DualMonthCalendar";
import EventsView from "@/components/EventsView";

const Index = () => {
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"dashboard" | "calendar" | "events">("dashboard");

  // Load selected religions from localStorage on component mount
  useEffect(() => {
    const savedReligions = localStorage.getItem('selectedReligions');
    if (savedReligions) {
      try {
        const parsedReligions = JSON.parse(savedReligions);
        if (Array.isArray(parsedReligions)) {
          setSelectedReligions(parsedReligions);
        }
      } catch (error) {
        console.error('Error parsing saved religions from localStorage:', error);
      }
    }
  }, []);

  const handleReligionChange = (religions: string[]) => {
    setSelectedReligions(religions);
    // Save to localStorage whenever religions change
    localStorage.setItem('selectedReligions', JSON.stringify(religions));
  };

  const handleViewChange = (mode: "dashboard" | "calendar" | "events") => {
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation onViewChange={handleViewChange} currentView={viewMode} />
      <div className="flex">
        {viewMode === "dashboard" && (
          <ReligionSidebar 
            selectedReligions={selectedReligions}
            onReligionChange={handleReligionChange}
          />
        )}
        {viewMode === "events" ? (
          <EventsView selectedReligions={selectedReligions} />
        ) : (
          <DualMonthCalendar 
            selectedReligions={selectedReligions} 
            viewMode={viewMode}
          />
        )}
      </div>
    </div>
  );
};

export default Index;