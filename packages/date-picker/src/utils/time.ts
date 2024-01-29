import {
  BaseTimePickerViewType,
  DayPart,
  DisableTime,
} from '../interfaces/time'
import { CustomUtils } from './customDateLibAdapter'
import { TimeValidationError } from '../constants/common'
import { TRangeDate } from '../interfaces'

export function getAscendingArray(end: number, start?: number): number[] {
  return Array.from({ length: end }, (_x, i: number) => i).slice(start ?? 0)
}

export function filterByStep(values: number[], step: number): number[] {
  return values.filter((x) => Number.isInteger(x / step))
}

export function timeToString(
  view: BaseTimePickerViewType
): (value: number) => string {
  switch (view) {
    case 'milliseconds':
      return (value: number) => {
        const stringValue = String(value)
        if (stringValue.length === 1) {
          return `00${stringValue}`
        }

        if (stringValue.length === 2) {
          return `0${stringValue}`
        }

        return stringValue
      }
    case 'hours':
    case 'minutes':
    case 'seconds':
    default:
      return (value: number) => {
        const stringValue = String(value)
        if (stringValue.length === 2) {
          return stringValue
        }

        return `0${stringValue}`
      }
  }
}

export type TDirection = 'decrease' | 'increase'

type DirectionHandlers = {
  next: (index: number) => number
  first: (length: number) => number
}

const direction: Record<TDirection, DirectionHandlers> = {
  decrease: {
    next(index: number) {
      return index - 1
    },
    first(length: number) {
      return length - 1
    },
  },
  increase: {
    next(index: number) {
      return index + 1
    },
    first() {
      return 0
    },
  },
}

// фокусит следующую кнопку времени, исходя из направления нажатой клавиши
export function focusNextNode(type: TDirection): void {
  const focusedNode = document.activeElement
  if (!focusedNode) {
    return
  }

  const elems = focusedNode.parentNode?.childNodes
  if (!elems) {
    return
  }

  const buttons = Array.from(elems).filter((elem) => elem.nodeName === 'BUTTON')

  const focusedIndex = buttons.findIndex((x) => x === focusedNode)
  const next = buttons[direction[type].next(focusedIndex)]
  const first = buttons[direction[type].first(buttons.length)]

  const nextNode = (next ?? first) as HTMLButtonElement

  nextNode.focus()
}

// фокусит следующую колонку времени, исходя из направления нажатой клавиши
export function focusNextColumn(type: TDirection): void {
  const focusedNode = document.activeElement
  if (!focusedNode) {
    return
  }

  const focusedColumn = focusedNode.parentNode as HTMLDivElement
  if (!focusedColumn) {
    return
  }

  const root = focusedColumn.parentNode
  if (!root) {
    return
  }

  const columns = root.childNodes
  const columnIndex = Array.from(columns).findIndex((x) => x === focusedColumn)
  const next = columns[direction[type].next(columnIndex)]
  const first = columns[direction[type].first(columns.length)]

  const nextColumn = next ?? first
  const focusedIndex = Array.from(nextColumn?.childNodes)
    .filter((elem) => elem.nodeName === 'BUTTON')
    .findIndex((x) => (x as HTMLButtonElement).tabIndex === 0)

  const buttons = nextColumn.childNodes
  const currentButton = (buttons[focusedIndex] ??
    buttons[0]) as HTMLButtonElement

  currentButton.focus()
}

// проверяет, является ли текущее время, временем после полудня
export function isAfterNoon<TDate>(
  adapter: CustomUtils<TDate>,
  date: TDate
): boolean {
  const noon = adapter.setHours(adapter.startOfDay(date), 12)
  const isAfter = adapter.isAfter(date, noon) || adapter.getHours(date) === 12

  return isAfter
}

export function getDayPartTime<TDate>(
  adapter: CustomUtils<TDate>,
  date: TDate | null
): DayPart | undefined {
  if (!date || !adapter.isValid(date)) {
    return undefined
  }

  return isAfterNoon(adapter, date) ? 'pm' : 'am'
}

