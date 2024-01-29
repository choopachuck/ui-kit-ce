import React from 'react'
import { useDateLibAdapter } from '../../hooks/useDateLibAdapter'
import { DayPart } from '../../interfaces/time'
import { Option } from './Option'
import { useAnimationScroll } from './useAnimationScroll'
import { OFFSET } from './config'

interface Props {
  /**
   * Класс колонки
   */
  className?: string
  /**
   * Текущее значени, исходя из типа колонки
   */
  currentDayPart?: DayPart
  /**
   * Обработчик изменения значения
   */
  onChange: (dayPart: DayPart) => void
  /**
   * Обработчик проверки задизейбленного значения
   */
  shouldDisableDayPart: (dayPart: DayPart) => boolean | undefined
  onClickLastColumn?: () => void
}

const values: DayPart[] = ['am', 'pm']

export const DayPartsColumn = <TDate extends unknown>({
  className,
  currentDayPart,
  onChange,
  shouldDisableDayPart,
  onClickLastColumn,
}: Props): JSX.Element => {
  const adapter = useDateLibAdapter<TDate>()

  const isSelected = (dayPart: DayPart) => currentDayPart === dayPart

  const isDisabled = (dayPart: DayPart) => shouldDisableDayPart(dayPart)

  const { isClickedRef, containerRef, handleScroll, bottomOffset } =
    useAnimationScroll<DayPart>({
      currentValue: currentDayPart,
      onClickLastColumn: onClickLastColumn,
      currentTimeToString: adapter.getDayPeriodByLocale,
    })

  const onClick = React.useCallback(
    (dayPart: DayPart, event: React.MouseEvent<HTMLButtonElement>) => {
      const container = containerRef.current
      if (!container) {
        return
      }

      const optionElement = event.currentTarget
      onChange(dayPart)

      if (
        onClickLastColumn &&
        optionElement.offsetTop - container?.scrollTop <= OFFSET
      ) {
        onClickLastColumn()

        return
      }

      isClickedRef.current = true
    },
    [onClickLastColumn, onChange]
  )

  return (
    <div
      ref={containerRef}
      className={className}
      role="listbox"
      onScroll={handleScroll}
    >
      {values.map((x) => (
        <Option
          key={x}
          tabIndex={isSelected(x) ? 0 : -1}
          label={x}
          isSelected={isSelected(x)}
          isDisabled={isDisabled(x)}
          formatLabel={adapter.getDayPeriodByLocale}
          onClick={onClick}
        />
      ))}
      <div style={{ paddingBottom: bottomOffset }} tabIndex={-1} />
    </div>
  )
}
