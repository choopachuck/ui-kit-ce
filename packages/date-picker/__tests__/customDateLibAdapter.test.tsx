import { PartsOfRangeDate } from '../src/interfaces'
import { customDateLibAdapter } from '../src/utils/customDateLibAdapter'
import DateAdapter from '@date-io/date-fns'
import ruLocale from 'date-fns/locale/ru'
import { RangeDate } from '../src/interfaces'
import { jan_1, jan_2, jan_3, jan_4, jan_5, jan_6 } from './presetDates'

const CustomAdapter = customDateLibAdapter(DateAdapter)
const adapter = new CustomAdapter({ locale: ruLocale })

function dateToString<T>(rangeDate: T[]) {
  return JSON.stringify(rangeDate)
}

describe('setRangeDate', () => {
  it.each<{
    input: [keyof typeof PartsOfRangeDate, RangeDate<Date>, Date]
    expected: RangeDate<Date>
  }>([
    // Start dates to be changed
    {
      input: ['start', [null, null], jan_1],
      expected: [jan_1, null],
    },
    {
      input: ['start', [null, jan_4], jan_1],
      expected: [jan_1, jan_4],
    },
    {
      input: ['start', [null, jan_4], jan_6],
      expected: [jan_6, null],
    },
    {
      input: ['start', [jan_2, null], jan_1],
      expected: [jan_1, null],
    },
    {
      input: ['start', [jan_2, null], jan_3],
      expected: [jan_3, null],
    },
    {
      input: ['start', [jan_2, jan_4], jan_1],
      expected: [jan_1, jan_4],
    },
    {
      input: ['start', [jan_2, jan_4], jan_2],
      expected: [jan_2, jan_4],
    },
    {
      input: ['start', [jan_2, jan_4], jan_3],
      expected: [jan_3, jan_4],
    },
    {
      input: ['start', [jan_2, jan_4], jan_4],
      expected: [jan_4, jan_4],
    },
    {
      input: ['start', [jan_2, jan_4], jan_5],
      expected: [jan_5, null],
    },
    // End dates to be changed
    {
      input: ['end', [null, null], jan_1],
      expected: [null, jan_1],
    },
    {
      input: ['end', [null, jan_4], jan_1],
      expected: [null, jan_1],
    },
    {
      input: ['end', [null, jan_4], jan_4],
      expected: [null, jan_4],
    },
    {
      input: ['end', [null, jan_4], jan_5],
      expected: [null, jan_5],
    },
    {
      input: ['end', [jan_2, null], jan_1],
      expected: [jan_1, null],
    },
    {
      input: ['end', [jan_2, null], jan_2],
      expected: [jan_2, jan_2],
    },
    {
      input: ['end', [jan_2, null], jan_3],
      expected: [jan_2, jan_3],
    },
    {
      input: ['end', [jan_2, jan_4], jan_1],
      expected: [jan_1, null],
    },
    {
      input: ['end', [jan_2, jan_4], jan_2],
      expected: [jan_2, jan_2],
    },
    {
      input: ['end', [jan_2, jan_4], jan_3],
      expected: [jan_2, jan_3],
    },
    {
      input: ['end', [jan_2, jan_4], jan_4],
      expected: [jan_2, jan_4],
    },
    {
      input: ['end', [jan_2, jan_4], jan_5],
      expected: [jan_2, jan_5],
    },
  ])('%j', ({ input, expected }) => {
    const date = adapter.setRangeDate(...input)

    expect(dateToString(date)).toBe(dateToString(expected))
  })
})

describe('isNotNull', () => {
  it('null is empty date', () => {
    const date = adapter.isNotNull(null)

    expect(date).toBe(false)
  })

  it('jan_1 is NOT empty date', () => {
    const date = adapter.isNotNull(jan_1)

    expect(date).toBe(true)
  })
})

describe('getNextDateToBeChanged', () => {
  it.each<{
    input: [keyof typeof PartsOfRangeDate, RangeDate<Date>]
    expected: keyof typeof PartsOfRangeDate
  }>([
    {
      input: ['start', [null, null]],
      expected: 'start',
    },
    {
      input: ['end', [null, null]],
      expected: 'start',
    },
    {
      input: ['start', [jan_1, null]],
      expected: 'end',
    },
    {
      input: ['end', [jan_1, null]],
      expected: 'end',
    },
    {
      input: ['start', [null, jan_1]],
      expected: 'start',
    },
    {
      input: ['end', [null, jan_1]],
      expected: 'start',
    },
    {
      input: ['start', [jan_1, jan_2]],
      expected: 'end',
    },
    {
      input: ['end', [jan_1, jan_2]],
      expected: 'start',
    },
  ])('%j', ({ input, expected }) => {
    const dateToBeChanged = adapter.getNextDateToBeChanged(...input)

    expect(dateToBeChanged).toBe(expected)
  })
})
