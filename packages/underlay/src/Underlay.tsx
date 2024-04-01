'use client'

import React from 'react'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'

const useStyles = createUseStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    padding: 20,
    borderTopLeftRadius: theme.comp.underlay.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.underlay.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.underlay.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.underlay.shapeBorderRadiusBottomRight,
    position: 'relative',

    '&::after': {
      border: '1px solid transparent',
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderColor: 'inherit',
    },
  },

  content: {
    position: 'relative',
    zIndex: 2,
  },

  outlined: {
    backgroundColor: theme.comp.underlay.colorBackgroundOutlined,
  },
  outlinedError: {
    borderColor: theme.comp.underlay.colorBorderOutlinedError,
  },
  outlinedWarning: {
    borderColor: theme.comp.underlay.colorBorderOutlinedWarning,
  },
  outlinedSuccess: {
    borderColor: theme.comp.underlay.colorBorderOutlinedSuccess,
  },
  outlinedInfo: {
    borderColor: theme.comp.underlay.colorBorderOutlinedInfo,
  },
  outlinedNeutral: {
    borderColor: theme.comp.underlay.colorBorderOutlinedNeutral,
  },

  filled: {},
  filledError: {
    backgroundColor: theme.comp.underlay.colorBackgroundFilledError,
    borderColor: theme.comp.underlay.colorBorderFilledError,
  },
  filledWarning: {
    backgroundColor: theme.comp.underlay.colorBackgroundFilledWarning,
    borderColor: theme.comp.underlay.colorBorderFilledWarning,
  },
  filledSuccess: {
    backgroundColor: theme.comp.underlay.colorBackgroundFilledSuccess,
    borderColor: theme.comp.underlay.colorBorderFilledSuccess,
  },
  filledInfo: {
    backgroundColor: theme.comp.underlay.colorBackgroundFilledInfo,
    borderColor: theme.comp.underlay.colorBorderFilledInfo,
  },
  filledNeutral: {
    backgroundColor: theme.comp.underlay.colorBackgroundFilledNeutral,
    borderColor: theme.comp.underlay.colorBorderFilledNeutral,
  },
}))

export type UnderlayClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к контенту */
  content?: string
  /** Стиль при kind: outlined  */
  outlined?: string
  /** Стиль при kind: outlined и status: error */
  outlinedError?: string
  /** Стиль при kind: outlined и status: warning */
  outlinedWarning?: string
  /** Стиль при kind: outlined и status: success */
  outlinedSuccess?: string
  /** Стиль при kind: outlined и status: info */
  outlinedInfo?: string
  /** Стиль при kind: outlined и status: neutral */
  outlinedNeutral?: string
  /** Стиль при kind: filled  */
  filled?: string
  /** Стиль при kind: filled и status: error */
  filledError?: string
  /** Стиль при kind: filled и status: warning */
  filledWarning?: string
  /** Стиль при kind: filled и status: success */
  filledSuccess?: string
  /** Стиль при kind: filled и status: info */
  filledInfo?: string
  /** Стиль при kind: filled и status: neutral */
  filledNeutral?: string
}

const defaultElement = 'div'

export const UnderlayKind = {
  filled: 'filled',
  outlined: 'outlined',
} as const

export type UnderlayKindType = keyof typeof UnderlayKind

export const UnderlayStatus = {
  neutral: 'neutral',
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
} as const

export type UnderlayStatusType = keyof typeof UnderlayStatus

type UnderlayBaseProps = {
  /**
   * CSS классы компонента
   */
  classes?: Partial<UnderlayClasses>
  /**
   * отображение компонента
   */
  kind?: UnderlayKindType
  /**
   * статус компонента
   */
  status?: UnderlayStatusType
  /**
   * цвет underlay
   */
  color?: React.CSSProperties['color']
}

export type UnderlayProps<E extends React.ElementType = typeof defaultElement> =
  PolymorphicComponentProps<E, UnderlayBaseProps>

export const Underlay = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      classes,
      kind = UnderlayKind.filled,
      status = UnderlayStatus.neutral,
      children,
      className: propsClassName,
      style: propsStyle,
      color,
      ref,
      ...props
    }: UnderlayProps<E>,
    innerRef: typeof ref
  ) => {
    const classList = useStyles()
    const classesMap = useClassList(classList, classes)

    const isError = status === UnderlayStatus.error
    const isWarning = status === UnderlayStatus.warning
    const isSuccess = status === UnderlayStatus.success
    const isInfo = status === UnderlayStatus.info
    const isNeutral = status === UnderlayStatus.neutral

    const outlinedClasses = kind === UnderlayKind.outlined && {
      [classesMap.outlined]: true,
      ...(!color
        ? {
            [classesMap.outlinedError]: isError,
            [classesMap.outlinedWarning]: isWarning,
            [classesMap.outlinedSuccess]: isSuccess,
            [classesMap.outlinedInfo]: isInfo,
            [classesMap.outlinedNeutral]: isNeutral,
          }
        : {}),
    }

    const filledClasses = kind !== UnderlayKind.outlined && {
      [classesMap.filled]: true,
      ...(!color
        ? {
            [classesMap.filledError]: isError,
            [classesMap.filledWarning]: isWarning,
            [classesMap.filledSuccess]: isSuccess,
            [classesMap.filledInfo]: isInfo,
            [classesMap.filledNeutral]: isNeutral,
          }
        : {}),
    }

    const className = clsx(classesMap.root, propsClassName, {
      ...(outlinedClasses ?? {}),
      ...(filledClasses ?? {}),
    })

    const colorStyleProp =
      kind === UnderlayKind.outlined ? 'borderColor' : 'backgroundColor'

    const style = color
      ? {
          [colorStyleProp]: color,
          ...propsStyle,
        }
      : propsStyle

    return (
      <Box
        ref={innerRef}
        className={className}
        style={style}
        {...(props as PolymorphicComponentProps<E, Record<string, unknown>>)}
      >
        <Box className={classesMap.content} as="div">
          {children}
        </Box>
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: UnderlayProps<E>
) => JSX.Element
