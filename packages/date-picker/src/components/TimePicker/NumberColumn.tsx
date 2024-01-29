import { clsx } from '@v-uik/theme'
import React from 'react'
import { BaseTimePickerViewType } from '../../interfaces/time'
import { Option, OptionClasses } from './Option'
import { focusNextColumn, timeToString } from '../../utils/time'
import { useAnimationScroll } from './useAnimationScroll'
import { OFFSET } from './config'

export type Classes = OptionClasses

interface Props {
  classes?: Classes
  /**
   * Класс колонки
   */
  className?: string
  /**
   * Тип отображения колонки
   */
  view: BaseTimePickerViewType
  /**
   * Значения колонки
   */
  values: number[]
  /**
   * Текущее значени, исходя из типа колонки
   */
  currentValue?: number
  /**
   * Обработчик проверки задизейбленного значения
   */
  shouldDisableValue: (
    view: BaseTimePickerViewType,
    count: number
  ) => boolean | undefined
  /**
   * Обработчик изменения значения
   */
  onChange: (view: BaseTimePickerViewType, count: number) => void
  onClickLastColumn?: () => void
}

export const NumberColumn = ({
  className,
  view,
  values,
  onChange,
  currentValue,
  shouldDisableValue,
  onClickLastColumn,
  classes,
}: Props): JSX.Element => {
  const onClick = React.useCallback(
    (count: number) => onChange(view, count),
    [view, onChange]
  )

  const currentTimeToString = timeToString(view)
  const isSelected = (count: number) => currentValue === count
  const isDisabled = (count: number) => shouldDisableValue(view, count)

  const { containerRef, isClickedRef, handleScroll, bottomOffset } =
    useAnimationScroll<number>({
      currentTimeToString,
      currentValue,
      onClickLastColumn,
    })

  const handleOnClick = React.useCallback(
    (val: number, event: React.MouseEvent<HTMLButtonElement>) => {
      const container = containerRef.current
      if (!container) {
        return
      }

      const optionElement = event.currentTarget
      onClick(val)
      focusNextColumn('increase')
      if (
        onClickLastColumn &&
        optionElement.offsetTop - container?.scrollTop <= OFFSET
      ) {
        onClickLastColumn()

        return
      }

      isClickedRef.current = true
    },
    [onClick, onClickLastColumn]
  )

  return (
    <div
      ref={containerRef}
      className={clsx(className)}
      role="listbox"
      onScroll={handleScroll}
    >
      {values.map((x) => (
        <Option
          key={x}
          tabIndex={isSelected(x) ? 0 : -1}
          label={x}
          classes={classes}
          isSelected={isSelected(x)}
          isDisabled={isDisabled(x)}
          formatLabel={currentTimeToString}
          onClick={handleOnClick}
        />
      ))}
      <div style={{ paddingBottom: bottomOffset }} />
    </div>
  )
}
