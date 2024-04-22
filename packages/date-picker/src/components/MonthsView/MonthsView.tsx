'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useButtonReset } from '@v-uik/hooks'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { splitArrayIntoChunks } from '../../utils/common'
import {
  CheckDateStateResult,
  FunctionComponentCommonFields,
} from '../../interfaces/common'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles((theme) => ({
  fullHeight: {
    height: 304,
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    width: 280,
    marginBottom: 4,

    '&:last-child': {
      marginBottom: 0,
    },
  },

  monthText: {
    fontSize: theme.comp.monthView.monthButtonTypographyFontSize,
    fontFamily: theme.comp.monthView.monthButtonTypographyFontFamily,
    fontWeight: theme.comp.monthView.monthButtonTypographyFontWeight,
    lineHeight: theme.comp.monthView.monthButtonTypographyLineHeight,
    letterSpacing: theme.comp.monthView.monthButtonTypographyLetterSpacing,
  },

  monthButton: {
    width: 93,
    height: 40,
    textTransform: 'capitalize',
    borderTopLeftRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
      theme.comp.monthView.monthButtonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
      theme.comp.monthView.monthButtonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
      theme.comp.monthView.monthButtonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
      theme.comp.monthView.monthButtonShapeBorderRadiusBottomRight,

    color: theme.comp.monthView.monthButtonColorText,
    cursor: 'pointer',
    position: 'relative',

    '&:focus-visible': {
      zIndex: 1,
      boxShadow: `0 0 0 2px ${theme.comp.monthView.monthButtonColorShadowFocus}`,
    },

    '&:hover': {
      backgroundColor: theme.comp.monthView.monthButtonColorBackgroundHover,
    },

    '&:active': {
      backgroundColor: theme.comp.monthView.monthButtonColorBackgroundActive,
    },

    '&[aria-disabled="true"]': {
      color: theme.comp.monthView.monthButtonColorTextDisabled,
      pointerEvents: 'none',
    },

    '&$selected': {
      color: theme.comp.monthView.monthButtonColorTextSelected,
      backgroundColor: theme.comp.monthView.monthButtonColorBackgroundSelected,
      borderWidth: 0,
      borderTopLeftRadius:
        theme.comp.monthView.monthButtonShapeBorderRadiusTopLeft,
      borderTopRightRadius:
        theme.comp.monthView.monthButtonShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.monthView.monthButtonShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.monthView.monthButtonShapeBorderRadiusBottomRight,

      '&:hover': {
        backgroundColor:
          theme.comp.monthView.monthButtonColorBackgroundSelectedHover,
      },

      '&:active': {
        backgroundColor:
          theme.comp.monthView.monthButtonColorBackgroundSelectedActive,
      },

      '&[aria-disabled="true"]': {
        color: theme.comp.monthView.monthButtonColorTextSelectedDisabled,
        backgroundColor:
          theme.comp.monthView.monthButtonColorBackgroundSelectedDisabled,
      },

      '&:focus-visible': {
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          borderRadius: 'inherit',
          borderStyle: theme.shape.borderStyle,
          borderWidth: theme.shape.borderWidth,
          borderColor: theme.comp.monthView.monthButtonColorBorderFocus,
        },
      },
    },

    '&$inRange': {
      backgroundColor:
        theme.comp.rangeDayView.dayButtonColorBackgroundWithinRange ||
        theme.comp.monthView.monthButtonColorBackgroundWithinRange,
    },

    '&$hovered': {
      borderRadius: 0,
      borderTop: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.monthView.monthButtonColorBorderHover
      }`,
      borderBottom: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.monthView.monthButtonColorBorderHover
      }`,

      '&$startOfRow': {
        borderLeft: `1px dashed ${
          theme.comp.rangeDayView.dayButtonColorBorderHover ||
          theme.comp.monthView.monthButtonColorBorderHover
        }`,
      },

      '&$endOfRow': {
        borderRight: `1px dashed ${
          theme.comp.rangeDayView.dayButtonColorBorderHover ||
          theme.comp.monthView.monthButtonColorBorderHover
        }`,
      },

      '&$inRange': {
        border: 0,
        backgroundColor:
          theme.comp.rangeDayView.dayButtonColorBackgroundWithinRangeHover ||
          theme.comp.monthView.monthButtonColorBackgroundWithinRangeHover,

        '&:hover': {
          backgroundColor:
            theme.comp.rangeDayView.dayButtonColorBackgroundWithinRangeHover ||
            theme.comp.monthView.monthButtonColorBackgroundWithinRangeHover,
        },
      },
    },

    '&$hovered-start': {
      borderLeft: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.monthView.monthButtonColorBorderHover
      }`,

      '&:not($inRange)': {
        borderTopLeftRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
          theme.comp.monthView.monthButtonShapeBorderRadiusTopLeft,
        borderBottomLeftRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
          theme.comp.monthView.monthButtonShapeBorderRadiusBottomLeft,
      },
    },

    '&$hovered-end': {
      borderRight: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.monthView.monthButtonColorBorderHover
      }`,

      '&:not($inRange)': {
        borderTopRightRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
          theme.comp.monthView.monthButtonShapeBorderRadiusTopRight,
        borderBottomRightRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
          theme.comp.monthView.monthButtonShapeBorderRadiusBottomRight,
      },
    },

    '&$startOfRow': {
      borderTopLeftRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
        theme.comp.monthView.monthButtonShapeBorderRadiusTopLeft,
      borderBottomLeftRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
        theme.comp.monthView.monthButtonShapeBorderRadiusBottomLeft,
    },

    '&$endOfRow': {
      borderTopRightRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
        theme.comp.monthView.monthButtonShapeBorderRadiusTopRight,
      borderBottomRightRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
        theme.comp.monthView.monthButtonShapeBorderRadiusBottomRight,
    },
  },

  selected: {},

  'selected-start': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  'selected-end': {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  inRange: {
    borderRadius: 0,
  },

  hovered: {},

  'hovered-start': {},

  'hovered-end': {},

  startOfRow: {},

  endOfRow: {},
}))

