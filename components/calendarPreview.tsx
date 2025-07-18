'use client';

import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { generateRecurringDates } from '../utils/recurrenceUtils';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  addMonths
} from 'date-fns';




const CalendarPreview = () => {
    const [monthOffset, setMonthOffset] = useState(0);
const currentMonth = addMonths(new Date(), monthOffset);
  const recurrence = useSelector((state: RootState) => state.recurrence);

  const recurringDates = generateRecurringDates(recurrence);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    
    <div className="p-4">
      <h2 className="text-sm font-medium text-gray-700 mb-2">Calendar Preview</h2>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-600 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day: Date) => {
          const isRecurring = recurringDates.some((d) => isSameDay(d, day));
          return (
            <div
              key={day.toISOString()}
              className={`p-2 rounded-md border text-sm ${
                isRecurring
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {format(day, 'd')}
              
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between items-center mb-2 my-5">
  <button
    onClick={() => setMonthOffset((prev) => prev - 1)}
    className="text-sm text-blue-600 hover:underline"
  >
    &larr; Prev
  </button>
  <span className="text-sm font-medium">
    {format(currentMonth, 'MMMM yyyy')}
  </span>
  <button
    onClick={() => setMonthOffset((prev) => prev + 1)}
    className="text-sm text-blue-600 hover:underline"
  >
    Next &rarr;
  </button>
</div>

    </div>
  );
};

export default CalendarPreview;
