import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CalendarPreview from '../../components/RecurringDateComponents/CalendarPreview'

describe('📅 CalendarPreview Component', () => {
  it('renders calendar and summary info correctly', () => {
    render(<CalendarPreview />)

    // ✅ Fixed: more specific queries
    expect(screen.getByRole('heading', { name: /^calendar$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /calendar preview/i })).toBeInTheDocument()

    // Summary check
    expect(screen.getByText(/frequency:/i)).toBeInTheDocument()
    expect(screen.getByText(/start date:/i)).toBeInTheDocument()
    expect(screen.getByText(/end date:/i)).toBeInTheDocument()
  })
})
