import { normalizeRange } from './normalizeRange'

describe('normalizeRange', () => {
  const cases = [
    {
      range: { min: 0, max: 50 },
      expected: { min: 0, max: 50 },
    },
    {
      range: { min: 0 },
      expected: { min: 0, max: 100 },
    },
    {
      range: { max: 100 },
      expected: { min: 0, max: 100 },
    },
    {
      range: {},
      expected: { min: 0, max: 100 },
    },
    {
      range: { min: 100, max: 0 },
      expected: { min: 0, max: 100 },
    },
    {
      range: { min: 100 },
      expected: { min: 100, max: 100 },
    },
    {
      range: { max: 0 },
      expected: { min: 0, max: 0 },
    },
  ]

  cases.forEach(({ range, expected }) => {
    it(`min: ${range.min ?? 'none'}, max: ${range.max ?? 'none'}`, () => {
      expect(normalizeRange(range)).toEqual(expected)
    })
  })
})
