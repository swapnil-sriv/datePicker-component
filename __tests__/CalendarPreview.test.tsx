import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CalendarPreview from '../components/calendarPreview';
import React from 'react';

const mockStore = configureStore([]);

describe('CalendarPreview Integration', () => {
  it('renders calendar and highlights shifted recurring dates correctly', () => {
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

    const { container } = render(
      <Provider store={store}>
        <CalendarPreview />
      </Provider>
    );

    const expectedHighlightedDates = ['9', '13', '16', '20', '23', '27', '30']; // Adjusted dates for +2
    const highlightedDays = container.querySelectorAll('div.bg-blue-600');
    const highlightedTexts = Array.from(highlightedDays).map(el => el.textContent?.trim() || '');

    expect(highlightedTexts.length).toBeGreaterThan(0);
    expect(highlightedTexts).toEqual(expect.arrayContaining(expectedHighlightedDates));
  });
});
