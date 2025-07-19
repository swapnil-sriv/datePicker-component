import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CalendarPreview from '../components/calendarPreview';
import React from 'react';

const mockStore = configureStore([]);

describe('CalendarPreview Integration', () => {
  it('renders calendar and highlights recurring dates correctly', () => {
    const initialState = {
      recurrence: {
        type: 'weekly',
        interval: 1,
        selectedDays: ['Monday', 'Friday'],
        pattern: '',
        startDate: '2025-07-01',
        endDate: '2025-07-31',
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CalendarPreview />
      </Provider>
    );

    const highlightedDays = screen.getAllByText((_, element) => {
      return (
        element?.tagName.toLowerCase() === 'div' &&
        element.classList.contains('bg-blue-600')
      );
    });

    expect(highlightedDays.length).toBeGreaterThan(0);
  });
});
