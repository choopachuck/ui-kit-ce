'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { ProgressSize, ProgressSizeProps, LinearClasses } from './interfaces'

// allowed dynamic classes usage
const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 0,
    border: 0,
    margin: 0,
  },

  sm: {
    '& $track': {
      height: 2,
    },
  },

  md: {
    '& $track': {
      height: 4,
    },
  },

  lg: {
    '& $track': {
      height: 8,
    },
  },

  track: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: 8,
    overflow: 'hidden',
    backgroundColor: theme.comp.linearProgress.trackColorBackground,
    borderTopLeftRadius:
      theme.comp.linearProgress.trackShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.linearProgress.trackShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.linearProgress.trackShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.linearProgress.trackShapeBorderRadiusBottomRight,
  },

  withoutTrack: {
    backgroundColor: 'inherit',
  },

  indeterminate: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      animationDuration: '2.3s',
      animationIterationCount: 'infinite',
      animationName: '$progress-bar-indeterminate',
      animationTimingFunction: 'linear',
      backgroundImage: (props: LinearStylesProps) =>
        `linear-gradient(90deg, ${
          props?.color ?? theme.comp.linearProgress.pathColorBackground
        } 12.5%, transparent 12.5%)`,
      backgroundPositionX: '0%',
      backgroundSize: '200% 100%',
    },
  },

  path: {
    display: 'flex',
    width: '100%',
    height: 'inherit',
    borderTopLeftRadius: theme.comp.linearProgress.pathShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.linearProgress.pathShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.linearProgress.pathShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.linearProgress.pathShapeBorderRadiusBottomRight,
    backgroundColor: (props: LinearStylesProps) =>
      props?.color ?? theme.comp.linearProgress.pathColorBackground,
    transition: 'width 110ms linear',
  },

  '@keyframes progress-bar-indeterminate': {
    '0%': {
      backgroundPositionX: '25%',
    },

    '80%': {
      backgroundPositionX: '-105%',
    },

    '100%': {
      backgroundPositionX: '-105%',
    },
  },
}))

export interface LinearStylesProps {
  color?: React.CSSProperties['color']
}

export interface LinearProgressProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'size'> {
  classes?: Partial<LinearClasses>
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
  size?: Exclude<ProgressSizeProps, 'xlg'>
  /**
   * Скрыть задний фон прогресс бара
   */
  hideTrack?: boolean
  /**
   * Цвет линии
   */
  color?: React.CSSProperties['color']
  /**
   * Свойства элемента track
   */
  trackProps?: React.HTMLAttributes<HTMLDivElement>
}

export const LinearProgress = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      value,
      max = 100,
      size = ProgressSize.lg,
      hideTrack = false,
      color,
      trackProps,
      ...rest
    }: LinearProgressProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classList = useStyles({ color })

    const indeterminate = value === null || value === undefined

    const classesMap = useClassList(classList, classes)

    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.sm]: size === ProgressSize.sm,
      [classesMap.md]: size === ProgressSize.md,
      [classesMap.lg]: size === ProgressSize.lg,
    })

    let cappedValue = value
    if (cappedValue && cappedValue > max) {
      cappedValue = max
    }
    if (cappedValue && cappedValue < 0) {
      cappedValue = 0
    }

    const percentage = cappedValue && (cappedValue / max) * 100

    return (
      <div {...rest} ref={ref} className={className}>
        <div
          {...trackProps}
          className={clsx(
            trackProps?.className,
            classesMap.track,
            classesMap.barTrack,
            {
              [classesMap.withoutTrack]: hideTrack,
              [classesMap.indeterminate]: indeterminate,
            }
          )}
          role="progressbar"
          aria-valuemin={!indeterminate ? 0 : undefined}
          aria-valuemax={!indeterminate ? max : undefined}
          aria-valuenow={!indeterminate ? cappedValue : undefined}
        >
          {percentage ? (
            <div
              aria-label="track"
              role="img"
              className={clsx(classesMap.path, classesMap.barProgress)}
              style={{ width: `${percentage || 0}%` }}
            />
          ) : null}
        </div>
      </div>
    )
  }
)
