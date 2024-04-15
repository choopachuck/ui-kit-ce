'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useButtonReset } from '@v-uik/hooks'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { useNowDate } from '../../hooks/useNowDate'
import {
  CheckDateStateResult,
  FunctionComponentCommonFields,
} from '../../interfaces/common'
import { CalendarViewClasses as Classes } from '../../interfaces/classes'
import { useClassList } from '@v-uik/hooks'

const useStyles = createUseStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,

    '&:last-child': {
      marginBottom: 0,
    },
  },

  weekDay: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.comp.rangeDayView.weekDayColorText ||
      theme.comp.dayView.weekDayColorText,

    fontSize: theme.comp.dayView.weekDayTypographyFontSize,
    fontFamily: theme.comp.dayView.weekDayTypographyFontFamily,
    fontWeight: theme.comp.dayView.weekDayTypographyFontWeight,
    letterSpacing: theme.comp.dayView.weekDayTypographyLetterSpacing,
    lineHeight: theme.comp.dayView.weekDayTypographyLineHeight,
  },
  dayText: {
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    minHeight: 24,

    fontSize: theme.comp.dayView.dayButtonTypographyFontSize,
    fontFamily: theme.comp.dayView.dayButtonTypographyFontFamily,
    fontWeight: theme.comp.dayView.dayButtonTypographyFontWeight,
    lineHeight: theme.comp.dayView.dayButtonTypographyLineHeight,
    letterSpacing: theme.comp.dayView.dayButtonTypographyLetterSpacing,
  },

  dayButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    boxSizing: 'border-box',
    minWidth: 40,
    width: 40,
    height: 40,
    lineHeight: '24px',
    borderTopLeftRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
      theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
      theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
      theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
      theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
    color: theme.comp.dayView.dayButtonColorText,
    cursor: 'pointer',
    position: 'relative',

    '&:focus-visible': {
      zIndex: 1,
      boxShadow: `0 0 0 2px ${theme.comp.dayView.dayButtonColorShadowFocus}`,
    },

    '&:hover': {
      backgroundColor: theme.comp.dayView.dayButtonColorBackgroundHover,
    },

    '&:active': {
      backgroundColor: theme.comp.dayView.dayButtonColorBackgroundActive,
    },

    '&[aria-disabled="true"]': {
      color: theme.comp.dayView.dayButtonColorTextDisabled,
      pointerEvents: 'none',
    },

    '&$selected': {
      color: theme.comp.dayView.dayButtonColorTextSelected,
      backgroundColor: theme.comp.dayView.dayButtonColorBackgroundSelected,
      borderWidth: 0,
      borderTopLeftRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
      borderTopRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,

      '&$selected-start': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },

      '&$selected-end': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },

      '&:hover': {
        backgroundColor:
          theme.comp.dayView.dayButtonColorBackgroundSelectedHover,
      },

      '&:active': {
        backgroundColor:
          theme.comp.dayView.dayButtonColorBackgroundSelectedActive,
      },

      '&[aria-disabled="true"]': {
        color: theme.comp.dayView.dayButtonColorTextSelectedDisabled,
        backgroundColor:
          theme.comp.dayView.dayButtonColorBackgroundSelectedDisabled,
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
          borderColor: theme.comp.dayView.dayButtonColorBorderFocus,
        },
      },
    },

    '&$todayButton': {
      color:
        theme.comp.rangeDayView.dayButtonColorTextToday ||
        theme.comp.dayView.dayButtonColorTextToday,
      '& > span': {
        width: 'auto',
        boxShadow: `0 3px 0 -1px ${
          theme.comp.rangeDayView.dayButtonColorTextToday ||
          theme.comp.dayView.dayButtonColorTextToday
        }`,
      },

      '&[aria-disabled="true"]': {
        color:
          theme.comp.rangeDayView.dayButtonColorTextTodayDisabled ||
          theme.comp.dayView.dayButtonColorTextTodayDisabled,
        '& > span': {
          boxShadow: `0 3px 0 -1px
            ${
              theme.comp.rangeDayView.dayButtonColorTextTodayDisabled ||
              theme.comp.dayView.dayButtonColorTextTodayDisabled
            }
          `,
        },
      },

      '&$selected': {
        color:
          theme.comp.rangeDayView.dayButtonColorTextTodaySelected ||
          theme.comp.dayView.dayButtonColorTextTodaySelected,
        '& > span': {
          boxShadow: `0 3px 0 -1px  ${
            theme.comp.rangeDayView.dayButtonColorTextTodaySelected ||
            theme.comp.dayView.dayButtonColorTextTodaySelected
          }`,
        },
      },
    },

    '&$notInMonth:not([aria-disabled="true"])': {
      color:
        theme.comp.rangeDayView.dayButtonColorTextNotInMonth ||
        theme.comp.dayView.dayButtonColorTextNotInMonth,
    },

    '&$inRange': {
      backgroundColor:
        theme.comp.rangeDayView.dayButtonColorBackgroundWithinRange ||
        theme.comp.dayView.dayButtonColorBackgroundWithinRange,
    },

    '&$hovered': {
      borderRadius: 0,
      borderTop: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.dayView.dayButtonColorBorderHover
      }`,
      borderBottom: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.dayView.dayButtonColorBorderHover
      }`,

      '&$startOfMonth': {
        borderLeft: `1px dashed ${
          theme.comp.rangeDayView.dayButtonColorBorderHover ||
          theme.comp.dayView.dayButtonColorBorderHover
        }`,
      },

      '&$startOfWeek': {
        borderLeft: `1px dashed ${
          theme.comp.rangeDayView.dayButtonColorBorderHover ||
          theme.comp.dayView.dayButtonColorBorderHover
        }`,
      },

      '&$endOfMonth': {
        borderRight: `1px dashed ${
          theme.comp.rangeDayView.dayButtonColorBorderHover ||
          theme.comp.dayView.dayButtonColorBorderHover
        }`,
      },

      '&$endOfWeek': {
        borderRight: `1px dashed ${
          theme.comp.rangeDayView.dayButtonColorBorderHover ||
          theme.comp.dayView.dayButtonColorBorderHover
        }`,
      },

      '&$inRange': {
        border: 0,
        backgroundColor:
          theme.comp.rangeDayView.dayButtonColorBackgroundWithinRangeHover ||
          theme.comp.dayView.dayButtonColorBackgroundWithinRangeHover,

        '&:hover': {
          backgroundColor:
            theme.comp.rangeDayView.dayButtonColorBackgroundWithinRangeHover ||
            theme.comp.dayView.dayButtonColorBackgroundWithinRangeHover,
        },
      },
    },

    '&$hovered-start': {
      borderLeft: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.dayView.dayButtonColorBorderHover
      }`,

      '&:not($inRange)': {
        borderTopLeftRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
          theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
        borderBottomLeftRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
          theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
      },
    },

    '&$hovered-end': {
      borderRight: `1px dashed ${
        theme.comp.rangeDayView.dayButtonColorBorderHover ||
        theme.comp.dayView.dayButtonColorBorderHover
      }`,

      '&:not($inRange)': {
        borderTopRightRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
          theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
        borderBottomRightRadius:
          theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
          theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
      },
    },

    '&$startOfMonth': {
      borderTopLeftRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
        theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
      borderBottomLeftRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
    },

    '&$endOfMonth': {
      borderTopRightRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
        theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
      borderBottomRightRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
    },

    '&$startOfWeek': {
      borderTopLeftRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopLeft ||
        theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
      borderBottomLeftRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomLeft ||
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
    },

    '&$endOfWeek': {
      borderTopRightRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusTopRight ||
        theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
      borderBottomRightRadius:
        theme.comp.rangeDayView.dayButtonShapeBorderRadiusBottomRight ||
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
    },
  },

  todayButton: {},

  selected: {},

  notInMonth: {},

  inRange: {
    borderRadius: 0,
  },

  hovered: {},

  'selected-start': {},

  'selected-end': {},

  'hovered-start': {},

  'hovered-end': {},

  startOfMonth: {},

  endOfMonth: {},

  startOfWeek: {},

  endOfWeek: {},
}))

export interface Props<TDate = unknown>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS классы для стилизации
   */
  classes?: Classes
  /**
   * Текущая дата просмотра календаря
   */
  currentViewDate: TDate
  /**
   * Обработчик нажатия кнопки даты
   */
  onClickDate: (date: TDate) => void
  /**
   * Функция проверки отключена ли дата
   */
  isDateDisabled: (date: TDate) => boolean
  /**
   * Функция проверки выбрана ли дата
   */
  isDateSelected: (date: TDate) => CheckDateStateResult
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

interface CalendarViewProps extends FunctionComponentCommonFields<Props> {
  <TDate = unknown>(
    props: Props<TDate>,
    context?: unknown
  ): React.ReactElement | null
}

export const CalendarView: CalendarViewProps = <TDate extends unknown>(
  props: Props<TDate>
) => {
  const {
    classes,
    currentViewDate,
    onClickDate,
    isDateDisabled,
    isDateSelected,
    isInRange,
    isInHoverRange,
    setHoverDate,
    ...rest
  } = props

  const classesList = useStyles()
  const classesMap = useClassList(classesList, classes)
  const buttonClasses = useButtonReset()

  const adapter = useDateLibAdapter<TDate>()

  const nowDate = useNowDate<TDate>()

  const weekDays = React.useMemo<React.ReactNode>(() => {
    const weekDaysArray = adapter.getWeekdaysStartOfMon()

    return (
      <div className={classesMap.row}>
        {weekDaysArray.map((weekDay, index) => (
          <div key={`day=${index}`} className={classesMap.weekDay}>
            {weekDay}
          </div>
        ))}
      </div>
    )
  }, [adapter, classesMap.row, classesMap.weekDay])

  const renderDays = () => {
    const isCurrentMonth = adapter.isSameMonth(nowDate, currentViewDate)
    let isTodayFound = false
    let isSelectedFound = false
    let isInRangeFound = false
    let isInHoverRangeFound = false

    const startOfMonth = adapter.startOfMonth(currentViewDate)
    const endOfMonth = adapter.endOfMonth(currentViewDate)

    const daysArray = adapter.getWeekArray(currentViewDate)

    const getOneWeekDays = (date: TDate): TDate[] => {
      const startDate = adapter.startOfWeek(date)
      const weekDays = [startDate]
      for (let i = 1; i < 7; i++) {
        weekDays.push(adapter.addDays(startDate, i))
      }

      return weekDays
    }

    if (daysArray.length === 4) {
      const weekBefore = getOneWeekDays(adapter.addDays(daysArray[0][0], -1))
      const weekAfter = getOneWeekDays(adapter.addDays(daysArray[3][6], 1))
      daysArray.unshift(weekBefore)
      daysArray.push(weekAfter)
    }
    if (daysArray.length === 5) {
      if (adapter.isSameDay(daysArray[0][0], startOfMonth)) {
        const weekBefore = getOneWeekDays(adapter.addDays(daysArray[0][0], -1))
        daysArray.unshift(weekBefore)
      } else {
        const weekAfter = getOneWeekDays(adapter.addDays(daysArray[4][6], 1))
        daysArray.push(weekAfter)
      }
    }

    return daysArray.map((weekArray, index) => {
      return (
        <div key={`week-${index}`} className={classesList.row}>
          {weekArray.map((day, dayIndex) => {
            let isInCurrentMonth = true
            let isStartOfMonth = false
            let isEndOfMonth = false

            if (index === 0 || index === 1) {
              isStartOfMonth = adapter.isSameDay(day, startOfMonth)
              isInCurrentMonth =
                isStartOfMonth || adapter.isAfterDay(day, startOfMonth)
            }

            if (
              index === daysArray.length - 2 ||
              index === daysArray.length - 1
            ) {
              isEndOfMonth = adapter.isSameDay(day, endOfMonth)
              isInCurrentMonth =
                isEndOfMonth || adapter.isBeforeDay(day, endOfMonth)
            }

            let isToday = false
            if (isCurrentMonth && !isTodayFound) {
              if (adapter.isSameDay(nowDate, day)) {
                isToday = true
                isTodayFound = true
              }
            }

            let isSelected = false
            let selectedPosition: CheckDateStateResult['position']
            if (isInCurrentMonth && !isSelectedFound) {
              const selectedResult = isDateSelected(day)
              isSelected = selectedResult.value
              isSelectedFound = !!selectedResult.preventNextCheck
              selectedPosition = selectedResult.position
            }

            let inRange = false
            if (
              isInCurrentMonth &&
              !isSelected &&
              !isInRangeFound &&
              isInRange
            ) {
              const inRangeResult = isInRange(day)
              inRange = inRangeResult.value
              isInRangeFound = !!inRangeResult.preventNextCheck
            }

            let inHoverRange = false
            let hoveredPosition: CheckDateStateResult['position']
            if (
              isInCurrentMonth &&
              !isSelected &&
              !isInHoverRangeFound &&
              isInHoverRange
            ) {
              const inHoverRangeResult = isInHoverRange(day)
              inHoverRange = inHoverRangeResult.value
              isInHoverRangeFound = !!inHoverRangeResult.preventNextCheck
              hoveredPosition = inHoverRangeResult.position
            }

            return (
              <button
                key={`day-${index}-${dayIndex}`}
                className={clsx(
                  buttonClasses.resetButton,
                  classesMap.dayButton,
                  {
                    [classesMap.todayButton]: isToday,
                    [classesMap.selected]: isSelected,
                    [classesMap[
                      `selected-${
                        selectedPosition as string
                      }` as keyof typeof classesList
                    ]]: selectedPosition,
                    [classesMap.notInMonth]: !isInCurrentMonth,
                    [classesMap.startOfMonth]: isStartOfMonth,
                    [classesMap.endOfMonth]: isEndOfMonth,
                    [classesMap.startOfWeek]: dayIndex === 0,
                    [classesMap.endOfWeek]: dayIndex === 6,
                    [classesMap.inRange]: inRange,
                    [classesMap.hovered]: inHoverRange,
                    [classesMap[
                      `hovered-${
                        hoveredPosition as string
                      }` as keyof typeof classesList
                    ]]: hoveredPosition,
                  }
                )}
                //aria-disabled вместо disabled, чтобы работала навигация с клавиатуры
                aria-disabled={isDateDisabled(day)}
                type="button"
                onClick={() => onClickDate(day)}
                onMouseEnter={
                  setHoverDate ? () => setHoverDate(day) : undefined
                }
                onMouseLeave={
                  setHoverDate ? () => setHoverDate(null) : undefined
                }
                onFocus={setHoverDate ? () => setHoverDate(day) : undefined}
                onBlur={setHoverDate ? () => setHoverDate(null) : undefined}
              >
                <span className={classesMap.dayText}>
                  {adapter.format(day, 'dayOfMonth')}
                </span>
              </button>
            )
          })}
        </div>
      )
    })
  }

  return (
    <div {...rest}>
      {weekDays}

      {renderDays()}
    </div>
  )
}

CalendarView.displayName = 'CalendarView'
