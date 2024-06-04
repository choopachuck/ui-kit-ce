'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Button, ButtonKinds, ButtonColor, ButtonProps } from '@v-uik/button'
import { ChevronLeftIcon } from './ChevronLeftIcon'
import { ChevronRightIcon } from './ChevronRightIcon'
import type { ComponentPropsWithRefFix } from '@v-uik/common'
import { PanelHeaderClasses } from '../../interfaces/classes'
import { useClassList } from '@v-uik/hooks'

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  chevron: {
    minWidth: 0,
    padding: 8,
    borderTopLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomRight,
  },
  month: {
    flex: 1,
    textTransform: 'capitalize',
    borderTopLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomRight,

    '&$selected': {
      color: theme.comp.calendarPicker.monthButtonColorTextSelected,
      backgroundColor:
        theme.comp.calendarPicker.monthButtonColorBackgroundSelected,
    },
  },
  year: {
    padding: [8, 20],
    borderTopLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomRight,

    '&$selected': {
      color: theme.comp.calendarPicker.yearButtonColorTextSelected,
      backgroundColor:
        theme.comp.calendarPicker.yearButtonColorBackgroundSelected,
    },
  },
  selected: {},
}))

export interface Props extends Omit<ComponentPropsWithRefFix<'div'>, 'ref'> {
  /**
   * Показывать ли месяц и стрелки переключения
   */
  showMonth?: boolean
  /**
   * Текст кнопки выбора месяца
   */
  monthText?: string
  /**
   * Кнопка месяца выделена
   */
  monthSelected?: boolean
  /**
   * Обработчик нажатия кнопки месяца
   */
  onClickMonth?: ButtonProps['onClick']
  /**
   * Обработчик нажатия стрелок
   */
  onClickChevron?: (event: React.MouseEvent, value: number) => void
  /**
   * Показывать ли год
   */
  showYear?: boolean
  /**
   * Текст кнопки выбора года
   */
  yearText?: string | number
  /**
   * Кнопка года выделена
   */
  yearSelected?: boolean
  /**
   * Обработчик нажатия кнопки года
   */
  onClickYear?: ButtonProps['onClick']
  /**
   * CSS классы для стилизации
   */
  classes?: PanelHeaderClasses
}

export const PanelHeader = React.forwardRef(
  ({ showYear = true, ...props }: Props, ref: React.Ref<HTMLDivElement>) => {
    const {
      className: classNameProp,
      showMonth,
      monthText,
      monthSelected,
      onClickMonth,
      onClickChevron,
      yearText,
      yearSelected,
      onClickYear,
      classes,
      ...rest
    } = props

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root)

    const handleLeftClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClickChevron?.(event, -1)
    }

    const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClickChevron?.(event, 1)
    }

    if (!showMonth && !showYear) {
      return null
    }

    return (
      <div {...rest} ref={ref} className={className}>
        {showMonth && (
          <>
            <Button
              kind={ButtonKinds.ghost}
              color={ButtonColor.secondary}
              className={classesMap.chevron}
              onClick={handleLeftClick}
            >
              <ChevronLeftIcon />
            </Button>

            <Button
              kind={ButtonKinds.ghost}
              color={ButtonColor.secondary}
              className={clsx(classesMap.month, {
                [classesMap.selected]: monthSelected,
              })}
              onClick={onClickMonth}
            >
              {monthText}
            </Button>

            <Button
              kind={ButtonKinds.ghost}
              color={ButtonColor.secondary}
              className={classesMap.chevron}
              onClick={handleRightClick}
            >
              <ChevronRightIcon />
            </Button>
          </>
        )}

        {showYear && (
          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            className={clsx(classesMap.year, {
              [classesMap.selected]: yearSelected,
            })}
            onClick={onClickYear}
          >
            {yearText}
          </Button>
        )}
      </div>
    )
  }
)

PanelHeader.displayName = 'PanelHeader'