const MONTHS_IN_ROW = 3

export interface Props<TDate = unknown>
  extends ComponentPropsWithRefFix<'div'> {
  /**
   * Текущая дата просмотра календаря
   */
  currentViewDate: TDate
  /**
   * Обработчик нажатия кнопки месяца
   */
  onClickMonth: (date: TDate) => void
  /**
   * Флаг установки высоты
   */
  fullHeight?: boolean
  /**
   * Функция проверки отключена ли дата
   */
  isMonthDisabled: (date: TDate) => boolean
  /**
   * Функция проверки выбрана ли дата
   */
  isMonthSelected: (date: TDate) => CheckDateStateResult
  /**
   * Функция проверки находится ли дата в выбранном диапазоне
   */
  isInRange?: (date: TDate) => CheckDateStateResult
  /**
   * Функция проверки находится ли дата в диапазоне наведения
   */
  isInHoverRange?: (date: TDate) => CheckDateStateResult
  /**
   * Функция установки даты, на которую наведен курсор
   */
  setHoverDate?: (date: TDate | null) => void
}

interface IMonthsView extends FunctionComponentCommonFields<Props> {
  <TDate = unknown>(
    props: Props<TDate>,
    context?: unknown
  ): React.ReactElement | null
}

export const MonthsView: IMonthsView = <TDate extends unknown>(
  props: Props<TDate>
) => {
  const {
    className,
    currentViewDate,
    isMonthDisabled,
    isMonthSelected,
    isInRange,
    isInHoverRange,
    setHoverDate,
    onClickMonth,
    fullHeight,
    ...rest
  } = props

  const classesList = useStyles()
  const buttonClasses = useButtonReset()

  const adapter = useDateLibAdapter<TDate>()

  const focusedButtonRef = React.useRef<HTMLButtonElement>(null)

  const renderMonths = () => {
    const monthsArray = adapter.getMonthArray(currentViewDate)
    const monthsArrayByRow = splitArrayIntoChunks(monthsArray, MONTHS_IN_ROW)

    let isSelectedFound = false
    let isFocusedFound = false
    let isInRangeFound = false
    let isInHoverRangeFound = false

    return monthsArrayByRow.map((monthsRow, rowIndex) => (
      <div key={`row-${rowIndex}`} className={classesList.row}>
        {monthsRow.map((month, index) => {
          let isSelected = false
          let selectedPosition = ''
          if (!isSelectedFound) {
            const selectedResult = isMonthSelected(month)
            isSelected = selectedResult.value
            isSelectedFound = !!selectedResult.preventNextCheck
            selectedPosition = selectedResult.position ?? ''
          }

          let isFocused = false
          if (!isFocusedFound) {
            isFocused =
              isSelected || adapter.isSameMonth(currentViewDate, month)
            isFocusedFound = isFocused
          }

          let inRange = false
          if (!isSelected && !isInRangeFound && isInRange) {
            const inRangeResult = isInRange(month)
            inRange = inRangeResult.value
            isInRangeFound = !!inRangeResult.preventNextCheck
          }

          let inHoverRange = false
          let hoveredPosition = ''
          if (!isSelected && !isInHoverRangeFound && isInHoverRange) {
            const inHoverRangeResult = isInHoverRange(month)
            inHoverRange = inHoverRangeResult.value
            isInHoverRangeFound = !!inHoverRangeResult.preventNextCheck
            hoveredPosition = inHoverRangeResult.position ?? ''
          }

          return (
            <button
              key={`month-${rowIndex}-${index}`}
              ref={isFocused ? focusedButtonRef : undefined}
              className={clsx(
                buttonClasses.resetButton,
                classesList.monthButton,
                {
                  [classesList.selected]: isSelected,
                  [classesList[
                    `selected-${selectedPosition}` as keyof typeof classesList
                  ]]: selectedPosition,
                  [classesList.startOfRow]: index === 0,
                  [classesList.endOfRow]: index === MONTHS_IN_ROW - 1,
                  [classesList.inRange]: inRange,
                  [classesList.hovered]: inHoverRange,
                  [classesList[
                    `hovered-${hoveredPosition}` as keyof typeof classesList
                  ]]: hoveredPosition,
                }
              )}
              //aria-disabled вместо disabled, чтобы работала навигация с клавиатуры
              aria-disabled={isMonthDisabled(month)}
              type="button"
              onClick={() => onClickMonth(month)}
              onMouseEnter={
                setHoverDate ? () => setHoverDate(month) : undefined
              }
              onMouseLeave={setHoverDate ? () => setHoverDate(null) : undefined}
              onFocus={setHoverDate ? () => setHoverDate(month) : undefined}
              onBlur={setHoverDate ? () => setHoverDate(null) : undefined}
            >
              <span className={classesList.monthText}>
                {adapter.format(month, 'monthShort')}
              </span>
            </button>
          )
        })}
      </div>
    ))
  }

  React.useEffect(() => {
    focusedButtonRef.current?.focus()
  }, [])

  return (
    <div
      className={clsx(className, {
        [classesList.fullHeight]: fullHeight,
      })}
      {...rest}
    >
      {renderMonths()}
    </div>
  )
}

MonthsView.displayName = 'MonthsView'
