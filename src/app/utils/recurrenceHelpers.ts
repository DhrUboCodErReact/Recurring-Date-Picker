/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDays,
  addMonths,
  addYears,
  isAfter,
  isValid,
  parseISO,
  isBefore,
  isEqual,
} from 'date-fns'

type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly'
type Ordinal = 'first' | 'second' | 'third' | 'fourth' | 'last'

interface RecurrenceOptions {
  startDate: Date
  endDate?: Date
  frequency: Frequency
  interval: number
  daysOfWeek?: string[]
  skipDates?: string[]
  ordinal?: Ordinal
  ordinalDay?: string
}

export function generateRecurringDates({
  startDate,
  endDate,
  frequency,
  interval,
  daysOfWeek = [],
  skipDates = [],
  ordinal,
  ordinalDay,
}: RecurrenceOptions): Date[] {
  try {
    if (!isValid(startDate)) return []
    if (!['daily', 'weekly', 'monthly', 'yearly'].includes(frequency)) return []
    if (!Number.isInteger(interval) || interval <= 0) return []

    const effectiveEndDate =
      endDate && isValid(endDate) && !isAfter(startDate, endDate)
        ? endDate
        : addYears(startDate, 1)

    const normalizedDays = daysOfWeek
      .filter(Boolean)
      .map(
        (day) =>
          day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()
      )

    const skipDateSet = new Set(
      skipDates
        .map((dateStr) => {
          try {
            const parsed = parseISO(dateStr)
            return isValid(parsed) ? parsed.toDateString() : null
          } catch {
            return null
          }
        })
        .filter(Boolean) as string[]
    )

    const results: Date[] = []
    let current = new Date(startDate)
    const MAX_ITERATIONS = 10000
    let iterationCount = 0

    while (
      !isAfter(current, effectiveEndDate) &&
      iterationCount++ < MAX_ITERATIONS
    ) {
      const currentClone = new Date(current)
      const year = currentClone.getFullYear()
      const month = currentClone.getMonth()

      switch (frequency) {
        case 'daily': {
          if (!skipDateSet.has(currentClone.toDateString())) {
            results.push(currentClone)
          }
          current = addDays(current, interval)
          break
        }

        case 'weekly': {
          const dayName = currentClone.toLocaleDateString('en-US', {
            weekday: 'long',
          })
          if (
            normalizedDays.includes(dayName) &&
            !skipDateSet.has(currentClone.toDateString())
          ) {
            results.push(currentClone)
          }
          current = addDays(current, 1)
          break
        }

        case 'monthly':
        case 'yearly': {
          const isMonthly = frequency === 'monthly'

          if (ordinal && ordinalDay) {
            const validWeekdayNames = [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ]
            const normalizedOrdinalDay =
              ordinalDay.charAt(0).toUpperCase() +
              ordinalDay.slice(1).toLowerCase()

            if (!validWeekdayNames.includes(normalizedOrdinalDay)) {
              break // Skip invalid ordinalDay
            }

            const ordinalDate = getOrdinalWeekdayInMonth(
              currentClone,
              ordinal,
              normalizedOrdinalDay
            )

            if (
              ordinalDate &&
              !isAfter(ordinalDate, effectiveEndDate) &&
              !skipDateSet.has(ordinalDate.toDateString()) &&
              !isBefore(ordinalDate, startDate)
            ) {
              results.push(ordinalDate)
            }
          } else {
            for (const day of normalizedDays) {
              const weekdayIndex = getWeekdayIndex(day)
              if (weekdayIndex === -1) continue

              const dates = getAllWeekdaysOfMonth(month, year, weekdayIndex)
              for (const d of dates) {
                if (
                  !isAfter(d, effectiveEndDate) &&
                  !skipDateSet.has(d.toDateString()) &&
                  !isBefore(d, startDate)
                ) {
                  results.push(new Date(d))
                }
              }
            }
          }

          current = isMonthly
            ? addMonths(current, interval)
            : addYears(current, interval)
          break
        }

        default:
          break
      }

      if (!isValid(current)) break
    }

    if (iterationCount >= MAX_ITERATIONS) {
      console.warn('⚠️ Max iterations reached — possible infinite loop avoided')
    }

    // Deduplicate and sort
    const uniqueSortedDates = Array.from(
      new Set(results.map((d) => d.toISOString()))
    )
      .map((iso) => new Date(iso))
      .sort((a, b) => a.getTime() - b.getTime())

    return uniqueSortedDates
  } catch (err) {
    console.error('❌ Error in generateRecurringDates:', err)
    return []
  }
}

// === Helpers ===

function getOrdinalWeekdayInMonth(
  base: Date,
  ordinal: Ordinal,
  weekday: string
): Date | null {
  const year = base.getFullYear()
  const month = base.getMonth()
  const target = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase()

  const matches: Date[] = []
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day)
    if (date.getMonth() !== month) break
    const name = date.toLocaleDateString('en-US', { weekday: 'long' })
    if (name === target) matches.push(date)
  }

  switch (ordinal) {
    case 'first':
      return matches[0] ?? null
    case 'second':
      return matches[1] ?? null
    case 'third':
      return matches[2] ?? null
    case 'fourth':
      return matches[3] ?? null
    case 'last':
      return matches.at(-1) ?? null
    default:
      return null
  }
}

function getWeekdayIndex(day: string): number {
  const map: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  }
  return map[day] ?? -1
}

function getAllWeekdaysOfMonth(
  month: number,
  year: number,
  weekday: number
): Date[] {
  const dates: Date[] = []
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day)
    if (date.getMonth() !== month) break
    if (date.getDay() === weekday) dates.push(date)
  }
  return dates
}
