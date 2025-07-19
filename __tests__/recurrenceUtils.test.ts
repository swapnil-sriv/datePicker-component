import { generateRecurringDates } from '../utils/recurrenceUtils';

describe('generateRecurringDates', () => {
  it('generates daily recurrence correctly', () => {
    const dates = generateRecurringDates({
      type: 'daily',
      interval: 1,
      selectedDays: [],
      pattern: '',
      startDate: '2025-07-01',
      endDate: '2025-07-05'
    });

    expect(dates.length).toBe(5);
    expect(dates.map(d => d.getDate())).toEqual([1, 2, 3, 4, 5]);
  });

  it('generates weekly recurrence on specific days with +2 adjustment', () => {
    const dates = generateRecurringDates({
      type: 'weekly',
      interval: 1,
      selectedDays: ['Monday', 'Wednesday'],
      pattern: '',
      startDate: '2025-07-01', 
      endDate: '2025-07-10'
    });

    const result = dates.map(d => d.getDay());
    expect(result.every(d => d === 3 || d === 5)).toBe(true);
  });

  it('generates monthly recurrence for second Tuesday with +2 adjustment', () => {
    const dates = generateRecurringDates({
      type: 'monthly',
      interval: 1,
      selectedDays: [],
      pattern: 'Second Tuesday',
      startDate: '2025-07-01',
      endDate: '2025-09-30'
    });


    expect(dates.length).toBe(3);
    expect(dates.map(d => d.getDay())).toEqual([4, 4, 4]); 
  });
});
