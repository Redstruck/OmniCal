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
  const religions = ["Christianity", "Islam", "Hinduism", "Buddhism", "Judaism"];
  const handleReligionChange = (religion: string, checked: boolean) => {
    let updatedReligions;
    if (checked) {
      updatedReligions = [...selectedReligions, religion];
    } else {
      updatedReligions = selectedReligions.filter(r => r !== religion);
    }
    onReligionChange(updatedReligions);
  };
  return <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 py-[34px] px-[23px]">
      <h3 className="text-gray-900 mb-4 font-semibold text-3xl text-center">Religions</h3>
      <div className="space-y-3">
        {religions.map(religion => <div key={religion} className="flex items-center space-x-2">
            <Checkbox id={religion} checked={selectedReligions.includes(religion)} onCheckedChange={checked => handleReligionChange(religion, checked as boolean)} />
            <label htmlFor={religion} className="text-sm font-medium text-gray-700 cursor-pointer mx-[9px] px-[2px] py-px my-0 bg-transparent">
              {religion}
            </label>
          </div>)}
      </div>
      
    </div>;
};
export default ReligionSidebar;