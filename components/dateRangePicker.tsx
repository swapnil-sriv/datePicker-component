'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setStartDate, setEndDate } from '../redux/recurrenceSlice';

const DateRangePicker = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state: RootState) => state.recurrence);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartDate(e.target.value));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndDate(e.target.value));
  };

  return (
    <div className="p-4">
      <h2 className="text-sm font-medium text-gray-700 mb-2">Date Range</h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div>
          <label htmlFor="startDate" className="block text-sm text-gray-600 mb-1">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={handleStartChange}
            className="border border-gray-300 rounded-md px-3 py-2 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm text-gray-600 mb-1">
            End Date (Optional)
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={handleEndChange}
            className="border border-gray-300 rounded-md px-3 py-2 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
