import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Undo2, Clock } from "lucide-react";
import { PersonalEvent } from "@/data/religiousEvents";

interface UndoToastProps {
  deletedEvent: PersonalEvent;
  onUndo: (event: PersonalEvent) => void;
  onExpire: () => void;
}

export const showUndoToast = (
  deletedEvent: PersonalEvent,
  onUndo: (event: PersonalEvent) => void,
  onExpire: () => void
) => {
  let timeLeft = 5;
  let countdownInterval: NodeJS.Timeout;
  
  const toastId = toast.success(
    <UndoToastContent 
      deletedEvent={deletedEvent}
      onUndo={() => {
        clearInterval(countdownInterval);
        onUndo(deletedEvent);
        toast.dismiss(toastId);
      }}
      timeLeft={timeLeft}
    />,
    {
      duration: 5000,
      action: {
        label: "Undo",
        onClick: () => {
          clearInterval(countdownInterval);
          onUndo(deletedEvent);
        }
      }
    }
  );

  // Update countdown every second
  countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      onExpire();
      return;
    }
    
    // Update the toast content with new countdown
    toast.success(
      <UndoToastContent 
        deletedEvent={deletedEvent}
        onUndo={() => {
          clearInterval(countdownInterval);
          onUndo(deletedEvent);
          toast.dismiss(toastId);
        }}
        timeLeft={timeLeft}
      />,
      {
        id: toastId,
        duration: timeLeft * 1000,
        action: {
          label: "Undo",
          onClick: () => {
            clearInterval(countdownInterval);
            onUndo(deletedEvent);
          }
        }
      }
    );
  }, 1000);

  return toastId;
};

interface UndoToastContentProps {
  deletedEvent: PersonalEvent;
  onUndo: () => void;
  timeLeft: number;
}

const UndoToastContent = ({ deletedEvent, onUndo, timeLeft }: UndoToastContentProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1">
        <p className="font-medium">Event deleted</p>
        <p className="text-sm text-gray-600">"{deletedEvent.title}"</p>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          {timeLeft}s
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={onUndo}
          className="h-8 px-3"
        >
          <Undo2 className="h-3 w-3 mr-1" />
          Undo
        </Button>
      </div>
    </div>
  );
};

export default UndoToastContent;