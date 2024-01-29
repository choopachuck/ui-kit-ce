import { includesKeyboardKey } from './'

describe('includesKeyboardKey', () => {
  it('should return true if keys contains key', () => {
    expect(includesKeyboardKey(['Right', 'Left'], 'Left')).toBe(true)
  })

  it('should return false if keys does not contains key', () => {
    expect(includesKeyboardKey(['Right', 'Left'], 'Up')).toBe(false)
  })
})
