'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import {
  includesKeyboardKey,
  isEqualKeyboardKeys,
  percentToValue,
  roundBy,
  valueToPercent,
} from '@v-uik/utils'
import { useClassList, useThrottle } from '@v-uik/hooks'
import { SliderMarker, Tick, TickLabel } from './components'
import { TickItem, Classes } from './interfaces'
import { Tooltip, TooltipProps } from '@v-uik/tooltip'

const DECREASE_ARROW_KEYS = ['ArrowDown', 'ArrowLeft']
const INCREASE_ARROW_KEYS = ['ArrowUp', 'ArrowRight']

interface SliderStylesProps {
  /**
   * Цвет текущей активной границы
   */
  color?: string
  /**
   * Инверсивное направление движения слайдера
   */
  inverted?: boolean
}

export interface SliderProps
  extends SliderStylesProps,
    Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Текущее значение слайдера
   */
  value?: number
  /**
   * Отрисовка тиков может быть как силами компонента,
   * так и с использованием пользовательских данных.
   * Если в качестве значение передано булево значение -
   * Тики будут отрисованы на каждый шаг.
   * Если будут переданы пользовательские тики - соответственно
   * они же и будут отрисованы.
   */
  ticks?: boolean | TickItem[]
  /**
   * Минимальное значение границы слайдера
   */
  min?: number
  /**
   * Максимальное значение границы слайдера
   */
  max?: number
  /**
   * Шаг значений слайдера
   */
  step?: number
  /**
   * Заблокировать слайдер
   */
  disabled?: boolean
  /**
   * Событие изменения значения
   */
  onChange?(value: number): void
  /**
   * Свойства элемента marker
   */
  markerProps?: React.InputHTMLAttributes<HTMLDivElement>
}

interface ExtendedSliderStylesProps extends SliderStylesProps {
  percentage: number
  isActive: boolean
}

const getDynamicStyles = (props: ExtendedSliderStylesProps) => {
  const start = props.inverted ? props.percentage : 0
  const end = props.inverted ? 100 : props.percentage

  return {
    range: {
      width: `${end - start}%`,
      left: `${start}%`,
      backgroundColor: props.isActive && props.color ? props.color : undefined,
    },
    marker: {
      left: `${props.percentage}%`,
    },
  }
}
const useStyles = createUseStyles((theme) => ({
  slider: {
    display: 'inline-flex',
    flexFlow: 'column nowrap',
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    minWidth: 200,
    borderTopLeftRadius: theme.comp.slider.trackShapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.slider.trackShapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.slider.trackShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.slider.trackShapeBorderRadiusBottomRight,
    padding: [11, 0],
  },

  active: {
    '& $range': {
      backgroundColor: theme.comp.slider.rangeColorBackgroundActive,
    },
  },

  disabled: {
    pointerEvents: 'none',

    '& $range': {
      backgroundColor: theme.comp.slider.rangeColorBackgroundDisabled,
    },

    '& $track': {
      backgroundColor: theme.comp.slider.trackColorBackgroundDisabled,
    },
  },

  range: {
    position: 'absolute',
    height: 2,
    background: theme.comp.slider.rangeColorBackground,
    borderTopLeftRadius: theme.comp.slider.trackShapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.slider.trackShapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.slider.trackShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.slider.trackShapeBorderRadiusBottomRight,
  },

  track: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.comp.slider.trackColorBackground,
    height: 2,
    cursor: 'pointer',
    borderTopLeftRadius: theme.comp.slider.trackShapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.slider.trackShapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.slider.trackShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.slider.trackShapeBorderRadiusBottomRight,
  },
  tooltip: {
    backgroundColor:
      theme.comp.slider.tooltipColorBackground ||
      theme.comp.tooltip.colorBackground,
    color: theme.comp.slider.tooltipColorText || theme.comp.tooltip.colorText,
    borderColor:
      theme.comp.slider.tooltipColorBorder || theme.comp.tooltip.colorBorder,
  },

  marker: {
    cursor: 'pointer',
    position: 'absolute',
    boxSizing: 'border-box',
    bottom: '50%',
    transform: 'translate(-50%, 50%)',
  },
}))

