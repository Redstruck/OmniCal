
import { Search, Bell, User, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface NavigationProps {
  onViewChange: (mode: "dashboard" | "calendar" | "events") => void;
  currentView: "dashboard" | "calendar" | "events";
}

const Navigation = ({
  onViewChange,
  currentView
}: NavigationProps) => {
  const [sliderStyle, setSliderStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const updateSlider = () => {
      const activeButton = buttonRefs.current[currentView];
      if (activeButton && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        setSliderStyle({
          width: buttonRect.width,
          height: buttonRect.height,
          transform: `translateX(${buttonRect.left - navRect.left}px)`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        });
      }
    };

    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [currentView]);

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
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
          <div className="flex items-center gap-2 relative" ref={navRef}>
            {/* Sliding background */}
            <div 
              className="absolute bg-blue-600 rounded-lg shadow-lg z-0"
              style={sliderStyle}
            />
            
            <Button 
              ref={(el) => buttonRefs.current['dashboard'] = el}
              variant="ghost" 
              className={`relative z-10 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                currentView === "dashboard" 
                  ? "text-white hover:text-white" 
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
              }`} 
              onClick={() => onViewChange("dashboard")}
            >
              Home
            </Button>
            <Button 
              ref={(el) => buttonRefs.current['calendar'] = el}
              variant="ghost" 
              className={`relative z-10 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                currentView === "calendar" 
                  ? "text-white hover:text-white" 
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
              }`} 
              onClick={() => onViewChange("calendar")}
            >
              Calendar
            </Button>
            <Button 
              ref={(el) => buttonRefs.current['events'] = el}
              variant="ghost" 
              className={`relative z-10 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                currentView === "events" 
                  ? "text-white hover:text-white" 
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
              }`}
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
    </nav>
  );
};

export default Navigation;
