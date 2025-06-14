import { describe, it, expect } from 'vitest'

describe('Home Page', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle string operations', () => {
    const testString = 'Hello World'
    expect(testString.length).toBe(11)
    expect(testString.toLowerCase()).toBe('hello world')
  })

  it('should handle array operations', () => {
    const testArray = ['home', 'about', 'contact']
    expect(testArray.length).toBe(3)
    expect(testArray.includes('home')).toBe(true)
  })
})