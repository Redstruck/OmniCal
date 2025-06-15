import { Search, Bell, User, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
interface NavigationProps {
  onViewChange: (mode: "dashboard" | "calendar" | "events") => void;
  currentView: "dashboard" | "calendar" | "events";
}
const Navigation = ({
  onViewChange,
  currentView
}: NavigationProps) => {
  return <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden">
              <img src="/lovable-uploads/1b93c5df-355c-4fe4-bfd6-b9054c785489.png" alt="Religious Calendar Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-xl text-gradient">Calendar</span>
              <p className="text-xs text-gray-500">Religious Events</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={currentView === "dashboard" ? "default" : "ghost"} className={`rounded-lg px-4 py-2 font-medium transition-all ${currentView === "dashboard" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"}`} onClick={() => onViewChange("dashboard")}>
              Home
            </Button>
            <Button variant={currentView === "calendar" ? "default" : "ghost"} className={`rounded-lg px-4 py-2 font-medium transition-all ${currentView === "calendar" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"}`} onClick={() => onViewChange("calendar")}>
              Calendar
            </Button>
            <Button 
              variant={currentView === "events" ? "default" : "ghost"} 
              className={`rounded-lg px-4 py-2 font-medium transition-all ${currentView === "events" ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"}`}
              onClick={() => onViewChange("events")}
            >
              Events
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            
            
          </div>
          <Button variant="ghost" size="icon" className="relative hover:bg-gray-100/80 rounded-xl">
            <Bell className="h-5 w-5 text-gray-600" />
            
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100/80 rounded-xl">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </nav>;
};
export default Navigation;
