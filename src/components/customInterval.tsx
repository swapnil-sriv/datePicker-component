'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setInterval } from '../redux/recurrenceSlice';
import React from 'react';

const CustomInterval = () => {
  const dispatch = useDispatch();
  const interval = useSelector((state: RootState) => state.recurrence.interval);
  const type = useSelector((state: RootState) => state.recurrence.type);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1); 
    dispatch(setInterval(value));
  };

  return (
    <div className="p-4">
      <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-1">
        Repeat every
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          id="interval"
          min={1}
          value={interval}
          onChange={handleChange}
          className="w-20 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700">
          {interval > 1 ? `${type}s` : type}
        </span>
      </div>
    </div>
  );
};

export default CustomInterval;
