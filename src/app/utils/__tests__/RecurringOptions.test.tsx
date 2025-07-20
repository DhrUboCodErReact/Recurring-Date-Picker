import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecurringOptions from '../../components/RecurringDateComponents/RecurringOptions'
import { useRecurringStore } from '../../store/useRecurringStore'

// ✅ Reset Zustand store between tests
beforeEach(() => {
  const { setFrequency } = useRecurringStore.getState()
  setFrequency('daily') // Default state
})

describe('RecurringOptions Component', () => {
  it('renders label and select with all frequency options', () => {
    render(<RecurringOptions />)

    // Check label
    expect(screen.getByText(/Repeat Frequency/i)).toBeInTheDocument()

    // Check select element
    const select = screen.getByRole('combobox', {
      name: /Recurring Frequency/i,
    })
    expect(select).toBeInTheDocument()

    // Check all options
    expect(screen.getByRole('option', { name: 'Daily' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Weekly' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Monthly' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Yearly' })).toBeInTheDocument()
  })

  it('updates the Zustand store when a new frequency is selected', () => {
    render(<RecurringOptions />)

    const select = screen.getByRole('combobox', {
      name: /Recurring Frequency/i,
    })

    // Simulate changing to "monthly"
    fireEvent.change(select, { target: { value: 'monthly' } })

    // Zustand should now have "monthly" as frequency
    const state = useRecurringStore.getState()
    expect(state.frequency).toBe('monthly')
  })
})
