import { addDays, addMonths, format } from "date-fns";

export interface ReligiousEvent {
  id: string;
  title: string;
  date: Date;
  religion: string;
  type: "holiday" | "observance" | "fast" | "celebration";
  description?: string;
}

export interface PersonalEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
  type: "personal";
}

export type CalendarEvent = ReligiousEvent | PersonalEvent;

const currentYear = new Date().getFullYear();

export const religiousEvents: ReligiousEvent[] = [
  // Christianity
  {
    id: "christmas-2024",
    title: "Christmas",
    date: new Date(currentYear, 11, 25), // December 25
    religion: "Christianity",
    type: "holiday",
    description: "Celebration of the birth of Jesus Christ"
  },
  {
    id: "easter-2024",
    title: "Easter Sunday",
    date: new Date(currentYear, 2, 31), // March 31, 2024 (example)
    religion: "Christianity",
    type: "holiday",
    description: "Resurrection of Jesus Christ"
  },
  {
    id: "good-friday-2024",
    title: "Good Friday",
    date: new Date(currentYear, 2, 29), // March 29, 2024
    religion: "Christianity",
    type: "observance",
    description: "Commemoration of the crucifixion of Jesus"
  },
  
  // Islam
  {
    id: "eid-al-fitr-2024",
    title: "Eid al-Fitr",
    date: new Date(currentYear, 3, 10), // April 10, 2024 (example)
    religion: "Islam",
    type: "celebration",
    description: "Festival of Breaking the Fast"
  },
  {
    id: "eid-al-adha-2024",
    title: "Eid al-Adha",
    date: new Date(currentYear, 5, 16), // June 16, 2024 (example)
    religion: "Islam",
    type: "celebration",
    description: "Festival of Sacrifice"
  },
  {
    id: "ramadan-start-2024",
    title: "Ramadan Begins",
    date: new Date(currentYear, 2, 11), // March 11, 2024 (example)
    religion: "Islam",
    type: "observance",
    description: "Beginning of the holy month of fasting"
  },
  
  // Judaism
  {
    id: "passover-2024",
    title: "Passover",
    date: new Date(currentYear, 3, 22), // April 22, 2024 (example)
    religion: "Judaism",
    type: "holiday",
    description: "Commemoration of the Exodus from Egypt"
  },
  {
    id: "rosh-hashanah-2024",
    title: "Rosh Hashanah",
    date: new Date(currentYear, 8, 15), // September 15, 2024 (example)
    religion: "Judaism",
    type: "holiday",
    description: "Jewish New Year"
  },
  {
    id: "yom-kippur-2024",
    title: "Yom Kippur",
    date: new Date(currentYear, 8, 24), // September 24, 2024 (example)
    religion: "Judaism",
    type: "fast",
    description: "Day of Atonement"
  },
  
  // Hinduism
  {
    id: "diwali-2024",
    title: "Diwali",
    date: new Date(currentYear, 10, 1), // November 1, 2024 (example)
    religion: "Hinduism",
    type: "celebration",
    description: "Festival of Lights"
  },
  {
    id: "holi-2024",
    title: "Holi",
    date: new Date(currentYear, 2, 25), // March 25, 2024 (example)
    religion: "Hinduism",
    type: "celebration",
    description: "Festival of Colors"
  },
  {
    id: "navratri-2024",
    title: "Navratri",
    date: new Date(currentYear, 9, 3), // October 3, 2024 (example)
    religion: "Hinduism",
    type: "observance",
    description: "Nine nights dedicated to Goddess Durga"
  },
  
  // Buddhism
  {
    id: "vesak-2024",
    title: "Vesak Day",
    date: new Date(currentYear, 4, 23), // May 23, 2024 (example)
    religion: "Buddhism",
    type: "holiday",
    description: "Celebration of Buddha's birth, enlightenment, and death"
  },
  {
    id: "dharma-day-2024",
    title: "Dharma Day",
    date: new Date(currentYear, 6, 16), // July 16, 2024 (example)
    religion: "Buddhism",
    type: "observance",
    description: "Celebration of Buddha's first teaching"
  }
];

export const getEventsByReligions = (religions: string[]): ReligiousEvent[] => {
  return religiousEvents.filter(event => religions.includes(event.religion));
};

export const getAllEventsForDateRange = (
  startDate: Date, 
  endDate: Date, 
  religions: string[], 
  personalEvents: PersonalEvent[] = []
): CalendarEvent[] => {
  const filteredReligiousEvents = getEventsByReligions(religions);
  const allEvents = [...filteredReligiousEvents, ...personalEvents];
  
  return allEvents.filter(event => 
    event.date >= startDate && event.date <= endDate
  );
};

export const getEventsForDateRange = (startDate: Date, endDate: Date, religions: string[]): ReligiousEvent[] => {
  const filteredEvents = getEventsByReligions(religions);
  return filteredEvents.filter(event => 
    event.date >= startDate && event.date <= endDate
  );
};
