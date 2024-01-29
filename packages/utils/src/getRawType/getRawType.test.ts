import { getRawType, RawTypes } from './getRawType'

describe('getRawType', () => {
  it.each([
    [null, RawTypes.null],
    [undefined, RawTypes.undefined],
    [1, RawTypes.number],
    ['string', RawTypes.string],
    [[], RawTypes.array],
    [{}, RawTypes.object],
    [/point/g, RawTypes.regexp],
  ])(`of %s`, (input, expected) => {
    expect(getRawType(input)).toBe(expected)
  })
})
