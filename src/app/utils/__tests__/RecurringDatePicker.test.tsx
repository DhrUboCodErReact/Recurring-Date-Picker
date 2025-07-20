import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecurringDatePicker from '../../components/RecurringDatePicker'

describe('RecurringDatePicker', () => {
  it('renders header and inputs correctly', () => {
    render(<RecurringDatePicker />)

    const headings = screen.getAllByRole('heading', { name: /date scheduler/i })
    expect(headings.length).toBeGreaterThan(0)

    expect(
      screen.getByText(/configure and preview flexible recurring date patterns/i)
    ).toBeInTheDocument()

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument()

    // ✅ Fixed: Using getByText instead of getByLabelText
    expect(screen.getByText(/skip specific dates/i)).toBeInTheDocument()
  })
})
