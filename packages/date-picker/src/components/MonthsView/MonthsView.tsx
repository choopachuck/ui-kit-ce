'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useButtonReset } from '@v-uik/hooks'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { splitArrayIntoChunks } from '../../utils/common'
import { FunctionComponentCommonFields } from '../../interfaces/common'
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
  },

  selected: {},
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

    return monthsArrayByRow.map((monthsRow, rowIndex) => (
      <div key={`row-${rowIndex}`} className={classesList.row}>
        {monthsRow.map((month, index) => {
          return (
            <button
              key={`month-${rowIndex}-${index}`}
              ref={
                adapter.isSameMonth(currentViewDate, month)
                  ? focusedButtonRef
                  : undefined
              }
              className={clsx(
                buttonClasses.resetButton,
                classesList.monthButton,
                {
                  [classesList.selected]: adapter.isSameMonth(
                    currentViewDate,
                    month
                  ),
                }
              )}
              //aria-disabled вместо disabled, чтобы работала навигация с клавиатуры
              aria-disabled={isMonthDisabled(month)}
              type="button"
              onClick={() => onClickMonth(month)}
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
