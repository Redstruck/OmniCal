import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { PersonalEvent } from "@/data/religiousEvents";

interface DeleteEventDialogProps {
  event: PersonalEvent;
  onDelete: (eventId: string) => void;
  disabled?: boolean;
}

const DeleteEventDialog = ({ event, onDelete, disabled = false }: DeleteEventDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete(event.id);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          disabled={disabled}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            Delete Personal Event
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Are you sure you want to delete this personal event?</p>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <p className="font-medium text-gray-900">{event.title}</p>
              <p className="text-sm text-gray-600">
                {event.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              {event.description && (
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              )}
            </div>
            <p className="text-red-600 font-medium">
              This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete Event
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventDialog;