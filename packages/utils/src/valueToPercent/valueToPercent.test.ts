import { valueToPercent } from './valueToPercent'

describe('valueToPercent', () => {
  const cases = [
    {
      value: 50,
      range: { min: 0, max: 50 },
      expected: 100,
    },
    {
      value: 25,
      range: { min: 0, max: 50 },
      expected: 50,
    },
    {
      value: 125,
      range: { min: 100, max: 200 },
      expected: 25,
    },
  ]

  cases.forEach(({ value, range, expected }) => {
    it(`${value}, min: ${range.min}, max: ${range.max}`, () => {
      expect(valueToPercent(value, range)).toBe(expected)
    })
  })
})
