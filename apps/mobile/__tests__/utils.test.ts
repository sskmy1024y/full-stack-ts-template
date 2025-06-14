import { describe, it, expect } from 'vitest'

describe('Utility Functions', () => {
  it('should handle date formatting', () => {
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0]
    }

    const testDate = new Date('2024-06-01')
    expect(formatDate(testDate)).toBe('2024-06-01')
  })

  it('should validate email format', () => {
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('invalid-email')).toBe(false)
    expect(isValidEmail('user@domain.co.uk')).toBe(true)
  })

  it('should handle async operations with proper types', async () => {
    const fetchUserData = async (userId: number): Promise<{ id: number; name: string }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: userId, name: `User ${userId}` })
        }, 10)
      })
    }

    const userData = await fetchUserData(123)
    expect(userData.id).toBe(123)
    expect(userData.name).toBe('User 123')
  })

  it('should work with enums and constants', () => {
    enum AppState {
      Loading = 'LOADING',
      Active = 'ACTIVE',
      Background = 'BACKGROUND',
      Inactive = 'INACTIVE',
    }

    const currentState: AppState = AppState.Active
    expect(currentState).toBe('ACTIVE')
    expect(Object.values(AppState)).toContain('LOADING')
  })
})
