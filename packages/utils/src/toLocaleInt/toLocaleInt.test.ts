import { toLocaleInt } from './toLocaleInt'

describe('toLocaleInt', () => {
  const cases = [
    {
      input: '',
      expected: '',
      groupSeparator: ' ',
      description: 'Пустая строка',
    },
    {
      input: '123',
      expected: '123',
      groupSeparator: ' ',
      description: 'Cтрока без тысячных разрядов',
    },
    {
      input: '1234',
      expected: '1 234',
      groupSeparator: ' ',
      description: 'Cтрока с 1 тысячным разрядом',
    },
    {
      input: '123456',
      expected: '123 456',
      groupSeparator: ' ',
      description: 'Cтрока с 2 тысячными разрядами',
    },
    {
      input: '1234567',
      expected: '1 234 567',
      groupSeparator: ' ',
      description: 'Cтрока с 3 тысячными разрядами',
    },
    {
      input: '1234567',
      expected: '1,234,567',
      groupSeparator: ',',
      description: 'Cтрока с 3 тысячными разрядами и разделителем ","',
    },
    {
      input: '1234567',
      expected: '1.234.567',
      groupSeparator: '.',
      description: 'Cтрока с 3 тысячными разрядами и разделителем "."',
    },
  ]

  cases.forEach((item) => {
    it(item.description, () => {
      expect(toLocaleInt(item.input, item.groupSeparator)).toBe(item.expected)
    })
  })
})
