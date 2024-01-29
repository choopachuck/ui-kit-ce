import { inverse } from './inverse'

describe('inverse', () => {
  /* eslint-disable */
  const originalWarn = window.console.log

  // Skip warnings from jest reports in terminal
  beforeAll(() => (window.console.warn = () => null))
  afterAll(() => (window.console.warn = originalWarn))

  const cases = [
    {
      input: null,
      expected: null,
    },
    {
      input: 1,
      expected: 1,
    },
    {
      input: [],
      expected: [],
    },
    {
      input: {},
      expected: {},
    },
    {
      input: {
        key: 'value',
      },
      expected: {
        key: 'value',
      },
    },
    {
      input: {
        key: 'value',
        key1: 'value1',
      },
      expected: {
        key: 'value1',
        key1: 'value',
      },
    },
    {
      input: {
        key: 'value',
        key1: 'value1',
        key2: 'value2',
      },
      expected: {
        key: 'value2',
        key1: 'value1',
        key2: 'value',
      },
    },
    {
      input: {
        key: 'value',
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
        key4: 'value4',
        key5: 'value5',
      },
      expected: {
        key: 'value5',
        key1: 'value4',
        key2: 'value3',
        key3: 'value2',
        key4: 'value1',
        key5: 'value',
      },
    },
  ]

  cases.forEach(({ input, expected }) => {
    it(`${input}`, () => {
      expect(inverse(input)).toStrictEqual(expected)
    })
  })
})
