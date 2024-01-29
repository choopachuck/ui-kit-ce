import { isMatchYears } from '../src/utils/isMatchYears'

describe('isMatchYears', () => {
  const cases = [
    {
      date: '21.02.2005',
      format: 'dd.MM.YYYY',
      expected: true,
    },
    {
      date: '21/02/2005',
      format: 'dd/mm/yyyy',
      expected: true,
    },
    {
      date: '21.02.200',
      format: 'DD.MM.YYYY',
      expected: false,
    },
    {
      date: '2000.02.15',
      format: 'YYYY.MM.DD',
      expected: true,
    },
    {
      date: '200.02.15',
      format: 'YYYY.MM.DD',
      expected: false,
    },
  ]

  cases.forEach(({ date, format, expected }) => {
    it(`Check date ${date} with format ${format}`, () => {
      expect(isMatchYears(date, format)).toBe(expected)
    })
  })
})
