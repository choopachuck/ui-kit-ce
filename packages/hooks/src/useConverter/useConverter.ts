import { useMemo, useCallback } from 'react'

import { toLocaleInt } from '@v-uik/utils'

export interface Options {
  /**
   * Число знаков после запятой
   */
  precision?: number
  /**
   * Разделитель групп.
   */
  groupSeparator?: string
  /**
   * Десятичный разделитель.
   */
  decimalSeparator?: string
}

export interface NumberParts {
  /**
   * Знак отрицания "-".
   * При его отсутствии содержит пустую строку.
   */
  sign: string
  /**
   * Целая часть числа.
   * При его отсутствии содержит пустую строку.
   */
  integer: string
  /**
   * Десятичный разделитель.
   * При его отсутствии содержит пустую строку.
   * Соответствует decimalSeparator из объекта options.
   */
  separator: string
  /**
   * Дробная часть числа.
   * При его отсутствии содержит пустую строку.
   */
  fraction: string
}

export interface IUseConverterValue {
  toNumber: (value: string) => number
  toString: (value: string) => string | null
  getFormattedString: (value: string, isNegativeZero: boolean) => string
}

type MatchedString = [
  string,
  string, // Знак отрицания "-"
  string, // Целая часть числа
  string, // Десятичный разделитель
  string // Дробная часть числа
]

/**
 * Обрабатывает числовое значение.
 * Обработка заключается в разбиении числа на части и
 * форматировании под определённый формат.
 */
export const useConverter = ({
  precision = 2,
  groupSeparator = ' ',
  decimalSeparator = ',',
}: Options = {}): IUseConverterValue => {
  const groupSeparatorRegex = useMemo(() => {
    return groupSeparator ? new RegExp(`\\${groupSeparator}`, 'g') : undefined
  }, [groupSeparator])

  /**
   * Регулярное выражение, которое разделяет строку на подстроки.
   * Анатомия регулярного выражения:
   * new RegExp(`([-]?)([0-9]*)([${decimalSeparator}]?)([0-9]*)`);
   *             ^^^^^ ^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^
   *               1      2               3               4
   *
   * 1. ([-]?) - находит и запоминает знак отрицания (если число отрицательное).
   * 2. ([0-9]*) - находит и запоминает произвольную последовательность чисел.
   * 3. ([${decimalSeparator}]?) - находит и запоминает десятичный разделитель.
   * 4. ([0-9]*) - находит и запоминает произвольную последовательность чисел.
   */
  const extractionRegex = useMemo(() => {
    return new RegExp(`([-]?)([0-9]*)([${decimalSeparator}]?)([0-9]*)`)
  }, [decimalSeparator])

  /**
   * Калбек, который возвращает фроматированную строку из обычной строки
   */
  const getFormattedString = useCallback(
    (value: string, isNegativeZero: boolean): string => {
      let valueAsString = value.replace('.', decimalSeparator)

      // Обработка кейса с учётом отрицательного нуля.
      // Проверка осуществляется средством сравнения с Number.NEGATIVE_INFINITY,
      // т.к. даже строгое сравнение даёт ложно положительный результат
      // 0 === -0 // true
      if (isNegativeZero) {
        valueAsString = `-${valueAsString}`
      }

      /**
       * Извлекает составные логические части строки.
       * В последующем они будут объединены по заданному формату.
       */
      const [
        ,
        sign, // Знак отрицания "-"
        integer, // Целая часть числа
        separator, // Десятичный разделитель
        fraction, // Дробная часть числа
      ] = valueAsString.match(extractionRegex) as MatchedString

      let formatted = sign

      // Для целой части необходимо пересчитать положение группового разделителя.
      if (integer !== '') {
        if (groupSeparatorRegex) {
          const cleared = integer.replace(groupSeparatorRegex, '')
          const asLocale = toLocaleInt(cleared, groupSeparator)

          formatted += asLocale
        } else {
          formatted += integer
        }
      }

      if (precision != null) {
        // Если количество знаков после запятой равно 0,
        // значит работа идёт только с целой частью
        // и нет необходимости обрабатывать разделитель и дробную часть.
        if (precision === 0) {
          return formatted
        }

        if (fraction.length < precision) {
          const length = precision - fraction.length
          const zeroes = new Array(length).fill(0).join('')

          formatted += decimalSeparator
          formatted += fraction
          formatted += zeroes
        } else {
          formatted += decimalSeparator
          formatted += fraction.substr(0, precision)
        }
      } else {
        if (separator !== '') {
          formatted += separator
        }
        if (fraction !== '') {
          formatted += fraction
        }
      }

      return formatted
    },
    [
      precision,
      groupSeparator,
      extractionRegex,
      decimalSeparator,
      groupSeparatorRegex,
    ]
  )

  /**
   * Каллбек, парсящий форматированную строку в обычную строку
   */
  const parseFormattedStringToRaw = useCallback(
    (value: string): string | never => {
      const [
        ,
        sign, // Знак отрицания "-"
        integer, // Целая часть числа
        separator, // Десятичный разделитель
        fraction, // Дробная часть числа
      ] = (
        groupSeparatorRegex ? value.replace(groupSeparatorRegex, '') : value
      ).match(extractionRegex) as MatchedString

      let formatted = sign

      // Для целой части необходимо пересчитать положение группового разделителя.
      if (integer !== '') {
        formatted += integer
      }
      if (separator !== '') {
        formatted += '.'
      }
      if (fraction !== '') {
        formatted += fraction
      }

      return formatted
    },
    [groupSeparatorRegex, extractionRegex]
  )

  /**
   * Калбек, возвращающий число из форматной строки
   */
  const toNumber = useCallback(
    (value: string): number => {
      if (value === '') {
        return Number.NaN
      }

      try {
        return Number(parseFormattedStringToRaw(value))
      } catch (e) {
        console.warn(e)
      }

      return Number.NaN
    },
    [parseFormattedStringToRaw]
  )

  /**
   * Калбек, возвращающий строку из форматной строки
   */
  const toString = useCallback(
    (value: string): string | null => {
      if (value === '') {
        return null
      }

      try {
        return parseFormattedStringToRaw(value)
      } catch (e) {
        console.warn(e)
      }

      return null
    },
    [parseFormattedStringToRaw]
  )

  return {
    toNumber,
    getFormattedString,
    toString,
  }
}
