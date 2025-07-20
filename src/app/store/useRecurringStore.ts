import { create } from 'zustand'



type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly'
type Ordinal = 'first' | 'second' | 'third' | 'fourth' | 'last'

export interface RecurringState {
  frequency: Frequency
  interval: number
  startDate: Date
  endDate?: Date
  daysOfWeek: string[]
  skipDates: string[]

  ordinal?: Ordinal
  ordinalDay?: string

  // Actions
  setFrequency: (f: Frequency) => void
  setInterval: (i: number) => void
  setDateRange: (start: Date, end?: Date) => void
  setDaysOfWeek: (days: string[]) => void
  setSkipDates: (dates: string[]) => void
  setOrdinal: (o?: Ordinal) => void
  setOrdinalDay: (d?: string) => void
}

export const useRecurringStore = create<RecurringState>((set) => ({
  frequency: 'monthly',
  interval: 1,
  startDate: new Date(),
  endDate: undefined,
  daysOfWeek: [],
  skipDates: [],
  ordinal: undefined,
  ordinalDay: undefined,

  setFrequency: (frequency) => set({ frequency }),
  setInterval: (interval) => set({ interval }),
  setDateRange: (startDate, endDate) => set({ startDate, endDate }),
  setDaysOfWeek: (daysOfWeek) => set({ daysOfWeek }),
  setSkipDates: (skipDates) => set({ skipDates }),
  setOrdinal: (ordinal) => set({ ordinal }),
  setOrdinalDay: (ordinalDay) => set({ ordinalDay }),
}))
