
import Navigation from "@/components/Navigation";
import ReligionSidebar from "@/components/ReligionSidebar";
import DualMonthCalendar from "@/components/DualMonthCalendar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex">
        <ReligionSidebar />
        <DualMonthCalendar />
      </div>
    </div>
  );
};

export default Index;
