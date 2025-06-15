import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
interface ReligionSidebarProps {
  selectedReligions: string[];
  onReligionChange: (religions: string[]) => void;
}
const ReligionSidebar = ({
  selectedReligions,
  onReligionChange
}: ReligionSidebarProps) => {
  const religions = [{
    name: "Christianity",
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    borderColor: "border-blue-300",
    textColor: "text-blue-800",
    icon: "✝️",
    description: "Christian holidays & observances"
  }, {
    name: "Islam",
    color: "bg-green-500",
    lightColor: "bg-green-100",
    borderColor: "border-green-300",
    textColor: "text-green-800",
    icon: "☪️",
    description: "Islamic festivals & holy days"
  }, {
    name: "Hinduism",
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
    borderColor: "border-orange-300",
    textColor: "text-orange-800",
    icon: "🕉️",
    description: "Hindu festivals & celebrations"
  }, {
    name: "Buddhism",
    color: "bg-teal-500",
    lightColor: "bg-teal-100",
    borderColor: "border-teal-300",
    textColor: "text-teal-800",
    icon: "☸️",
    description: "Buddhist observances & ceremonies"
  }, {
    name: "Judaism",
    color: "bg-yellow-500",
    lightColor: "bg-yellow-100",
    borderColor: "border-yellow-300",
    textColor: "text-yellow-800",
    icon: "✡️",
    description: "Jewish holidays & traditions"
  }];
  const handleReligionChange = (religion: string, checked: boolean) => {
    let updatedReligions;
    if (checked) {
      updatedReligions = [...selectedReligions, religion];
    } else {
      updatedReligions = selectedReligions.filter(r => r !== religion);
    }
    onReligionChange(updatedReligions);
  };
  return <div className="w-80 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">🌍</span>
          </div>
          <h3 className="text-gray-900 font-bold text-xl">Religious Traditions</h3>
        </div>
        <p className="text-gray-600 text-sm">Select religions to view their festivals and observances</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {religions.map(religion => {
          const isSelected = selectedReligions.includes(religion.name);
          return <div key={religion.name} className={`group relative rounded-xl border-2 transition-all duration-200 hover:shadow-md ${isSelected ? `${religion.lightColor} ${religion.borderColor} shadow-sm` : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <Checkbox id={religion.name} checked={isSelected} onCheckedChange={checked => handleReligionChange(religion.name, checked as boolean)} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          
                          <label htmlFor={religion.name} className={`font-semibold cursor-pointer transition-colors ${isSelected ? religion.textColor : 'text-gray-700'}`}>
                            {religion.name}
                          </label>
                        </div>
                        
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-4 h-4 rounded-full ${religion.color} shadow-sm`}></div>
                      <span className="text-xs text-gray-500 font-medium">Color</span>
                    </div>
                  </div>
                </div>
                
                {isSelected && <div className={`absolute -top-1 -right-1 w-6 h-6 ${religion.color} rounded-full flex items-center justify-center shadow-md animate-scale-in`}>
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>}
              </div>;
        })}
        </div>

        {selectedReligions.length > 0 && <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600 font-semibold text-sm">Active Filters</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedReligions.map(religion => {
            const religionData = religions.find(r => r.name === religion);
            return <div key={religion} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${religionData?.lightColor} ${religionData?.textColor} border ${religionData?.borderColor}`}>
                    <div className={`w-2 h-2 rounded-full ${religionData?.color}`}></div>
                    {religion}
                  </div>;
          })}
            </div>
          </div>}
      </div>
    </div>;
};
export default ReligionSidebar;