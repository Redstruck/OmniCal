import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navigation = () => {
  return <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-gray-900">Calendar</span>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              Calendar
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              Events
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              Settings
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input type="text" placeholder="Search events..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          
          
        </div>
      </div>
    </nav>;
};
export default Navigation;