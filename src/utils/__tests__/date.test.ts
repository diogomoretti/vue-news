import { describe, it, expect } from 'vitest'
import { formatDate } from '../date'

describe('formatDate', () => {
  it('should format a date in the Brazilian format (dd/mm/yyyy)', () => {
    const date = new Date(2024, 0, 15)
    const result = formatDate(date)
    expect(result).toBe('15/01/2024')
  })

  it('should add zero to the left in days with one digit', () => {
    const date = new Date(2024, 5, 5)
    const result = formatDate(date)
    expect(result).toBe('05/06/2024')
  })

  it('should add zero to the left in months with one digit', () => {
    const date = new Date(2024, 0, 25)
    const result = formatDate(date)
    expect(result).toBe('25/01/2024')
  })
})
