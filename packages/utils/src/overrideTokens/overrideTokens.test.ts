import { overrideTokens } from './overrideTokens'

describe('overrideTokens', () => {
  it.each([
    [[{ a: 'a', b: 'b' }, { a: 'c' }], { a: 'c', b: 'b' }],
    [[{ a: 'a', b: 'b' }, { a: '' }], { a: 'a', b: 'b' }],
    [[{ a: 'a', b: 'b' }, { c: 'c' }], { a: 'a', b: 'b' }],
  ])('run with args %j', ([target, source], expected) => {
    expect(
      overrideTokens(
        target as Record<string, string>,
        source as Record<string, string>
      )
    ).toStrictEqual(expected)
  })
})
