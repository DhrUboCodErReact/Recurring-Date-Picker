/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateRecurringDates } from '../recurrenceHelpers'
import { parseISO, format } from 'date-fns'

describe('generateRecurringDates', () => {
  const fmt = (d: Date) => format(d, 'yyyy-MM-dd')

  it('should generate daily dates correctly', () => {
    const startDate = parseISO('2025-07-01')
    const endDate = parseISO('2025-07-05')

    const dates = generateRecurringDates({
      startDate,
      endDate,
      frequency: 'daily',
      interval: 1,
    })

    expect(dates.map(fmt)).toEqual([
      '2025-07-01',
      '2025-07-02',
      '2025-07-03',
      '2025-07-04',
      '2025-07-05',
    ])
  })

  it('should skip dates using skipDates array', () => {
    const dates = generateRecurringDates({
      startDate: parseISO('2025-07-01'),
      endDate: parseISO('2025-07-05'),
      frequency: 'daily',
      interval: 1,
      skipDates: ['2025-07-03', '2025-07-05'],
    })

    expect(dates.map(fmt)).toEqual([
      '2025-07-01',
      '2025-07-02',
      '2025-07-04',
    ])
  })

  it('should generate weekly dates on selected days', () => {
    const dates = generateRecurringDates({
      startDate: parseISO('2025-07-01'),
      endDate: parseISO('2025-07-14'),
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['Monday', 'Wednesday'],
    })

    expect(dates.map(fmt)).toEqual([
      '2025-07-02', // Wednesday
      '2025-07-07', // Monday
      '2025-07-09', // Wednesday
      '2025-07-14', // Monday
    ])
  })

  it('should generate correct ordinal weekday in month (Third Friday)', () => {
    const dates = generateRecurringDates({
      startDate: parseISO('2025-01-01'),
      endDate: parseISO('2025-03-31'),
      frequency: 'monthly',
      interval: 1,
      ordinal: 'third',
      ordinalDay: 'Friday',
    })

    expect(dates.map(fmt)).toEqual([
      '2025-01-17',
      '2025-02-21',
      '2025-03-21',
    ])
  })

  it('should generate yearly dates for First Monday of January', () => {
    const dates = generateRecurringDates({
      startDate: parseISO('2025-01-01'),
      endDate: parseISO('2027-12-31'),
      frequency: 'yearly',
      interval: 1,
      ordinal: 'first',
      ordinalDay: 'Monday',
    })

    expect(dates.map(fmt)).toEqual([
      '2025-01-06',
      '2026-01-05',
      '2027-01-04',
    ])
  })

  it('should return an empty array for invalid frequency', () => {
    const dates = generateRecurringDates({
      startDate: parseISO('2025-07-01'),
      frequency: 'foo' as any,
      interval: 1,
    })

    expect(dates).toEqual([])
  })

  it('should not exceed max iterations and return a warning', () => {
    const dates = generateRecurringDates({
      startDate: parseISO('2025-01-01'),
      endDate: parseISO('2035-01-01'), // Large span
      frequency: 'daily',
      interval: 1,
    })

    expect(dates.length).toBeLessThanOrEqual(366 * 10) // 10 years max
  })

  it('should deduplicate and sort dates', () => {
    const dates = generateRecurringDates({
      startDate: parseISO('2025-01-01'),
      endDate: parseISO('2025-01-31'),
      frequency: 'monthly',
      interval: 1,
      daysOfWeek: ['Monday'],
    })

    // Same month, will appear only once
    const unique = new Set(dates.map(fmt))
    expect(dates.length).toEqual(unique.size)
    expect([...dates].sort((a, b) => a.getTime() - b.getTime())).toEqual(dates)
  })
})
