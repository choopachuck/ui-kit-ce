import { mergeClasses } from './mergeClasses'
import { clsx } from '@v-uik/theme'

describe('merge classes', () => {
  it.each([
    { classes1: {}, classes2: { a: 'class' }, expected: { a: 'class' } },
    { classes2: {}, classes1: { a: 'class' }, expected: { a: 'class' } },
    {
      classes1: { a: 'class1', c: 'class4' },
      classes2: { a: 'class2', b: 'class3' },
      expected: { a: 'class1 class2', b: 'class3', c: 'class4' },
    },
  ])('run with args %j', ({ classes1, classes2, expected }) => {
    expect(
      mergeClasses({ classes1, classes2, mergeCallback: clsx })
    ).toStrictEqual(expected)
  })
})
