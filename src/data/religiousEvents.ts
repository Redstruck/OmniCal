
import { addDays, addMonths, format } from "date-fns";

export interface ReligiousEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate?: Date; // For multi-day events
  religion: string;
  type: "holiday" | "observance" | "fast" | "celebration" | "pilgrimage" | "ceremony";
  description?: string;
  significance?: string;
  traditions?: string[];
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

// Helper function to create date
const createDate = (month: number, day: number, year: number = currentYear) => new Date(year, month - 1, day);

export const religiousEvents: ReligiousEvent[] = [
  // Christianity - Major Holidays
  {
    id: "christmas-2024",
    title: "Christmas",
    startDate: createDate(12, 25),
    religion: "Christianity",
    type: "holiday",
    description: "Celebration of the birth of Jesus Christ",
    significance: "The most important Christian holiday celebrating the incarnation of God",
    traditions: ["Gift giving", "Christmas tree", "Nativity scenes", "Church services"]
  },
  {
    id: "christmas-eve-2024",
    title: "Christmas Eve",
    startDate: createDate(12, 24),
    religion: "Christianity",
    type: "observance",
    description: "The evening before Christmas Day",
    traditions: ["Midnight Mass", "Family gatherings", "Gift opening"]
  },
  {
    id: "easter-2024",
    title: "Easter Sunday",
    startDate: createDate(3, 31),
    religion: "Christianity",
    type: "holiday",
    description: "Resurrection of Jesus Christ",
    significance: "The most important event in Christianity",
    traditions: ["Easter eggs", "Church services", "Easter bunny", "Family meals"]
  },
  {
    id: "good-friday-2024",
    title: "Good Friday",
    startDate: createDate(3, 29),
    religion: "Christianity",
    type: "observance",
    description: "Commemoration of the crucifixion of Jesus",
    traditions: ["Fasting", "Church services", "Stations of the Cross"]
  },
  {
    id: "palm-sunday-2024",
    title: "Palm Sunday",
    startDate: createDate(3, 24),
    religion: "Christianity",
    type: "observance",
    description: "Jesus's triumphal entry into Jerusalem",
    traditions: ["Palm branches", "Processions", "Special church services"]
  },
  {
    id: "epiphany-2024",
    title: "Epiphany",
    startDate: createDate(1, 6),
    religion: "Christianity",
    type: "holiday",
    description: "Celebration of the visit of the Magi to baby Jesus",
    traditions: ["Gift giving", "King cake", "Blessing of homes"]
  },

  // Islam - Major Events
  {
    id: "eid-al-fitr-2024",
    title: "Eid al-Fitr",
    startDate: createDate(4, 10),
    endDate: createDate(4, 12),
    religion: "Islam",
    type: "celebration",
    description: "Festival of Breaking the Fast - end of Ramadan",
    significance: "One of the most important Islamic holidays",
    traditions: ["Special prayers", "Charity (Zakat)", "Family gatherings", "Gift giving", "Feasting"]
  },
  {
    id: "eid-al-adha-2024",
    title: "Eid al-Adha",
    startDate: createDate(6, 16),
    endDate: createDate(6, 19),
    religion: "Islam",
    type: "celebration",
    description: "Festival of Sacrifice commemorating Abraham's willingness to sacrifice his son",
    significance: "Coincides with Hajj pilgrimage",
    traditions: ["Animal sacrifice", "Charity", "Pilgrimage", "Family gatherings"]
  },
  {
    id: "ramadan-2024",
    title: "Ramadan",
    startDate: createDate(3, 11),
    endDate: createDate(4, 9),
    religion: "Islam",
    type: "observance",
    description: "Holy month of fasting, prayer, and reflection",
    significance: "Fourth pillar of Islam",
    traditions: ["Daily fasting", "Increased prayer", "Quran recitation", "Charity", "Night prayers (Tarawih)"]
  },
  {
    id: "laylat-al-qadr-2024",
    title: "Laylat al-Qadr (Night of Power)",
    startDate: createDate(4, 5),
    religion: "Islam",
    type: "observance",
    description: "The night when the Quran was first revealed",
    significance: "Better than a thousand months",
    traditions: ["All-night prayers", "Quran recitation", "Seeking forgiveness"]
  },
  {
    id: "mawlid-2024",
    title: "Mawlid al-Nabi",
    startDate: createDate(9, 27),
    religion: "Islam",
    type: "celebration",
    description: "Birthday of Prophet Muhammad",
    traditions: ["Recitation of poetry", "Charity", "Special meals", "Religious gatherings"]
  },

  // Judaism - Major Holidays
  {
    id: "passover-2024",
    title: "Passover (Pesach)",
    startDate: createDate(4, 22),
    endDate: createDate(4, 30),
    religion: "Judaism",
    type: "holiday",
    description: "Commemoration of the Exodus from Egypt",
    significance: "One of the three pilgrimage festivals",
    traditions: ["Seder meal", "Matzo", "Four cups of wine", "Retelling the Exodus story"]
  },
  {
    id: "rosh-hashanah-2024",
    title: "Rosh Hashanah",
    startDate: createDate(9, 15),
    endDate: createDate(9, 17),
    religion: "Judaism",
    type: "holiday",
    description: "Jewish New Year",
    significance: "Day of Judgment and remembrance",
    traditions: ["Shofar blowing", "Apples and honey", "Round challah", "Tashlich ceremony"]
  },
  {
    id: "yom-kippur-2024",
    title: "Yom Kippur",
    startDate: createDate(9, 24),
    religion: "Judaism",
    type: "fast",
    description: "Day of Atonement - holiest day in Judaism",
    significance: "Day of repentance and forgiveness",
    traditions: ["25-hour fast", "Prayer services", "Asking forgiveness", "White clothing"]
  },
  {
    id: "sukkot-2024",
    title: "Sukkot",
    startDate: createDate(9, 29),
    endDate: createDate(10, 6),
    religion: "Judaism",
    type: "holiday",
    description: "Festival of Booths commemorating the wilderness wandering",
    traditions: ["Building sukkah", "Four species", "Eating in temporary booths"]
  },
  {
    id: "hanukkah-2024",
    title: "Hanukkah",
    startDate: createDate(12, 7),
    endDate: createDate(12, 15),
    religion: "Judaism",
    type: "celebration",
    description: "Festival of Lights celebrating the rededication of the Temple",
    traditions: ["Lighting menorah", "Latkes", "Dreidel games", "Gift giving", "Oil-based foods"]
  },
  {
    id: "purim-2024",
    title: "Purim",
    startDate: createDate(3, 13),
    religion: "Judaism",
    type: "celebration",
    description: "Celebration of Queen Esther saving the Jewish people",
    traditions: ["Reading Megillah", "Costumes", "Giving gifts", "Charity", "Festive meal"]
  },

  // Hinduism - Major Festivals
  {
    id: "diwali-2024",
    title: "Diwali",
    startDate: createDate(11, 1),
    endDate: createDate(11, 5),
    religion: "Hinduism",
    type: "celebration",
    description: "Festival of Lights celebrating the victory of light over darkness",
    significance: "Most important Hindu festival",
    traditions: ["Oil lamps", "Fireworks", "Rangoli", "Sweets", "Goddess Lakshmi worship", "Gift giving"]
  },
  {
    id: "holi-2024",
    title: "Holi",
    startDate: createDate(3, 25),
    endDate: createDate(3, 26),
    religion: "Hinduism",
    type: "celebration",
    description: "Festival of Colors celebrating spring and love",
    traditions: ["Colored powder", "Water fights", "Bonfires", "Special foods", "Music and dance"]
  },
  {
    id: "navratri-2024",
    title: "Navratri",
    startDate: createDate(10, 3),
    endDate: createDate(10, 12),
    religion: "Hinduism",
    type: "observance",
    description: "Nine nights dedicated to Goddess Durga",
    traditions: ["Fasting", "Dancing (Garba/Dandiya)", "Goddess worship", "Special prayers"]
  },
  {
    id: "dussehra-2024",
    title: "Dussehra (Vijayadashami)",
    startDate: createDate(10, 12),
    religion: "Hinduism",
    type: "celebration",
    description: "Victory of good over evil - Rama's victory over Ravana",
    traditions: ["Burning effigies", "Ramlila performances", "Weapon worship"]
  },
  {
    id: "krishna-jamnashtami-2024",
    title: "Krishna Janmashtami",
    startDate: createDate(8, 26),
    religion: "Hinduism",
    type: "celebration",
    description: "Birthday of Lord Krishna",
    traditions: ["Midnight celebrations", "Dahi Handi", "Bhajans", "Fasting", "Decorating cradles"]
  },
  {
    id: "ganesh-chaturthi-2024",
    title: "Ganesh Chaturthi",
    startDate: createDate(9, 7),
    endDate: createDate(9, 17),
    religion: "Hinduism",
    type: "celebration",
    description: "Birthday of Lord Ganesha",
    traditions: ["Ganesha idols", "Processions", "Modak sweets", "Immersion ceremony"]
  },
  {
    id: "karva-chauth-2024",
    title: "Karva Chauth",
    startDate: createDate(11, 1),
    religion: "Hinduism",
    type: "observance",
    description: "Fast observed by married women for their husbands' longevity",
    traditions: ["Day-long fast", "Moon sighting", "Mehendi", "Special prayers"]
  },

  // Buddhism - Major Observances
  {
    id: "vesak-2024",
    title: "Vesak Day (Buddha Day)",
    startDate: createDate(5, 23),
    religion: "Buddhism",
    type: "holiday",
    description: "Celebration of Buddha's birth, enlightenment, and death",
    significance: "Most important Buddhist holiday",
    traditions: ["Temple visits", "Meditation", "Chanting", "Acts of kindness", "Lantern festivals"]
  },
  {
    id: "dharma-day-2024",
    title: "Dharma Day",
    startDate: createDate(7, 16),
    religion: "Buddhism",
    type: "observance",
    description: "Celebration of Buddha's first teaching",
    traditions: ["Meditation", "Study of Buddhist texts", "Chanting", "Temple visits"]
  },
  {
    id: "sangha-day-2024",
    title: "Sangha Day",
    startDate: createDate(2, 24),
    religion: "Buddhism",
    type: "observance",
    description: "Celebration of the Buddhist community",
    traditions: ["Community gatherings", "Meditation", "Teaching sessions"]
  },
  {
    id: "kathina-2024",
    title: "Kathina",
    startDate: createDate(10, 15),
    endDate: createDate(11, 13),
    religion: "Buddhism",
    type: "ceremony",
    description: "Annual robe offering ceremony for monks",
    traditions: ["Robe offerings", "Merit making", "Community donations"]
  },
  {
    id: "magha-puja-2024",
    title: "Magha Puja",
    startDate: createDate(2, 24),
    religion: "Buddhism",
    type: "observance",
    description: "Commemoration of Buddha's teachings to 1,250 disciples",
    traditions: ["Candlelight processions", "Meditation", "Merit making"]
  },

  // Additional Islamic Events
  {
    id: "muharram-2024",
    title: "Muharram (Islamic New Year)",
    startDate: createDate(7, 7),
    religion: "Islam",
    type: "observance",
    description: "First month of Islamic calendar",
    traditions: ["Reflection", "Prayer", "Charity"]
  },
  {
    id: "ashura-2024",
    title: "Day of Ashura",
    startDate: createDate(7, 17),
    religion: "Islam",
    type: "observance",
    description: "Day of remembrance and fasting",
    significance: "Commemorates various historical events",
    traditions: ["Fasting", "Prayer", "Charity", "Reflection"]
  },

  // Additional Christian Events
  {
    id: "pentecost-2024",
    title: "Pentecost",
    startDate: createDate(5, 19),
    religion: "Christianity",
    type: "holiday",
    description: "Descent of the Holy Spirit upon the apostles",
    traditions: ["Special church services", "Confirmation ceremonies", "Red vestments"]
  },
  {
    id: "all-saints-day-2024",
    title: "All Saints' Day",
    startDate: createDate(11, 1),
    religion: "Christianity",
    type: "observance",
    description: "Honoring all saints and martyrs",
    traditions: ["Church services", "Grave visits", "Lighting candles"]
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
  
  return allEvents.filter(event => {
    if (event.type === "personal") {
      return event.date >= startDate && event.date <= endDate;
    } else {
      const religEvent = event as ReligiousEvent;
      const eventEndDate = religEvent.endDate || religEvent.startDate;
      return religEvent.startDate <= endDate && eventEndDate >= startDate;
    }
  });
};

export const getEventsForDateRange = (startDate: Date, endDate: Date, religions: string[]): ReligiousEvent[] => {
  const filteredEvents = getEventsByReligions(religions);
  return filteredEvents.filter(event => {
    const eventEndDate = event.endDate || event.startDate;
    return event.startDate <= endDate && eventEndDate >= startDate;
  });
};

// Helper function to check if a date falls within an event's duration
export const isDateInEvent = (date: Date, event: ReligiousEvent): boolean => {
  const eventEndDate = event.endDate || event.startDate;
  return date >= event.startDate && date <= eventEndDate;
};

// Helper function to get event duration in days
export const getEventDuration = (event: ReligiousEvent): number => {
  if (!event.endDate) return 1;
  const diffTime = event.endDate.getTime() - event.startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
