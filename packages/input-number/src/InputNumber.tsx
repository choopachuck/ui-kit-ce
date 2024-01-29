import * as React from 'react'
import { isEqualKeyboardKeys, warning } from '@v-uik/utils'
import { Input, InputChangeReason, InputProps } from '@v-uik/input'
import { useConverter, useMergedRefs, useValue } from '@v-uik/hooks'
import { createList, formatPastedValue, Item, filterPredicate } from './utils'
import {
  ValueType,
  StringValue,
  NumberValue,
  ISelection,
  IParts,
} from './types'

export type Props<TCanClear extends boolean = boolean> = {
  /**
   * Число знаков после запятой
   */
  precision?: number
  /**
   * Десятичный разделитель
   */
  decimalSeparator?: string
  /**
   * Разделитель групп
   */
  groupSeparator?: string
} & Omit<InputProps<TCanClear>, 'value' | 'onChange'> &
  ValueType<TCanClear>

const NEGATIVE_SIGN = '-'
const GROUP_SIZE = 3

const _InputNumber = React.forwardRef(
  <TCanClear extends boolean = boolean>(
    {
      precision = 2,
      groupSeparator = ' ',
      decimalSeparator = ',',
      inputRef: inputRefProp = null,
      onKeyDownCapture,
      valueType = 'number',
      value,
      onChange,
      onPaste: onPasteProps,
      ...rest
    }: Props<TCanClear>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { toString, toNumber, getFormattedString } = useConverter({
      precision,
      groupSeparator,
      decimalSeparator,
    })

    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const mergedInputRef = useMergedRefs([inputRefProp, inputRef])

    const keyBefore = React.useRef<string | null>(null)

    const wasPasteEvent = React.useRef<boolean>(false)

    /**
     * Функция, возвращающая форматированное значение
     */
    const toFormattedString = React.useCallback(
      (value: string | number | null | undefined): string => {
        if (!value && value !== 0) {
          return ''
        }

        if (valueType === 'number') {
          // Обработка кейса с учётом отрицательного нуля.
          // Проверка осуществляется средством сравнения с Number.NEGATIVE_INFINITY,
          // т.к. даже строгое сравнение даёт ложно положительный результат
          // 0 === -0 // true
          const isNegativeZero =
            value === 0 ? 1 / value === Number.NEGATIVE_INFINITY : false

          return getFormattedString(String(value), isNegativeZero)
        }

        return getFormattedString(value as string, value === '-0')
      },
      [valueType, getFormattedString]
    )

    const [focus, setFocus] = React.useState(false)
    const [inputValue, setInputValue] = useValue(value, {
      formatValueFromProp: toFormattedString,
      fallbackValue: '',
      useInnerState: focus,
    })

    const [selection, setSelection] = React.useState<ISelection | null>(null)

    const handleKeyDownCapture = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDownCapture?.(e)
      keyBefore.current = e.key
    }

    const handleChange = (
      newValueArg: string,
      e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>,
      reason?: InputChangeReason
    ) => {
      const { selectionStart } = (e as React.ChangeEvent<HTMLInputElement>)
        .currentTarget
      let newValue = newValueArg

      if (wasPasteEvent.current) {
        newValue = formatPastedValue({
          value: newValue,
          groupSeparator,
          decimalSeparator,
        })
      }

      const list = createList(newValue.split(''), selectionStart)
      const negativeSign = newValue.startsWith(NEGATIVE_SIGN) ? list[0] : null

      wasPasteEvent.current = false

      const parts: IParts = {
        negativeSign,
        integer: list,
        fraction: [],
        separator: null,
      }

      /* ---------------------------------------------------------------- */
      /* -----------------Позиция десятичного разделителя---------------- */
      /* ---------------------------------------------------------------- */
      if (newValue.includes(decimalSeparator)) {
        const indexFirst = newValue.indexOf(decimalSeparator)
        const indexLast = newValue.lastIndexOf(decimalSeparator)
        const indexPrevious = inputValue.indexOf(decimalSeparator)

        let indexOfSeparator = indexFirst

        // Если позиция первого разделителя не равна позиции последнего,
        // значит новый разделитель(-и) были добавлены в строку.
        if (indexFirst !== indexLast && indexPrevious === indexFirst) {
          indexOfSeparator = indexLast
        }

        parts.integer = list.slice(0, indexOfSeparator)
        parts.fraction = list.slice(indexOfSeparator + 1)
        parts.separator = precision ? list[indexOfSeparator] : null
      }

      /* ---------------------------------------------------------------- */
      /* --------------------Фильтрация целой части---------------------- */
      /* ---------------------------------------------------------------- */
      parts.integer = parts.integer.filter(filterPredicate)

      /* ---------------------------------------------------------------- */
      /* -----------------Добавление разделителей групп------------------ */
      /* ---------------------------------------------------------------- */
      if (groupSeparator && parts.integer.length > GROUP_SIZE) {
        const to = parts.integer.length % GROUP_SIZE
        const from = parts.integer.length - GROUP_SIZE

        for (let i = from; i >= to; i -= GROUP_SIZE) {
          if (i === 0) {
            break
          }

          const item: Item = {
            value: groupSeparator,
            hasCaret: false,
            neighborRight: parts.integer[i],
            neighborLeft: parts.integer[i].neighborLeft,
          }

          if (
            keyBefore.current &&
            isEqualKeyboardKeys('Backspace', keyBefore.current)
          ) {
            if (parts.integer[i].hasCaret) {
              parts.integer[i].hasCaret = false
              item.hasCaret = true
            }
          }

          parts.integer.splice(i, 0, item)
        }
      }

      /* ---------------------------------------------------------------- */
      /* ------------------Фильтрация десятичной части------------------- */
      /* --------------------Обрезание дробной части--------------------- */
      /* ---------------------------------------------------------------- */
      if (parts.fraction.length) {
        parts.fraction = parts.fraction.filter(filterPredicate)

        if (precision !== null && precision !== 0) {
          parts.fraction = parts.fraction.slice(0, precision)

          if (parts.fraction.length) {
            parts.fraction[parts.fraction.length - 1].neighborRight = null
          }
        }

        if (!precision) {
          parts.fraction = []
        }
      }

      const partsLength =
        parts.integer.length +
        parts.fraction.length +
        Number(!!parts.negativeSign) +
        Number(!!parts.separator)

      const { newInputValue, caretPosition } = [
        parts.negativeSign,
        ...parts.integer,
        parts.separator,
        ...parts.fraction,
      ]
        .filter((item) => item)
        .reduce<ISelection>(
          (acc, item, index) => {
            acc.caretPosition = item?.hasCaret ? index : acc.caretPosition
            acc.newInputValue = `${acc.newInputValue ?? ''}${item?.value ?? ''}`

            return acc
          },
          {
            newInputValue: '',
            caretPosition: selectionStart
              ? selectionStart + partsLength - list.length
              : partsLength,
          }
        )

      if (
        valueType === 'number' &&
        (toNumber(newInputValue ?? '') > Number.MAX_SAFE_INTEGER ||
          toNumber(newInputValue ?? '') < Number.MIN_SAFE_INTEGER)
      ) {
        warning(
          false,
          'InputNumber',
          `Значение вышло за пределы  Number.MAX_SAFE_INTEGER или Number.MIN_SAFE_INTEGER. Используйте valueType='string'`
        )

        return
      }

      setInputValue(newInputValue ?? '')
      setSelection({ caretPosition })

      if (onChange) {
        if (valueType === 'string') {
          const asString = toString(newInputValue ?? '')

          if (asString !== value) {
            ;(onChange as StringValue['onChange'])?.(
              asString,
              e as React.ChangeEvent<HTMLInputElement>,
              reason
            )
          }

          return
        }

        if (valueType === 'number') {
          const asNumber = toNumber(newInputValue ?? '')

          if (asNumber === 0 && asNumber === value) {
            const isNegativeZero = 1 / value === Number.NEGATIVE_INFINITY
            const isPositiveZero = 1 / asNumber === Number.POSITIVE_INFINITY

            const a = isNegativeZero && isPositiveZero
            const b = !isNegativeZero && !isPositiveZero

            if (a || b) {
              ;(onChange as NumberValue['onChange'])?.(
                asNumber,
                e as React.ChangeEvent<HTMLInputElement>,
                reason
              )
            }

            return
          }

          if (asNumber !== value) {
            ;(onChange as NumberValue['onChange'])?.(
              Number.isNaN(asNumber) ? null : asNumber,
              e as React.ChangeEvent<HTMLInputElement>,
              reason
            )
          }
        }
      }
    }

    React.useEffect(() => {
      if (inputRef.current && selection) {
        inputRef.current.setSelectionRange(
          selection.caretPosition,
          selection.caretPosition
        )
      }
    }, [selection])

    const onPaste = React.useCallback(
      (e) => {
        wasPasteEvent.current = true
        onPasteProps?.(e)
      },
      [onPasteProps]
    )

    const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
      rest.onBlur?.(e)

      setInputValue(toFormattedString(value))
      setFocus(false)
    }

    const handleFocus = (e: React.FocusEvent<HTMLDivElement, Element>) => {
      rest.onFocus?.(e)

      setFocus(true)
    }

    return (
      <Input
        {...rest}
        ref={ref}
        inputRef={mergedInputRef}
        value={inputValue}
        onPaste={onPaste}
        onChange={handleChange as InputProps<TCanClear>['onChange']}
        onKeyDownCapture={handleKeyDownCapture}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
)

export const InputNumber = _InputNumber as <
  TCanClear extends boolean = boolean
>(
  props: Props<TCanClear> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement
