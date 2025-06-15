
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Users, Heart, HandHeart, Church } from "lucide-react";

interface FaithEvent {
  id: string;
  title: string;
  time: string;
  type: "prayer" | "service" | "study" | "fellowship" | "outreach";
  description?: string;
}

interface EventCardProps {
  event: FaithEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "prayer":
        return <Heart className="h-4 w-4" />;
      case "service":
        return <Church className="h-4 w-4" />;
      case "study":
        return <BookOpen className="h-4 w-4" />;
      case "fellowship":
        return <Users className="h-4 w-4" />;
      case "outreach":
        return <HandHeart className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "prayer":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "service":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "study":
        return "bg-green-100 text-green-800 border-green-200";
      case "fellowship":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "outreach":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getEventIcon(event.type)}
            <h3 className="font-semibold text-gray-800">{event.title}</h3>
          </div>
          <Badge variant="outline" className={getEventColor(event.type)}>
            {event.type}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{event.time}</span>
        </div>
        {event.description && (
          <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
