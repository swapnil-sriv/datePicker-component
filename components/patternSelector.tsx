'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setPattern } from '../redux/recurrenceSlice';

const weekOrders = ['First', 'Second', 'Third', 'Fourth', 'Last'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const PatternSelector = () => {
  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.recurrence.type);
  const pattern = useSelector((state: RootState) => state.recurrence.pattern);

  const [order, currentOrder] = pattern.split(' ') as [string, string];

  const updatePattern = (newOrder: string, newDay: string) => {
    dispatch(setPattern(`${newOrder} ${newDay}`));

  };

  if (type !== 'monthly' && type !== 'yearly') return null;

  return (
    <div className="p-4">
      <h2 className="text-sm font-medium text-gray-700 mb-2">Pattern: e.g., Second Tuesday</h2>
      <div className="flex gap-2 mb-2">
        <select
          value={order || ''}
          onChange={(e) => updatePattern(e.target.value, currentOrder || 'Monday')}
          className="border border-gray-300 rounded-md px-3 py-2 shadow-sm"
        >
          <option value="" disabled>Select order</option>
          {weekOrders.map((wo) => (
            <option key={wo} value={wo}>
              {wo}
            </option>
          ))}
        </select>

        <select
          value={currentOrder || ''}
          onChange={(e) => updatePattern(order || 'First', e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 shadow-sm"
        >
          <option value="" disabled>Select day</option>
          {weekdays.map((wd) => (
            <option key={wd} value={wd}>
              {wd}
            </option>
          ))}
        </select>
      </div>

      {pattern && (
        <p className="text-gray-600 text-sm">
          Selected pattern: <span className="font-medium">{pattern}</span>
        </p>
      )}
    </div>
  );
};

export default PatternSelector;
