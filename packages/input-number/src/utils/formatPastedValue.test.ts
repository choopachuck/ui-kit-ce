import { formatPastedValue } from './formatPastedValue'

const cases = [
  {
    value: '123.123,123',
    result: '123,123.123',
  },
  {
    value: '123.123.123',
    result: '123,123,123',
  },
  {
    value: '123,123.123',
    result: '123,123.123',
  },
  {
    value: '123/123/123,12',
    result: '123,123,123.12',
  },
  {
    value: '123/123/123.12',
    result: '123,123,123.12',
  },
  {
    value: '123 123 123.12',
    result: '123,123,123.12',
  },
  {
    value: '121_212.23',
    result: '121,212.23',
  },
  {
    value: '123%123.23',
    result: '123,123.23',
  },
  {
    value: '124*124*124.23',
    result: '124,124,124.23',
  },
  {
    value: '123#123#123.23',
    result: '123,123,123.23',
  },
  {
    value: '123$123$123.12',
    result: '123,123,123.12',
  },
  {
    value: '123@123@123.23',
    result: '123,123,123.23',
  },
  {
    value: '123s123s123.12',
    result: '123,123,123.12',
  },
  {
    value: '123-123-123.23',
    result: '123,123,123.23',
  },
  {
    value: '123+123+123.23',
    result: '123,123,123.23',
  },
  {
    value: '123!123!123.23',
    result: '123,123,123.23',
  },
  {
    value: '123^123^123.23',
    result: '123,123,123.23',
  },
  {
    value: '123(123(123.23',
    result: '123,123,123.23',
  },
  {
    value: '123123123.23',
    result: '123123123.23',
  },
  {
    value: '123123123,23',
    result: '123123123.23',
  },
  {
    value: '123~123~123.23',
    result: '123,123,123.23',
  },
  {
    value: '123,123,123',
    result: '123,123,123',
  },
  {
    value: '+123,123,123',
    result: '+123,123,123',
  },
  {
    value: '-123-123-123',
    result: '-123,123,123',
  },
  {
    value: '+123+123+123',
    result: '+123,123,123',
  },
]

describe('formatPastedValue', () => {
  cases.forEach((data, index) => {
    it(`case ${index}, value is ${data.value}, result is ${data.result}`, () => {
      expect(
        formatPastedValue({
          value: data.value,
          decimalSeparator: '.',
          groupSeparator: ',',
        })
      ).toEqual(data.result)
    })
  })
})
