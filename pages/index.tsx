import Head from 'next/head';
import RecurrenceOptions from '../components/recurrenceOptions';
import CustomInterval from '../components/customInterval';
import DaySelector from '../components/daySelector';
import PatternSelector from '../components/patternSelector';
import DateRangePicker from '../components/dateRangePicker';
import CalendarPreview from '../components/calendarPreview';

export default function Home() {
  return (
    <>
      <Head>
        <title>Recurring Date Picker</title>
      </Head>
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4">Recurring Date Picker</h1>
          <RecurrenceOptions />
          <CustomInterval/>
          <DaySelector/>
          <PatternSelector/>
          <DateRangePicker/>
          <CalendarPreview/>
        </div>
      </main>
    </>
  );
}
