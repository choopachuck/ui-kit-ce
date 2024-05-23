'use client'

import * as React from 'react'
import { createUseStyles, clsx, useTheme } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { CircularClasses, ProgressSize, ProgressSizeProps } from './interfaces'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const SIZES: { [key in ProgressSizeProps]: number } = {
  xlg: 56,
  lg: 32,
  md: 24,
  sm: 16,
}

const STROKE_WIDTH = 5

const getDynamicStyles = ({
  size,
  color,
}: {
  size: number
  color: React.CSSProperties['color']
}) => ({
  root: {
    width: size,
    height: size,
  },
  path: {
    stroke: color,
  },
})

// Функция IIFE потому что передача пропсов работает некорректно при анимации
// https://github.com/cssinjs/jss/issues/1216
const useStyles = (keyframesProps: CircleStyleProps) =>
  createUseStyles((theme) => {
    return {
      root: {},

      indeterminate: {
        '& $circular': {
          animation: '$rotate 2.3s linear infinite',
        },

        '& $path': {
          strokeDashoffset: 0,
          strokeDasharray: [1, 200],
          animation: '$dash 2.3s ease-in-out infinite',
          strokeLinecap: 'butt',
        },
      },

      determinate: {
        '& $path': {
          transition: 'stroke-dashoffset 600ms ease-in-out',
        },
      },

      circular: {
        position: 'relative',
      },

      track: {
        stroke: theme.comp.circularProgress.trackColorBackground,
      },

      path: {
        transform: 'rotate(-90deg)',
        transformOrigin: 'center',
      },

      percentage: {
        color: theme.comp.circularProgress.colorText,
        fontFamily: theme.comp.circularProgress.typographyFontFamily,
        fontSize: theme.comp.circularProgress.typographyFontSize,
        lineHeight: theme.comp.circularProgress.typographyLineHeight,
        letterSpacing: theme.comp.circularProgress.typographyLetterSpacing,
        fontWeight: theme.comp.circularProgress.typographyFontWeight,
      },

      '@keyframes rotate': {
        '100%': {
          transform: 'rotate(360deg)',
        },
      },

      '@keyframes dash': {
        '0%': {
          strokeDasharray: [1, 200],
          strokeDashoffset: 0,
        },
        '50%': {
          strokeDasharray: [89, 200],
          strokeDashoffset: -35,
        },
        '100%': {
          strokeDasharray: [89, 200],
          strokeDashoffset: `-${keyframesProps.animationRadius}`,
        },
      },
    }
  })

interface CircleStyleProps {
  animationRadius: string
}

export interface CircularProgressProps
  extends Omit<ComponentPropsWithRefFix<'div'>, 'size'> {
  classes?: Partial<CircularClasses>
  /**
   * Значение прогресса
   */
  value?: number
  /**
   * Максимальное значение (100%)
   */
  max?: number
  /**
   * Размер прогресс бара
   */
  size?: ProgressSizeProps
  /**
   * Настройка размеров прогресс бара
   */
  sizesConfig?: Record<ProgressSizeProps, number>
  /**
   * Скрыть задний фон прогресс бара
   */
  hideTrack?: boolean
  /**
   * Толщина линии
   */
  thickness?: number
  /**
   * Отображение прогресса загрузки внутри круга
   */
  percentageInsideCircle?: React.ReactNode
  /**
   * Цвет окружности
   */
  color?: React.CSSProperties['color']
}

export const CircularProgress = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      value,
      max = 100,
      size = ProgressSize.lg,
      sizesConfig = SIZES,
      hideTrack = false,
      thickness = STROKE_WIDTH,
      percentageInsideCircle,
      color,
      ...rest
    }: CircularProgressProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    // рассчитываем радиус
    const radius = sizesConfig[size] / 2 - thickness / 2

    // цифра 6.2 дает нужный эффект при расчете strokeDashoffset
    const animationRadius = (radius * 6.2).toFixed()

    // проверка на неопределенность
    const indeterminate = value === null || value === undefined

    // длина окружности
    const circumference = 2 * Math.PI * radius

    const strokeDasharray = !indeterminate
      ? circumference.toFixed(3)
      : undefined

    const strokeDashoffset = !indeterminate
      ? ((max - (value as number)) / max) * circumference
      : undefined

    const theme = useTheme()

    const pathColor = color ?? theme.comp.circularProgress.pathColorBackground

    const dynamicStyles = getDynamicStyles({
      size: sizesConfig[size],
      color: pathColor,
    })
    const classList = useStyles({ animationRadius })()

    const classesMap = useClassList(classList, classes)

    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.indeterminate]: indeterminate,
      [classesMap.determinate]: !indeterminate,
    })

    return (
      <div
        {...rest}
        ref={ref}
        style={{ ...dynamicStyles.root, ...(rest?.style ?? {}) }}
        aria-valuenow={!indeterminate ? value : undefined}
        aria-valuemin={!indeterminate ? 1 : undefined}
        aria-valuemax={!indeterminate ? max : undefined}
        role="progressbar"
        className={className}
      >
        <svg className={classesMap.circular} style={dynamicStyles.root}>
          {!hideTrack ? (
            <circle
              role="img"
              aria-label="track"
              className={classesMap.track}
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              strokeWidth={thickness}
              strokeMiterlimit={10}
            />
          ) : null}
          <circle
            role="img"
            aria-label="bar"
            style={dynamicStyles.path}
            className={classesMap.path}
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeWidth={thickness}
            strokeMiterlimit={10}
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={strokeDasharray}
          />
          {percentageInsideCircle && (
            <text
              className={classesMap.percentage}
              textAnchor="middle"
              alignmentBaseline="central"
              x="50%"
              y="50%"
            >
              {percentageInsideCircle}
            </text>
          )}
        </svg>
      </div>
    )
  }
)
