import { render, screen, fireEvent } from '@testing-library/react'
import DateRangePicker from '../../components/RecurringDateComponents/DateRangePicker'
import { useRecurringStore } from '../../store/useRecurringStore'
import { act } from 'react'
import React from 'react'

// 🧪 Mock store
jest.mock('@/app/store/useRecurringStore', () => ({
  useRecurringStore: jest.fn(),
}))

describe('DateRangePicker', () => {
  const setDateRange = jest.fn()
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(today.getDate() + 5)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRecurringStore as unknown as jest.Mock).mockReturnValue({
      startDate: today,
      endDate: futureDate,
      setDateRange,
    })
  })

  it('renders correctly with initial dates', () => {
    render(<DateRangePicker />)
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument()
  })

  it('calls setDateRange when start date changes', () => {
    render(<DateRangePicker />)

    const newStartDate = new Date(today)
    newStartDate.setDate(today.getDate() + 2)

    const startInput = screen.getByLabelText(/start date/i)
    act(() => {
      fireEvent.input(startInput, {
        target: { value: newStartDate.toISOString().split('T')[0] },
      })
    })

    expect(setDateRange).toHaveBeenCalled()
  })

  it('shows error if start date is after end date', () => {
    render(<DateRangePicker />)

    const invalidStart = new Date(futureDate)
    invalidStart.setDate(futureDate.getDate() + 1)

    const startInput = screen.getByLabelText(/start date/i)
    act(() => {
      fireEvent.input(startInput, {
        target: { value: invalidStart.toISOString().split('T')[0] },
      })
    })

    expect(screen.getByText(/start date cannot be after end date/i)).toBeInTheDocument()
  })

  it('shows error if end date is before start date', () => {
    render(<DateRangePicker />)

    const invalidEnd = new Date(today)
    invalidEnd.setDate(today.getDate() - 1)

    const endInput = screen.getByLabelText(/end date/i)
    act(() => {
      fireEvent.input(endInput, {
        target: { value: invalidEnd.toISOString().split('T')[0] },
      })
    })

    expect(screen.getByText(/end date cannot be before start date/i)).toBeInTheDocument()
  })

  it('clears error when valid dates are entered', () => {
    render(<DateRangePicker />)

    const startInput = screen.getByLabelText(/start date/i)
    const endInput = screen.getByLabelText(/end date/i)

    const validStart = new Date(today)
    validStart.setDate(today.getDate() + 1)

    const validEnd = new Date(today)
    validEnd.setDate(today.getDate() + 3)

    act(() => {
      fireEvent.input(startInput, {
        target: { value: validStart.toISOString().split('T')[0] },
      })
    })

    act(() => {
      fireEvent.input(endInput, {
        target: { value: validEnd.toISOString().split('T')[0] },
      })
    })

    expect(screen.queryByText(/cannot be/i)).toBeNull()
    expect(setDateRange).toHaveBeenCalled()
  })
})
