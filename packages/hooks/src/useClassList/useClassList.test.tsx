import * as React from 'react'
import { render } from '@testing-library/react'
import { useClassList } from './useClassList'

let tempResult: Record<string, string | undefined> | undefined

const TestComponent: React.VFC<{
  classes1: Record<string, string | undefined>
  classes2?: Record<string, string | undefined>
}> = (props) => {
  tempResult = useClassList(props.classes1, props.classes2)

  return null
}

describe('useClassList', () => {
  afterEach(() => {
    tempResult = undefined
  })

  const cases = [
    {
      classes1: { a: 'a', b: 'b' },
      classes2: undefined,
      result: { a: 'a', b: 'b' },
    },
    {
      classes1: { a: 'a', b: 'b' },
      classes2: {},
      result: { a: 'a', b: 'b' },
    },
    {
      classes1: {},
      classes2: { a: 'a', b: 'b' },
      result: { a: 'a', b: 'b' },
    },
    {
      classes1: { a: 'a', b: 'b' },
      classes2: { b: 'b2', c: 'c' },
      result: { a: 'a', b: 'b b2', c: 'c' },
    },
  ]

  cases.forEach(({ classes1, classes2, result }, index) => {
    it(`merged correctly - case ${index}`, () => {
      render(<TestComponent classes1={classes1} classes2={classes2} />)
      expect(tempResult).toEqual(result)
    })
  })
})
