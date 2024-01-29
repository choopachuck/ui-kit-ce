import { getPlural, Cases } from './getPlural'

describe('getPlural', () => {
  const pluralCases: Cases = {
    nom: 'программист',
    gen: 'программиста',
    plu: 'программистов',
  }

  const cases = [
    {
      input: 0,
      expected: pluralCases.plu,
    },
    {
      input: 1,
      expected: pluralCases.nom,
    },
    {
      input: 2,
      expected: pluralCases.gen,
    },
    {
      input: 3,
      expected: pluralCases.gen,
    },
    {
      input: 4,
      expected: pluralCases.gen,
    },
    {
      input: 5,
      expected: pluralCases.plu,
    },
    {
      input: 6,
      expected: pluralCases.plu,
    },
    {
      input: 7,
      expected: pluralCases.plu,
    },
    {
      input: 9,
      expected: pluralCases.plu,
    },
    {
      input: 10,
      expected: pluralCases.plu,
    },
    {
      input: 11,
      expected: pluralCases.plu,
    },
    {
      input: 101,
      expected: pluralCases.nom,
    },
    {
      input: 122,
      expected: pluralCases.gen,
    },
    {
      input: 1022,
      expected: pluralCases.gen,
    },
  ]

  cases.forEach(({ input, expected }) => {
    it(`Значние для числа ${input}`, () => {
      expect(getPlural(input, pluralCases)).toEqual(expected)
    })
  })
})
