'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useButtonReset } from '@v-uik/button'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { useDefaultDates } from '../../hooks/useDefaultDates'
import { splitArrayIntoChunks } from '../../utils/common'
import {
  CheckDateStateResult,
  FunctionComponentCommonFields,
} from '../../interfaces/common'

const useStyles = createUseStyles((theme) => ({
  years: {
    width: 288,
    height: 304,
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: -8,
    padding: 2,
    margin: -2,
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,

    '&:last-child': {
      marginBottom: 0,
    },
  },

  yearText: {
    fontSize: theme.comp.yearView.yearButtonTypographyFontSize,
    fontFamily: theme.comp.yearView.yearButtonTypographyFontFamily,
    fontWeight: theme.comp.yearView.yearButtonTypographyFontWeight,
    lineHeight: theme.comp.yearView.yearButtonTypographyLineHeight,
    letterSpacing: theme.comp.yearView.yearButtonTypographyLetterSpacing,
  },

  yearButton: {
    width: 90,
    height: 40,
    borderTopLeftRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
      theme.comp.yearView.yearButtonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
      theme.comp.yearView.yearButtonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
      theme.comp.yearView.yearButtonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
      theme.comp.yearView.yearButtonShapeBorderRadiusBottomRight,
    color: theme.comp.yearView.yearButtonColorText,
    cursor: 'pointer',
    position: 'relative',

    '&:focus-visible': {
      zIndex: 1,
      boxShadow: `0 0 0 2px ${theme.comp.yearView.yearButtonColorShadowFocus}`,
    },

    '&:hover': {
      backgroundColor: theme.comp.yearView.yearButtonColorBackgroundHover,
    },

    '&:active': {
      backgroundColor: theme.comp.yearView.yearButtonColorBackgroundActive,
    },

    '&[aria-disabled="true"]': {
      color: theme.comp.yearView.yearButtonColorTextDisabled,
      pointerEvents: 'none',
    },

    '&$inRange': {
      backgroundColor:
        theme.comp.rangeDayView.dayButtonColorBackgroundWithinRange ||
        theme.comp.yearView.yearButtonColorBackgroundWithinRange,
    },

    '&$hovered': {
      borderRadius: 0,
      borderTop: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.yearView.yearButtonColorBorderHover
      }`,
      borderBottom: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.yearView.yearButtonColorBorderHover
      }`,

      '&$startOfRow': {
        borderLeft: `1px dashed ${
          theme.comp.rangeDayView.dayButtonColorBorderHover ||
          theme.comp.yearView.yearButtonColorBorderHover
        }`,
      },

      '&$endOfRow': {
        borderRight: `1px dashed ${
          theme.comp.rangeDayView.dayButtonColorBorderHover ||
          theme.comp.yearView.yearButtonColorBorderHover
        }`,
      },

      '&$inRange': {
        border: 0,
        backgroundColor:
          theme.comp.rangeDayView.dayButtonColorBackgroundWithinRangeHover ||
          theme.comp.yearView.yearButtonColorBackgroundWithinRangeHover,

        '&:hover': {
          backgroundColor:
            theme.comp.rangeDayView.dayButtonColorBackgroundWithinRangeHover ||
            theme.comp.yearView.yearButtonColorBackgroundWithinRangeHover,
        },
      },
    },

    '&$hovered-start': {
      borderLeft: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.yearView.yearButtonColorBorderHover
      }`,

      '&:not($inRange)': {
        borderTopLeftRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
          theme.comp.yearView.yearButtonShapeBorderRadiusTopLeft,
        borderBottomLeftRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
          theme.comp.yearView.yearButtonShapeBorderRadiusBottomLeft,
      },
    },

    '&$hovered-end': {
      borderRight: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.yearView.yearButtonColorBorderHover
      }`,

      '&:not($inRange)': {
        borderTopRightRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
          theme.comp.yearView.yearButtonShapeBorderRadiusTopRight,
        borderBottomRightRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
          theme.comp.yearView.yearButtonShapeBorderRadiusBottomRight,
      },
    },

    '&$startOfRow': {
      borderTopLeftRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
        theme.comp.yearView.yearButtonShapeBorderRadiusTopLeft,
      borderBottomLeftRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
        theme.comp.yearView.yearButtonShapeBorderRadiusBottomLeft,
    },

    '&$endOfRow': {
      borderTopRightRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
        theme.comp.yearView.yearButtonShapeBorderRadiusTopRight,
      borderBottomRightRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
        theme.comp.yearView.yearButtonShapeBorderRadiusBottomRight,
    },

    '&$selected': {
      color: theme.comp.yearView.yearButtonColorTextSelected,
      backgroundColor: theme.comp.yearView.yearButtonColorBackgroundSelected,
      borderWidth: 0,
      borderTopLeftRadius:
        theme.comp.yearView.yearButtonShapeBorderRadiusTopLeft,
      borderTopRightRadius:
        theme.comp.yearView.yearButtonShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.yearView.yearButtonShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.yearView.yearButtonShapeBorderRadiusBottomRight,

      '&:hover': {
        backgroundColor:
          theme.comp.yearView.yearButtonColorBackgroundSelectedHover,
      },

      '&:active': {
        backgroundColor:
          theme.comp.yearView.yearButtonColorBackgroundSelectedActive,
      },

      '&[aria-disabled="true"]': {
        color: theme.comp.yearView.yearButtonColorTextSelectedDisabled,
        backgroundColor:
          theme.comp.yearView.yearButtonColorBackgroundSelectedDisabled,
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
          borderColor: theme.comp.yearView.yearButtonColorBorderFocus,
        },
      },
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

const YEARS_IN_ROW = 3

export interface Props<TDate = unknown>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Минимальная допустимая дата
   */
  minDate?: TDate
  /**
   * Максимальная допустимая дата
   */
  maxDate?: TDate
  /**
   * Текущая дата просмотра календаря
   */
  currentViewDate: TDate
  /**
   * Обработчик нажатия кнопки года
   */
  onClickYear: (date: TDate) => void
  /**
   * Функция проверки отключена ли дата
   */
  isYearDisabled: (date: TDate) => boolean
  /**
   * Функция проверки выбрана ли дата
   */
  isYearSelected: (date: TDate) => CheckDateStateResult
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

interface IYearsView extends FunctionComponentCommonFields<Props> {
  <TDate = unknown>(
    props: Props<TDate>,
    context?: unknown
  ): React.ReactElement | null
}

export const YearsView: IYearsView = <TDate extends unknown>(
  props: Props<TDate>
) => {
  const {
    className,
    currentViewDate,
    onClickYear,
    isYearDisabled,
    isYearSelected,
    isInRange,
    isInHoverRange,
    setHoverDate,
    minDate: propMinDate,
    maxDate: propMaxDate,
    ...rest
  } = props
  const classesList = useStyles()
  const buttonClasses = useButtonReset()

  const adapter = useDateLibAdapter<TDate>()

  const { minDate, maxDate } = useDefaultDates({
    minDate: propMinDate,
    maxDate: propMaxDate,
  })

  const focusedButtonRef = React.useRef<HTMLButtonElement>(null)

  const renderYears = () => {
    const yearsArray = adapter.getYearRange(minDate, maxDate)
    const yearsArrayByRow = splitArrayIntoChunks(yearsArray, YEARS_IN_ROW)

    let isSelectedFound = false
    let isFocusedFound = false
    let isInRangeFound = false
    let isInHoverRangeFound = false

    return yearsArrayByRow.map((yearsRow, rowIndex) => (
      <div key={`row-${rowIndex}`} className={classesList.row}>
        {yearsRow.map((year, index) => {
          let isSelected = false
          let selectedPosition = ''
          if (!isSelectedFound) {
            const selectedResult = isYearSelected(year)
            isSelected = selectedResult.value
            isSelectedFound = !!selectedResult.preventNextCheck
            selectedPosition = selectedResult.position ?? ''
          }

          let isFocused = false
          if (!isFocusedFound) {
            isFocused = isSelected || adapter.isSameYear(currentViewDate, year)
            isFocusedFound = isFocused
          }

          let inRange = false
          if (!isSelected && !isInRangeFound && isInRange) {
            const inRangeResult = isInRange(year)
            inRange = inRangeResult.value
            isInRangeFound = !!inRangeResult.preventNextCheck
          }

          let inHoverRange = false
          let hoveredPosition = ''
          if (!isSelected && !isInHoverRangeFound && isInHoverRange) {
            const inHoverRangeResult = isInHoverRange(year)
            inHoverRange = inHoverRangeResult.value
            isInHoverRangeFound = !!inHoverRangeResult.preventNextCheck
            hoveredPosition = inHoverRangeResult.position ?? ''
          }

          return (
            <button
              key={`year-${rowIndex}-${index}`}
              ref={isFocused ? focusedButtonRef : undefined}
              className={clsx(
                buttonClasses.resetButton,
                classesList.yearButton,
                {
                  [classesList.selected]: isSelected,
                  [classesList[
                    `selected-${selectedPosition}` as keyof typeof classesList
                  ]]: selectedPosition,
                  [classesList.startOfRow]: index === 0,
                  [classesList.endOfRow]: index === YEARS_IN_ROW - 1,
                  [classesList.inRange]: inRange,
                  [classesList.hovered]: inHoverRange,
                  [classesList[
                    `hovered-${hoveredPosition}` as keyof typeof classesList
                  ]]: hoveredPosition,
                }
              )}
              //aria-disabled вместо disabled, чтобы работала навигация с клавиатуры
              aria-disabled={isYearDisabled(year)}
              type="button"
              onClick={() => onClickYear(year)}
              onMouseEnter={setHoverDate ? () => setHoverDate(year) : undefined}
              onMouseLeave={setHoverDate ? () => setHoverDate(null) : undefined}
              onFocus={setHoverDate ? () => setHoverDate(year) : undefined}
              onBlur={setHoverDate ? () => setHoverDate(null) : undefined}
            >
              <span className={classesList.yearText}>
                {adapter.format(year, 'year')}
              </span>
            </button>
          )
        })}
      </div>
    ))
  }

  React.useEffect(() => {
    focusedButtonRef.current?.scrollIntoView({ block: 'center' })
    focusedButtonRef.current?.focus()
  }, [])

  return (
    <div className={clsx(className, classesList.years)} {...rest}>
      {renderYears()}
    </div>
  )
}

YearsView.displayName = 'YearsView'
