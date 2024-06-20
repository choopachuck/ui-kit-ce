'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useButtonReset } from '@v-uik/hooks'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { useDefaultDates } from '../../hooks/useDefaultDates'
import { splitArrayIntoChunks } from '../../utils/common'
import { FunctionComponentCommonFields } from '../../interfaces/common'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

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
}))

const YEARS_IN_ROW = 3

export interface Props<TDate = unknown>
  extends ComponentPropsWithRefFix<'div'> {
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

    return yearsArrayByRow.map((yearsRow, rowIndex) => (
      <div key={`row-${rowIndex}`} className={classesList.row}>
        {yearsRow.map((year, index) => {
          return (
            <button
              key={`year-${rowIndex}-${index}`}
              ref={
                adapter.isSameYear(currentViewDate, year)
                  ? focusedButtonRef
                  : undefined
              }
              className={clsx(
                buttonClasses.resetButton,
                classesList.yearButton,
                {
                  [classesList.selected]: adapter.isSameYear(
                    currentViewDate,
                    year
                  ),
                }
              )}
              //aria-disabled вместо disabled, чтобы работала навигация с клавиатуры
              aria-disabled={isYearDisabled(year)}
              type="button"
              onClick={() => onClickYear(year)}
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
