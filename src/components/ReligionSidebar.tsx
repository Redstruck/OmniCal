
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, Cross, Star, Flower, Om, Zap } from "lucide-react";
import { useState } from "react";

interface ReligionSidebarProps {
  selectedReligions: string[];
  onReligionChange: (religions: string[]) => void;
}

const ReligionSidebar = ({
  selectedReligions,
  onReligionChange
}: ReligionSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const religions = [
    { name: "Christianity", icon: Cross, color: "bg-blue-500" },
    { name: "Islam", icon: Star, color: "bg-green-500" },
    { name: "Hinduism", icon: Om, color: "bg-orange-500" },
    { name: "Buddhism", icon: Flower, color: "bg-teal-500" },
    { name: "Judaism", icon: Zap, color: "bg-yellow-500" }
  ];

  const handleReligionChange = (religion: string, checked: boolean) => {
    let updatedReligions;
    if (checked) {
      updatedReligions = [...selectedReligions, religion];
    } else {
      updatedReligions = selectedReligions.filter(r => r !== religion);
    }
    onReligionChange(updatedReligions);
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-80'} bg-white border-r border-gray-200/50 transition-all duration-300 ease-in-out shadow-sm`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <div>
              <h3 className="text-gray-900 font-bold text-2xl mb-1">Religions</h3>
              <p className="text-gray-500 text-sm">Select religions to view events</p>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-gray-100 rounded-lg"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="space-y-3">
          {religions.map(religion => {
            const Icon = religion.icon;
            const isSelected = selectedReligions.includes(religion.name);
            
            return (
              <div 
                key={religion.name} 
                className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group ${
                  isSelected ? 'bg-blue-50 border border-blue-200' : 'border border-transparent'
                }`}
                onClick={() => handleReligionChange(religion.name, !isSelected)}
              >
                <Checkbox 
                  id={religion.name} 
                  checked={isSelected}
                  onCheckedChange={(checked) => handleReligionChange(religion.name, checked as boolean)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <div className={`p-2 rounded-lg ${religion.color} shadow-sm`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1">
                    <label 
                      htmlFor={religion.name} 
                      className="text-sm font-medium text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors"
                    >
                      {religion.name}
                    </label>
                    <div className={`w-full h-1 rounded-full mt-1 ${religion.color} opacity-20`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isCollapsed && selectedReligions.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {selectedReligions.length} religion{selectedReligions.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex flex-wrap gap-1">
              {selectedReligions.map(religion => (
                <span key={religion} className="px-2 py-1 bg-white rounded-lg text-xs font-medium text-gray-600 shadow-sm">
                  {religion}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReligionSidebar;
