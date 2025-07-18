import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isAfter,
  isBefore,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from 'date-fns';
import { parseLocalDate } from './date';

// Utility to strip time and ensure local date comparison
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

export function generateRecurringDates(options: Options): Date[] {
  const { type, interval, selectedDays, pattern, startDate, endDate } = options;

  if (!startDate) return [];

  const start = parseLocalDate(startDate);
  const end = toLocalDate(endDate ? parseISO(endDate) : addMonths(start, 2)); // 2-month preview

  const result: Date[] = [];

  switch (type) {
    case 'daily': {
      for (let d = new Date(start); !isAfter(d, end); d = addDays(d, interval)) {
        result.push(toLocalDate(d));
      }
      break;
    }

    case 'weekly': {
      const allDates = eachDayOfInterval({ start, end });
      const selectedIndexes = selectedDays.map((day) =>
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day)
      );

      allDates.forEach((d) => {
        const localDay = toLocalDate(d);
        if (selectedIndexes.includes(getDay(localDay))) {
          result.push(localDay);
        }
      });
      break;
    }

    case 'monthly':
    case 'yearly': {
      const [order, dayName] = pattern.split(' ');
      const targetDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(dayName);

      if (targetDay < 0 || !order) break;

      let d = new Date(start);
      while (!isAfter(d, end)) {
        const base = type === 'monthly' ? startOfMonth(d) : new Date(d.getFullYear(), d.getMonth(), 1);
        const monthDays = eachDayOfInterval({ start: base, end: endOfMonth(base) });

        const filtered = monthDays.filter((date) => getDay(toLocalDate(date)) === targetDay);

        let match: Date | undefined;
        if (order === 'Last') {
          match = filtered[filtered.length - 1];
        } else {
          const index = ['First', 'Second', 'Third', 'Fourth'].indexOf(order);
          match = filtered[index];
        }

        if (match && !isBefore(match, start) && !isAfter(match, end)) {
          result.push(toLocalDate(match));
        }

        d = type === 'monthly' ? addMonths(d, interval) : addYears(d, interval);
      }
      break;
    }
  }

  return result;
}
