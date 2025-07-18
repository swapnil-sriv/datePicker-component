'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSelectedDays } from '../redux/recurrenceSlice';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DaySelector = () => {
  const dispatch = useDispatch();
  const selectedDays = useSelector((state: RootState) => state.recurrence.selectedDays);
  const type = useSelector((state: RootState) => state.recurrence.type);

  const toggleDay = (day: string) => {
    const updated =
      selectedDays.includes(day)
        ? selectedDays.filter((d) => d !== day)
        : [...selectedDays, day];
    dispatch(setSelectedDays(updated));
  };

  if (type !== 'weekly') return null;

  return (
    <div className="p-4">
      <h2 className="text-sm font-medium mb-2 text-gray-700">Select days of the week</h2>
      <div className="flex flex-wrap gap-2">
        {WEEKDAYS.map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`w-10 h-10 rounded-full border text-sm font-medium
              ${
                selectedDays.includes(day)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {day[0]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
