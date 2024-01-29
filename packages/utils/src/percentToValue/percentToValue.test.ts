import { percentToValue } from './percentToValue'

describe('percentToValue', () => {
  const cases = [
    {
      percent: 50,
      range: { min: 0, max: 50 },
      expected: 25,
    },
    {
      percent: 50,
      range: { min: 0 },
      expected: 50,
    },
    {
      percent: 20,
      range: { min: 100, max: 500 },
      expected: 180,
    },
    {
      percent: 20,
      range: {},
      expected: 20,
    },
    {
      percent: 100,
      range: { min: 100, max: 500 },
      expected: 500,
    },
    {
      percent: 20,
      range: { min: 1000, max: 500 },
      expected: 600,
    },
  ]

  cases.forEach(({ percent, range, expected }) => {
    it(`${percent}, min: ${range.min ?? 'none'}, max: ${
      range.max ?? 'none'
    }`, () => {
      expect(percentToValue(percent, range)).toBe(expected)
    })
  })
})
