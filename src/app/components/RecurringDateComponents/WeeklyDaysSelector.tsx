/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRecurringStore } from '../../store/useRecurringStore'
import { useState, useEffect } from 'react'

const days: readonly string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const ordinals = ['first', 'second', 'third', 'fourth', 'last']

export default function WeeklyDaysSelector() {
  const {
    daysOfWeek,
    setDaysOfWeek,
    frequency,
    ordinal,
    ordinalDay,
    setOrdinal,
    setOrdinalDay,
  } = useRecurringStore()

  const [selectedOrdinalDay, setSelectedOrdinalDay] = useState<string | undefined>(ordinalDay)
  const [selectedOrdinal, setSelectedOrdinal] = useState<string>(ordinal ?? '')

  // Keep local state in sync with store on load or external change
  useEffect(() => {
    setSelectedOrdinal(ordinal ?? '')
    setSelectedOrdinalDay(ordinalDay)
  }, [ordinal, ordinalDay])

  const toggleDay = (day: string) => {
    const updated = daysOfWeek.includes(day)
      ? daysOfWeek.filter((d) => d !== day)
      : [...daysOfWeek, day]
    setDaysOfWeek(updated)

    // If removing selected ordinal day, reset ordinal
    if (!updated.includes(day)) {
      if (selectedOrdinalDay === day) {
        setSelectedOrdinalDay(undefined)
        setSelectedOrdinal('')
        setOrdinal(undefined)
        setOrdinalDay(undefined)
      }
    }
  }

  const updateOrdinal = (ordinal: string, day: string) => {
    setSelectedOrdinal(ordinal)
    setSelectedOrdinalDay(day)
    setOrdinal(ordinal as any)
    setOrdinalDay(day)
  }

  return (
    <div className="mb-6 p-6 rounded-2xl shadow-md bg-gradient-to-br from-red-100 via-red-200 to-pink-100 border border-red-300">
      <label className="block mb-4 text-xl font-bold text-red-700 tracking-wide">
        Select Recurring Days
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {days.map((day) => {
          const isSelected = daysOfWeek.includes(day)
          const isOrdinalDay = selectedOrdinalDay === day

          return (
            <div key={day} className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => toggleDay(day)}
                aria-pressed={isSelected}
                aria-label={`${day} ${isSelected ? 'selected' : 'not selected'}`}
                className={`w-full border rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${isSelected
                    ? 'bg-red-600 text-white border-red-700 shadow-sm'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-red-50'
                  }`}
              >
                {day}
              </button>

              {/* Show ordinal selector only if day is selected and frequency supports it */}
              {isSelected && (frequency === 'monthly' || frequency === 'yearly') && (
                <select
                  className="mt-1 text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-400 bg-white text-gray-700"
                  value={isOrdinalDay ? selectedOrdinal : ''}
                  onChange={(e) => updateOrdinal(e.target.value, day)}
                >
                  <option value="">Every {day}</option>
                  {ordinals.map((o) => (
                    <option key={o} value={o}>
                      {o.charAt(0).toUpperCase() + o.slice(1)} {day}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
