'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setType } from '../redux/recurrenceSlice';
import React from 'react';

const recurrenceTypes = ['daily', 'weekly', 'monthly', 'yearly'] as const;

const RecurrenceOptions = () => {
  const selectedType = useSelector((state: RootState) => state.recurrence.type);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Repeat</h2>
      <div className="flex gap-2 flex-wrap">
        {recurrenceTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full border transition-colors
              ${
                selectedType === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
            onClick={() => dispatch(setType(type))}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
