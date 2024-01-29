import { formatValueToOption } from '../src/utils'
import { getOptionValue } from '../src/builtins'

const options = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
]

describe('formatValueToOption', () => {
  it('should passed undefined, return an empty array', function () {
    expect(formatValueToOption(undefined, options, getOptionValue)).toEqual([])
  })

  it('should passed array of strings, return option', function () {
    expect(
      formatValueToOption(['vanilla', 'chocolate'], options, getOptionValue)
    ).toEqual([
      { value: 'vanilla', label: 'Vanilla' },
      { value: 'chocolate', label: 'Chocolate' },
    ])
  })

  it('should passed non-valid array of strings, return only valid option', function () {
    expect(
      formatValueToOption(['vanilla', '1'], options, getOptionValue)
    ).toEqual([{ value: 'vanilla', label: 'Vanilla' }])
  })

  it('should passed empty array, return empty array', function () {
    expect(formatValueToOption([], options, getOptionValue)).toEqual([])
  })

  it('should passed empty string, return empty array', function () {
    expect(formatValueToOption('', options, getOptionValue)).toEqual([])
  })

  it('should passed option value string, return option', function () {
    expect(
      formatValueToOption('salted-caramel', options, getOptionValue)
    ).toEqual([{ value: 'salted-caramel', label: 'Salted Caramel' }])
  })

  it('should passed option object, return option', function () {
    expect(
      formatValueToOption(
        { value: 'vanilla', label: 'Vanilla' },
        options,
        getOptionValue
      )
    ).toEqual([{ value: 'vanilla', label: 'Vanilla' }])
  })

  it('should passed array of object option, return option array', function () {
    expect(
      formatValueToOption(
        [
          { value: 'vanilla', label: 'Vanilla' },
          { value: 'chocolate', label: 'Chocolate' },
        ],
        options,
        getOptionValue
      )
    ).toEqual([
      { value: 'vanilla', label: 'Vanilla' },
      { value: 'chocolate', label: 'Chocolate' },
    ])
  })
})
