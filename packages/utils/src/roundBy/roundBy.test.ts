import { roundBy } from './roundBy'

describe('roundBy', () => {
  const cases = [
    {
      target: 43,
      value: 10,
      expected: 40,
    },
    {
      target: 43,
      value: 10,
      expected: 40,
    },
    {
      target: 46,
      value: 10,
      expected: 50,
    },
    {
      target: 46.546,
      value: 0.01,
      expected: 46.55,
    },
    {
      target: 544,
      value: 100,
      expected: 500,
    },
  ]

  cases.forEach(({ target, value, expected }) => {
    it(`target: ${target}, value: ${value}`, () => {
      expect(roundBy(target, value)).toBe(expected)
    })
  })
})
