
import { Search, Bell, User, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onViewChange: (mode: "dashboard" | "calendar") => void;
  currentView: "dashboard" | "calendar";
}

const Navigation = ({ onViewChange, currentView }: NavigationProps) => {
  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/1b93c5df-355c-4fe4-bfd6-b9054c785489.png" 
                alt="Religious Calendar Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-xl text-gradient">Calendar</span>
              <p className="text-xs text-gray-500">Religious Events</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={currentView === "dashboard" ? "default" : "ghost"} 
              className={`rounded-lg px-4 py-2 font-medium transition-all ${
                currentView === "dashboard" 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
              }`}
              onClick={() => onViewChange("dashboard")}
            >
              Home
            </Button>
            <Button 
              variant={currentView === "calendar" ? "default" : "ghost"} 
              className={`rounded-lg px-4 py-2 font-medium transition-all ${
                currentView === "calendar" 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
              }`}
              onClick={() => onViewChange("calendar")}
            >
              Calendar
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg px-4 py-2 font-medium transition-all"
            >
              Events
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg px-4 py-2 font-medium transition-all"
            >
              Settings
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 w-64" 
            />
          </div>
          <Button variant="ghost" size="icon" className="relative hover:bg-gray-100/80 rounded-xl">
            <Bell className="h-5 w-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100/80 rounded-xl">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
