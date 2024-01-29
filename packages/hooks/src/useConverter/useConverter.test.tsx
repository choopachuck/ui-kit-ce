import * as React from 'react'
import { render } from '@testing-library/react'

import { useConverter, Options, IUseConverterValue } from './useConverter'

describe('useConverter', () => {
  let toString: IUseConverterValue['toString'] | undefined
  let toNumber: IUseConverterValue['toNumber'] | undefined
  let getFormattedString: IUseConverterValue['getFormattedString'] | undefined

  const TestComponent = (options: Options = {}) => {
    const converter = useConverter(options)

    toString = converter.toString
    toNumber = converter.toNumber
    getFormattedString = converter.getFormattedString

    return null
  }

  describe('Свойства по-умолчанию', () => {
    beforeEach(() => {
      render(<TestComponent />)
    })

    afterEach(() => {
      toString = undefined
      toNumber = undefined
      getFormattedString = undefined
    })

    describe('toString', () => {
      const cases = [
        {
          input: '0,00',
          expected: '0.00',
          description: 'Ноль',
        },
        {
          input: '-0,00',
          expected: '-0.00',
          description: 'Отрицательный ноль',
        },
        {
          input: '1,00',
          expected: '1.00',
          description: 'Простое число',
        },
        {
          input: '-1,00',
          expected: '-1.00',
          description: 'Простое отрицательное число',
        },
        {
          input: '1 234,00',
          expected: '1234.00',
          description: 'Число с 1 группой тысячных',
        },
        {
          expected: '-1234.00',
          input: '-1 234,00',
          description: 'Отрицательное число с 1 группой тысячных',
        },
        {
          expected: '123456.00',
          input: '123 456,00',
          description: 'Число с 2 группами тысячных',
        },
        {
          expected: '-123456.00',
          input: '-123 456,00',
          description: 'Отрицательное число с 2 группами тысячных',
        },
        {
          expected: '1.10',
          input: '1,10',
          description: 'Десятичное число',
        },
        {
          expected: '1.11',
          input: '1,11',
          description: 'Десятичное число #2',
        },
        {
          expected: '1.1123456',
          input: '1,1123456',
          description: 'Десятичное число #3',
        },
        {
          expected: '-1.10',
          input: '-1,10',
          description: 'Отрицательное десятичное число',
        },
        {
          expected: '-1.11',
          input: '-1,11',
          description: 'Отрицательное десятичное число #2',
        },
        {
          expected: '-1.1123456',
          input: '-1,1123456',
          description: 'Отрицательное десятичное число #3',
        },
        {
          expected: '1234.10',
          input: '1 234,10',
          description: 'Десятичное число с 1 группой тысячных',
        },
        {
          expected: '-1234.10',
          input: '-1 234,10',
          description: 'Отрицательное десятичное число с 1 группой тысячных',
        },
        {
          expected: '123456.10',
          input: '123 456,10',
          description: 'Десятичное число с 2 группами тысячных',
        },
        {
          expected: '-123456.10',
          input: '-123 456,10',
          description: 'Отрицательное десятичное число с 2 группами тысячных',
        },
      ]

      cases.forEach((item) => {
        it(item.description, () => {
          expect(toString?.(item.input)).toBe(item.expected)
        })
      })
    })

    describe('getFormattedString', () => {
      const cases = [
        {
          input: 0,
          expected: '0,00',
          description: 'Ноль',
        },
        {
          input: -0,
          expected: '-0,00',
          description: 'Отрицательный ноль',
        },
        {
          input: 1,
          expected: '1,00',
          description: 'Простое число',
        },
        {
          input: -1,
          expected: '-1,00',
          description: 'Простое отрицательное число',
        },
        {
          input: 1234,
          expected: '1 234,00',
          description: 'Число с 1 группой тысячных',
        },
        {
          input: -1234,
          expected: '-1 234,00',
          description: 'Отрицательное число с 1 группой тысячных',
        },
        {
          input: 123456,
          expected: '123 456,00',
          description: 'Число с 2 группами тысячных',
        },
        {
          input: -123456,
          expected: '-123 456,00',
          description: 'Отрицательное число с 2 группами тысячных',
        },
        {
          input: 1.1,
          expected: '1,10',
          description: 'Десятичное число',
        },
        {
          input: 1.11,
          expected: '1,11',
          description: 'Десятичное число #2',
        },
        {
          input: 1.1123456,
          expected: '1,11',
          description: 'Десятичное число #3',
        },
        {
          input: -1.1,
          expected: '-1,10',
          description: 'Отрицательное десятичное число',
        },
        {
          input: -1.11,
          expected: '-1,11',
          description: 'Отрицательное десятичное число #2',
        },
        {
          input: -1.1123456,
          expected: '-1,11',
          description: 'Отрицательное десятичное число #3',
        },
        {
          input: 1234.1,
          expected: '1 234,10',
          description: 'Десятичное число с 1 группой тысячных',
        },
        {
          input: -1234.1,
          expected: '-1 234,10',
          description: 'Отрицательное десятичное число с 1 группой тысячных',
        },
        {
          input: 123456.1,
          expected: '123 456,10',
          description: 'Десятичное число с 2 группами тысячных',
        },
        {
          input: -123456.1,
          expected: '-123 456,10',
          description: 'Отрицательное десятичное число с 2 группами тысячных',
        },
      ]

      cases.forEach((item) => {
        it(item.description, () => {
          const isNegativeZero =
            item.input === 0
              ? 1 / item.input === Number.NEGATIVE_INFINITY
              : false

          expect(getFormattedString?.(String(item.input), isNegativeZero)).toBe(
            item.expected
          )
        })
      })
    })

    describe('toNumber', () => {
      const cases = [
        {
          input: '0,00',
          expected: 0,
          description: 'Ноль',
        },
        {
          input: '-0,00',
          expected: -0,
          description: 'Отрицательный ноль',
        },
        {
          input: '1,00',
          expected: 1,
          description: 'Простое число',
        },
        {
          input: '-1,00',
          expected: -1,
          description: 'Простое отрицательное число',
        },
        {
          input: '1 234,00',
          expected: 1234,
          description: 'Число с 1 группой тысячных',
        },
        {
          expected: -1234,
          input: '-1 234,00',
          description: 'Отрицательное число с 1 группой тысячных',
        },
        {
          expected: 123456,
          input: '123 456,00',
          description: 'Число с 2 группами тысячных',
        },
        {
          expected: -123456,
          input: '-123 456,00',
          description: 'Отрицательное число с 2 группами тысячных',
        },
        {
          expected: 1.1,
          input: '1,10',
          description: 'Десятичное число',
        },
        {
          expected: 1.11,
          input: '1,11',
          description: 'Десятичное число #2',
        },
        {
          expected: 1.1123456,
          input: '1,1123456',
          description: 'Десятичное число #3',
        },
        {
          expected: -1.1,
          input: '-1,10',
          description: 'Отрицательное десятичное число',
        },
        {
          expected: -1.11,
          input: '-1,11',
          description: 'Отрицательное десятичное число #2',
        },
        {
          expected: -1.1123456,
          input: '-1,1123456',
          description: 'Отрицательное десятичное число #3',
        },
        {
          expected: 1234.1,
          input: '1 234,10',
          description: 'Десятичное число с 1 группой тысячных',
        },
        {
          expected: -1234.1,
          input: '-1 234,10',
          description: 'Отрицательное десятичное число с 1 группой тысячных',
        },
        {
          expected: 123456.1,
          input: '123 456,10',
          description: 'Десятичное число с 2 группами тысячных',
        },
        {
          expected: -123456.1,
          input: '-123 456,10',
          description: 'Отрицательное десятичное число с 2 группами тысячных',
        },
      ]

      cases.forEach((item) => {
        it(item.description, () => {
          expect(toNumber?.(item.input)).toBe(item.expected)
        })
      })
    })
  })
})
