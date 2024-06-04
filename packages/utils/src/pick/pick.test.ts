import { pick } from './pick'

describe('pick', () => {
  it('with string array', () => {
    expect(pick({ a: 'a', b: 'b', c: 'c' }, ['a', 'c'])).toStrictEqual({
      a: 'a',
      c: 'c',
    })
  })

  it('with regexp', () => {
    expect(pick({ aa: 'aa', b: 'ab', c: 'ac' }, /^a/)).toStrictEqual({
      aa: 'aa',
    })
  })

  it('with regexp and replace', () => {
    expect(
      pick({ aa: 'aa', b: 'ab', c: 'ac' }, /^a/, (key) => key.toUpperCase())
    ).toStrictEqual({ AA: 'aa' })
  })
})
