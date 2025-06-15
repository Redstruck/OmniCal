
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const ReligionSidebar = () => {
  const [selectedReligions, setSelectedReligions] = useState<string[]>([]);

  const religions = [
    "Christianity",
    "Islam", 
    "Hinduism",
    "Buddhism",
    "Judaism"
  ];

  const handleReligionChange = (religion: string, checked: boolean) => {
    if (checked) {
      setSelectedReligions([...selectedReligions, religion]);
    } else {
      setSelectedReligions(selectedReligions.filter(r => r !== religion));
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Religions</h3>
      <div className="space-y-3">
        {religions.map((religion) => (
          <div key={religion} className="flex items-center space-x-2">
            <Checkbox
              id={religion}
              checked={selectedReligions.includes(religion)}
              onCheckedChange={(checked) => handleReligionChange(religion, checked as boolean)}
            />
            <label
              htmlFor={religion}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {religion}
            </label>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full mt-6 text-gray-600">
        Add Religion
      </Button>
    </div>
  );
};

export default ReligionSidebar;
