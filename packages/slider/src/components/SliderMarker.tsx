'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import type { SliderMarkerClasses } from '../interfaces'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles((theme) => {
  const active = {
    width: 16,
    height: 16,
    boxShadow: 'none',
    cursor: 'pointer',
    background: theme.comp.slider.markerColorBackgroundActive,
  }

  const focused = {
    width: 10,
    height: 10,
    background: theme.comp.slider.markerColorBackgroundFocus,
    boxShadow: `0 0 0 1px ${theme.comp.slider.markerColorBorderShadowFocus}, 0 0 0 3px ${theme.comp.slider.markerColorShadowFocus}`,
  }

  const focusedHover = {
    width: 16,
    height: 16,
    boxShadow: `0 0 0 1px ${theme.comp.slider.markerColorBorderShadowFocus}, 0 0 0 3px ${theme.comp.slider.markerColorShadowFocus}`,
  }

  return {
    root: {
      width: 16,
      height: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      outline: 'none',

      '&:hover $marker': {
        width: 16,
        height: 16,
      },

      '& $focused': focused,
      '&:hover $focused': focusedHover,
      '&:focus-visible $focused': focused,

      '& $active': active,
      '&:hover $active': active,
      '&:focus-visible $active': active,
    },

    marker: {
      width: 8,
      height: 8,
      border: 'none',
      boxShadow: 'none',
      borderTopLeftRadius: theme.comp.slider.markerShapeBorderRadiusTopLeft,
      borderTopRightRadius: theme.comp.slider.markerShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.slider.markerShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.slider.markerShapeBorderRadiusBottomRight,
      backgroundColor: theme.comp.slider.markerColorBackground,
      transition:
        'width 0.1s ease-in, ' +
        'height 0.1s ease-in, ' +
        'box-shadow 0.1s ease-in',
    },

    active: {},
    focused: {},
    disabled: {
      backgroundColor: theme.comp.slider.markerColorBackgroundDisabled,
    },
  }
})

export interface SliderMarkerProps extends ComponentPropsWithRefFix<'div'> {
  isActive?: boolean
  isFocused?: boolean
  disabled?: boolean
  classes?: Partial<SliderMarkerClasses>
}

export const SliderMarker = React.forwardRef(
  (
    {
      className: classNameProp,
      isActive,
      isFocused,
      disabled,
      classes,
      ...rest
    }: SliderMarkerProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classesMap.marker, classNameProp, {
      [classesMap.active]: isActive,
      [classesMap.focused]: isFocused,
      [classesMap.disabled]: disabled,
    })

    return (
      <div
        {...rest}
        ref={ref}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        className={classesMap.root}
      >
        <div className={className} />
      </div>
    )
  }
)
