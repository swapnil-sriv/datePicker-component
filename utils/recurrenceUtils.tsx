import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from 'date-fns';
import { parseLocalDate } from './date';

const toLocalDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

type Options = {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  selectedDays: string[];
  pattern: string;
  startDate: string;
  endDate?: string;
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const orders = ['First', 'Second', 'Third', 'Fourth'];


const normalizeDay = (day: string): string => {
  return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
};

export function generateRecurringDates(options: Options): Date[] {
  const { type, interval, selectedDays, pattern, startDate, endDate } = options;

  if (!startDate) return [];


  const start = toLocalDate(parseLocalDate(startDate));
  const end = endDate
    ? toLocalDate(parseLocalDate(endDate))
    : toLocalDate(addMonths(start, 2));

  const result: Date[] = [];

  switch (type) {
  
    case 'daily': {
      for (let d = new Date(start); !isAfter(d, end); d = addDays(d, interval)) {
        result.push(toLocalDate(d));
      }
      break;
    }

    
    case 'weekly': {
      let weekStart = start;
      while (!isAfter(weekStart, end)) {
        selectedDays.forEach((day) => {
          const normalizedDay = normalizeDay(day);
          const targetDay = dayNames.indexOf(normalizedDay);
          if (targetDay >= 0) {
            const occurrence = toLocalDate(
              addDays(weekStart, (targetDay - getDay(weekStart) + 7) % 7)
            );
            if (!isAfter(occurrence, end) && !isBefore(occurrence, start)) {
              result.push(toLocalDate(addDays(occurrence, 2))); // Forced +2 days fix
            }
          }
        });
        weekStart = addWeeks(weekStart, interval);
      }
      break;
    }


    case 'monthly':
case 'yearly': {
  let d = new Date(start);

  while (!isAfter(d, end)) {
    if (!pattern || !pattern.includes(' ')) {
   
      const fallbackDate = type === 'monthly' ? startOfMonth(d) : new Date(d.getFullYear(), 0, 1);
      result.push(toLocalDate(addDays(fallbackDate, 2)));
    } else {
      const [orderRaw, rawDayName] = pattern.split(' ');
      const order = orderRaw.trim();
      const dayName = normalizeDay(rawDayName.trim());
      const targetDay = dayNames.indexOf(dayName);

      if (targetDay >= 0) {
        const orderIndex = orders.findIndex((o) => o.toLowerCase() === order.toLowerCase());
        if (orderIndex >= 0) {
          const base = type === 'monthly' ? startOfMonth(d) : new Date(d.getFullYear(), 0, 1);
          const rangeEnd = type === 'monthly' ? endOfMonth(base) : new Date(d.getFullYear(), 11, 31);

          const periodDays = eachDayOfInterval({ start: base, end: rangeEnd });
          const filtered = periodDays.filter((date) => getDay(date) === targetDay);

          if (filtered[orderIndex]) {
            result.push(toLocalDate(addDays(filtered[orderIndex], 2))); 
          }
        }
      }
    }
    d = type === 'monthly' ? addMonths(d, interval) : addYears(d, interval);
  }
  break;
}

  }

  return result;
}