// переводит время из pm в am и наоборот, если это возможно
export function setDayPartTime<TDate>(
  adapter: CustomUtils<TDate>,
  dayPart: DayPart,
  date: TDate
): TDate {
  const isAfter = isAfterNoon(adapter, date)
  const isPm = 'pm' === dayPart

  if (isPm) {
    return isAfter ? date : adapter.addHours(date, 12)
  } else {
    return isAfter ? adapter.addHours(date, -12) : date
  }
}

export const focusSelectedTime = (elem: HTMLElement) =>
  setTimeout(() => {
    const firstFocusableElement =
      elem.querySelector('button[tabindex="0"]') ||
      elem.querySelector('button:not([aria-disabled="true"])')

    if (firstFocusableElement) {
      ;(firstFocusableElement as HTMLElement).focus?.()
    }
  })

export const isInvalid = <TDate = unknown>(
  value: TDate | null | number,
  adapter: CustomUtils<TDate>
): TimeValidationError.invalidTime | null => {
  if (!value || typeof value === 'number') {
    return null
  }

  return adapter.isValid(value) ? null : TimeValidationError.invalidTime
}

export const validate = <TDate = unknown>(
  value: TDate | null,
  adapter: CustomUtils<TDate>,
  shouldDisableTime?: DisableTime<TDate>
):
  | TimeValidationError.invalidTime
  | TimeValidationError.notAllowedTime
  | null => {
  if (!value) {
    return null
  }

  const isInvalidTime = isInvalid(value, adapter)
  if (isInvalidTime) {
    return isInvalidTime
  }

  if (
    shouldDisableTime?.(value, 'hours') ||
    shouldDisableTime?.(value, 'minutes') ||
    shouldDisableTime?.(value, 'seconds') ||
    shouldDisableTime?.(value, 'milliseconds') ||
    shouldDisableTime?.(value, 'dayPart')
  ) {
    return TimeValidationError.notAllowedTime
  }

  return null
}

export const isWrongDirection = <TDate = unknown>(
  range: TRangeDate<TDate>,
  index: 0 | 1,
  adapter: CustomUtils<TDate>
): TimeValidationError | null => {
  const value = range[index]

  if (!value || typeof value === 'number') {
    return null
  }

  if (
    index === 0 &&
    range[1] &&
    typeof range[1] !== 'number' &&
    adapter.isAfter(value, range[1])
  ) {
    return TimeValidationError.isAfterEndTime
  }

  if (
    index === 1 &&
    range[0] &&
    typeof range[0] !== 'number' &&
    adapter.isBefore(value, range[0])
  ) {
    return TimeValidationError.isBeforeStartTime
  }

  return null
}

export const validateRange = <TDate = unknown>(
  range: TRangeDate<TDate>,
  index: 0 | 1,
  adapter: CustomUtils<TDate>,
  shouldDisableTime?: DisableTime<TDate>
): [TimeValidationError | null, TimeValidationError | null] => {
  //check that both are valid
  const validStartError = isInvalid(range[0], adapter)
  const validEndError = isInvalid(range[1], adapter)

  if (validStartError || validEndError) {
    return [validStartError, validEndError]
  }

  //check direction valid
  const validationResult = isWrongDirection(range, index, adapter)

  if (validationResult) {
    const result: [TimeValidationError | null, TimeValidationError | null] = [
      null,
      null,
    ]

    result[index] = validationResult

    return result
  }

  //common valid
  const commonErrorStart =
    typeof range[0] !== 'number'
      ? validate<TDate>(range[0], adapter, shouldDisableTime)
      : null
  const commonErrorEnd =
    typeof range[1] !== 'number'
      ? validate<TDate>(range[1], adapter, shouldDisableTime)
      : null

  return [commonErrorStart, commonErrorEnd]
}
