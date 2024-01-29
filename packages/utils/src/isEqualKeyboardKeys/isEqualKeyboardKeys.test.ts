import { isEqualKeyboardKeys } from './isEqualKeyboardKeys'

describe('IE/Edge specific keys', () => {
  it.each([
    ['Esc', 'Escape'],
    ['Escape', 'Esc'],
    ['Up', 'ArrowUp'],
    ['ArrowUp', 'Up'],
    ['Left', 'ArrowLeft'],
    ['ArrowLeft', 'Left'],
    ['Down', 'ArrowDown'],
    ['ArrowDown', 'Down'],
    ['Right', 'ArrowRight'],
    ['ArrowRight', 'Right'],
  ])('%s and %s should return true', (key1, key2) => {
    expect(isEqualKeyboardKeys(key1, key2)).toBe(true)
  })
})

describe('Other keys', () => {
  it('should return true for equal keys', () => {
    expect(isEqualKeyboardKeys('Enter', 'Enter')).toBe(true)
  })

  it('should return false for different keys', () => {
    expect(isEqualKeyboardKeys('Enter', 'Esc')).toBe(false)
  })
})
