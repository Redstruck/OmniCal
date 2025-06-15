
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ReligionSidebar from "@/components/ReligionSidebar";
import DualMonthCalendar from "@/components/DualMonthCalendar";

const Index = () => {
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);

  const handleReligionChange = (religions: string[]) => {
    setSelectedReligions(religions);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex">
        <ReligionSidebar 
          selectedReligions={selectedReligions}
          onReligionChange={handleReligionChange}
        />
        <DualMonthCalendar selectedReligions={selectedReligions} />
      </div>
    </div>
  );
};

export default Index;
