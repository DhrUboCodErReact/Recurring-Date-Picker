'use client'

import RecurringOptions from './RecurringDateComponents/RecurringOptions'
import DateRangePicker from '../components/RecurringDateComponents/DateRangePicker'
import WeeklyDaysSelector from '../components/RecurringDateComponents/WeeklyDaysSelector'
import CalendarPreview from '../components/RecurringDateComponents/CalendarPreview'
import SkipDatesSelector from '../components/RecurringDateComponents/SkipDatesSelector'


export default function RecurringDatePicker() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-xl p-6 md:p-10 space-y-6 transition-all duration-300">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Date Scheduler
          </h1>
          <p className="text-[var(--muted)] mt-2 text-base md:text-lg font-light">
            Configure and preview flexible recurring date patterns with precision
          </p>
        </div>

        {/* Functional Components */}
        <div className="space-y-5">
          <RecurringOptions />
          <DateRangePicker />
          <SkipDatesSelector />
          <WeeklyDaysSelector />
          <CalendarPreview />
        </div>
      </div>
    </main>
  )
}
