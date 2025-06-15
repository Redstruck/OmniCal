
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ReligionSidebar from "@/components/ReligionSidebar";
import DualMonthCalendar from "@/components/DualMonthCalendar";

const Index = () => {
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"dashboard" | "calendar" | "events">("dashboard");

  const handleReligionChange = (religions: string[]) => {
    setSelectedReligions(religions);
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