// https://www.w3.org/TR/wai-aria-practices/examples/slider/slider-1.html
export const Slider = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      min = 0,
      max = 100,
      step = 0.01,
      value = 0,
      color,
      ticks,
      disabled,
      inverted,
      onChange,
      onMouseDown,
      markerProps,
      ...rest
    }: SliderProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const trackRef = React.useRef<HTMLDivElement>(null)
    const markerRef = React.useRef<HTMLDivElement>(null)

    const [isActive, setIsActive] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const [isDragging, setIsDragging] = React.useState(false)

    /** Текущее значение слайдера в процентах */
    const percentage = valueToPercent(value, { min, max })

    const dynamicStyles = getDynamicStyles({
      inverted,
      color,
      percentage,
      isActive,
    })
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classesMap.slider, classNameProp, {
      [classesMap.active]: isActive || isFocused,
      [classesMap.disabled]: disabled,
    })

    /**
     * Пропсы для тултипа
     */
    const tooltipProps: Omit<TooltipProps, 'children'> = {
      single: true,
      dropdownProps: {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
        open: isActive || isFocused,
        content: <span>{value}</span>,
      },
      classes: { tooltip: clsx(classesMap.thumb, classesMap.tooltip) },
    }
    /* ------------------------------------------------------------*/
    /* ----------------Вычисление нового значения------------------*/
    /* ------------------------------------------------------------*/
    const getNewValue = (pageX: number) => {
      if (trackRef.current) {
        // TODO: Когда поддержка IE перестанет быть актуальной
        // Добавить Observer за элементом track, чтобы брать его размеры
        // только в том случае, если размер или позиция изменились.
        const trackRect = trackRef.current.getBoundingClientRect()
        const trackWidth = trackRect.width
        const trackOffsetLeft = trackRect.x

        let percent = ((pageX - trackOffsetLeft) * 100) / trackWidth
        percent = Math.max(percent, 0)
        percent = Math.min(percent, 100)

        return roundBy(percentToValue(percent, { min, max }), step)
      }

      return value
    }

    /* ------------------------------------------------------------*/
    /* --------------------Отрисовка лейблов-----------------------*/
    /* ------------------------------------------------------------*/
    const labels = React.useMemo(() => {
      if (Array.isArray(ticks)) {
        return ticks.map((tick) => {
          const value = valueToPercent(tick.value, { min, max })

          return (
            <TickLabel
              key={value}
              value={value}
              className={classesMap?.tickLabel}
            >
              {tick.label}
            </TickLabel>
          )
        })
      }
    }, [ticks, min, max, classesMap?.tickLabel])

    /* ------------------------------------------------------------*/
    /* ---------------------Отрисовка тиков------------------------*/
    /* ------------------------------------------------------------*/
    const ticksToRender = React.useMemo((): React.ReactElement[] | null => {
      // Отрисовка тиков на каждый шаг
      if (typeof ticks === 'boolean' && ticks) {
        const percentOfStep = (step * 100) / (max - min)
        const countOfMarks = (max - min) / step
        const ticks: React.ReactElement[] = []

        for (let value: number, comp, i = 1; i < countOfMarks; i++) {
          value = i * percentOfStep
          comp = <Tick key={value} value={value} className={classesMap?.tick} />

          ticks.push(comp)
        }

        return ticks
      }

      // Отрисовка пользовательских тиков
      if (Array.isArray(ticks)) {
        return ticks.map((tick) => {
          const value = valueToPercent(tick.value, { min, max })

          return <Tick key={value} value={value} className={classesMap?.tick} />
        })
      }

      return null
    }, [ticks, min, max, step, classesMap?.tick])

    /* ------------------------------------------------------------*/
    /* ------------------Управление с клавиатуры-------------------*/
    /* ------------------------------------------------------------*/
    const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (includesKeyboardKey(DECREASE_ARROW_KEYS, e.key)) {
        e.preventDefault()
        const rounded = roundBy(value - step, step)
        const newValue = Math.max(min, rounded)

        if (value !== newValue) {
          onChange?.(newValue)
        }
      }

      if (includesKeyboardKey(INCREASE_ARROW_KEYS, e.key)) {
        e.preventDefault()
        const rounded = roundBy(value + step, step)
        const newValue = Math.min(max, rounded)

        if (value !== newValue) {
          onChange?.(newValue)
        }
      }

      if (isEqualKeyboardKeys('Home', e.key)) {
        e.preventDefault()

        if (value !== min) {
          onChange?.(min)
        }
      }

      if (isEqualKeyboardKeys('End', e.key)) {
        e.preventDefault()

        if (value !== max) {
          onChange?.(max)
        }
      }
    }

    /* ------------------------------------------------------------*/
    /* ----------------------Обработка DnD-------------------------*/
    /* ------------------------------------------------------------*/
    const handleMouseUp = () => {
      setIsDragging(false)
      setIsActive(false)
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseDown?.(e)
      onChange?.(getNewValue(e.pageX))
      e.preventDefault()

      setIsDragging(true)
      setIsActive(true)

      if (markerRef.current) {
        markerRef.current.focus()
      }
    }

    const handleMove = useThrottle((e: MouseEvent) => {
      onChange?.(getNewValue(e.pageX))
    }, 30)

    React.useEffect(() => {
      if (isDragging) {
        document.documentElement.style.cursor = 'pointer'
        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', handleMouseUp)
      }

      return () => {
        document.documentElement.style.cursor = ''
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }, [isDragging]) // eslint-disable-line react-hooks/exhaustive-deps

    /* ------------------------------------------------------------*/
    /* ------------------Обработка фокуса и блюра------------------*/
    /* ------------------------------------------------------------*/
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => {
      setIsActive(false)
      setIsFocused(false)

      if (markerRef.current) {
        markerRef.current.blur()
      }
    }

    return (
      <div
        {...rest}
        ref={ref}
        className={className}
        onMouseDown={handleMouseDown}
      >
        <input type="hidden" value={value} />
        {labels}
        <div ref={trackRef} className={clsx(classesMap.rail, classesMap.track)}>
          <div className={classesMap.range} style={dynamicStyles.range} />
          {ticksToRender}
          <div className={classesMap.marker} style={dynamicStyles.marker}>
            <Tooltip {...tooltipProps}>
              <SliderMarker
                {...markerProps}
                ref={markerRef}
                isActive={isActive}
                isFocused={isFocused}
                disabled={disabled}
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                onKeyDown={handleKeydown}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
)
