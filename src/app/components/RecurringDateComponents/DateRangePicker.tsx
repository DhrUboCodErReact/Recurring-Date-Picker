/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useRecurringStore } from '../../store/useRecurringStore'
import { useState, useEffect } from 'react'

export default function DateRangePicker() {
  const { startDate, endDate, setDateRange } = useRecurringStore()
  const [error, setError] = useState<string | null>(null)

  const today = new Date()
  const todayStr = formatDate(today)

  useEffect(() => {
    if (!startDate || startDate < today) {
      setDateRange(today, endDate)
    }
  }, [])

  function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = new Date(e.target.value)
    if (endDate && newStart > endDate) {
      setError('Start date cannot be after end date')
    } else {
      setError(null)
      setDateRange(newStart, endDate)
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newEnd = value ? new Date(value) : undefined
    if (newEnd && newEnd < startDate) {
      setError('End date cannot be before start date')
    } else {
      setError(null)
      setDateRange(startDate, newEnd)
    }
  }

  return (
    <div className="mb-6 space-y-5 p-6 rounded-2xl border border-yellow-300 bg-gradient-to-tr from-yellow-100 via-orange-200 to-yellow-300 shadow-2xl transition-colors">
      <h2 className="text-xl font-bold text-orange-900 mb-2">
        Date Scheduler
      </h2>

      <div>
        <label htmlFor="startDate" className="block mb-1 text-sm font-medium text-orange-800">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={formatDate(startDate)}
          onChange={handleStartDateChange}
          min={todayStr}
          max={endDate ? formatDate(endDate) : undefined}
          className="w-full px-4 py-2 rounded-lg border border-yellow-300 bg-white text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
        />
      </div>

      <div>
        <label htmlFor="endDate" className="block mb-1 text-sm font-medium text-orange-800">
          End Date <span className="text-orange-600 font-normal">(optional)</span>
        </label>
        <input
          id="endDate"
          type="date"
          value={endDate ? formatDate(endDate) : ''}
          onChange={handleEndDateChange}
          min={formatDate(startDate)}
          className="w-full px-4 py-2 rounded-lg border border-yellow-300 bg-white text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm font-medium">{error}</p>
      )}
    </div>
  )
}
