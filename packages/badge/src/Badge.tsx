'use client'

import * as React from 'react'
import type { ComponentPropsWithRefFix } from '@v-uik/common'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Classes } from './classes'

interface BadgeStylesProps {
  /**
   * Смещение положения значка по горизонтали
   */
  horizontalOffset?: string | number
  /**
   * Смещение положения значка по вертикали
   */
  verticalOffset?: string | number
}

const getDynamicStyles = (
  params: BadgeStylesProps & {
    top: boolean
    bottom: boolean
    left: boolean
    right: boolean
  }
) => ({
  badge: {
    top: params.top ? params.verticalOffset || 0 : undefined,
    bottom: params.bottom ? params.verticalOffset || 0 : undefined,
    right: params.right ? params.horizontalOffset || 0 : undefined,
    left: params.left ? params.horizontalOffset || 0 : undefined,
  },
})

const useStyles = createUseStyles((theme) => ({
  badge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    zIndex: 1, // Render the badge on top of potential ripples.
    transition: 'transform 150ms',
    textAlign: 'center',
    padding: '0px 4px',
    borderTopLeftRadius: theme.comp.badge.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.badge.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.badge.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.badge.shapeBorderRadiusBottomRight,
    minWidth: '16px',
    flexGrow: '0',
    boxShadow: `0 0 0 2px ${theme.comp.badge.colorShadow}`,
    pointerEvents: 'none',

    fontFamily: theme.comp.badge.typographyFontFamily,
    fontWeight: theme.comp.badge.typographyFontWeight,
    fontSize: theme.comp.badge.typographyFontSize,
    lineHeight: theme.comp.badge.typographyLineHeight,
    letterSpacing: theme.comp.badge.typographyLetterSpacing,

    '&$top': {
      '&$right$show': {
        transform: 'scale(1) translate(50%, -50%)',
        transformOrigin: '100% 0%',
      },
      '&$right': {
        transform: 'scale(0) translate(50%, -50%)',
        transformOrigin: '100% 0%',
      },
      '&$left$show': {
        transform: 'scale(1) translate(-50%, -50%)',
        transformOrigin: '0% 0%',
      },
      '&$left': {
        transform: 'scale(0) translate(-50%, -50%)',
        transformOrigin: '0% 0%',
      },
    },

    '&$bottom': {
      '&$right$show': {
        transform: 'scale(1) translate(50%, 50%)',
        transformOrigin: '100% 100%',
      },
      '&$right': {
        transform: 'scale(0) translate(50%, 50%)',
        transformOrigin: '100% 100%',
      },
      '&$left$show': {
        transform: 'scale(1) translate(-50%, 50%)',
        transformOrigin: '0% 100%',
      },
      '&$left': {
        transform: 'scale(0) translate(-50%, 50%)',
        transformOrigin: '0% 100%',
      },
    },
  },

  show: {},

  badgeRoot: {
    display: 'inline-flex',
    position: 'relative',
    flexShrink: '0',
    verticalAlign: 'middle',
  },

  top: {},

  bottom: {},

  right: {},

  left: {},

  // Status
  success: {
    color: theme.comp.badge.colorTextSuccess,
    backgroundColor: theme.comp.badge.colorBackgroundSuccess,
  },
  error: {
    color: theme.comp.badge.colorTextError,
    backgroundColor: theme.comp.badge.colorBackgroundError,
  },
  neutral: {
    color: theme.comp.badge.colorTextNeutral,
    backgroundColor: theme.comp.badge.colorBackgroundNeutral,
  },
  info: {
    color: theme.comp.badge.colorTextInfo,
    backgroundColor: theme.comp.badge.colorBackgroundInfo,
  },
  warning: {
    color: theme.comp.badge.colorTextWarning,
    backgroundColor: theme.comp.badge.colorBackgroundWarning,
  },
  disabled: {
    color: theme.comp.badge.colorTextDisabled,
    backgroundColor: theme.comp.badge.colorBackgroundDisabled,
  },

  // Badge type styles
  dot: {
    height: '8px',
    width: '8px',
    borderTopLeftRadius: theme.comp.badge.dotShapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.badge.dotShapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.badge.dotShapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.badge.dotShapeBorderRadiusBottomRight,
    minWidth: 0,
  },
}))

/**
 * Следующее утверждение используется для получения значения с помощью сопоставления типов
 *
 * ```tsx
 * import { Badge, BadgePosition } from '@v-uik/badge'
 *
 * return (
 *   <Badge position={BadgePosition.topLeft}><Badge>
 * )
 * ```
 */
export const BadgePosition = {
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
} as const

export type TBadgePosition = typeof BadgePosition[keyof typeof BadgePosition]

export interface BadgePositionProperties {
  horizontal: 'left' | 'right'
  vertical: 'bottom' | 'top'
}

export const BadgeStatus = {
  success: 'success',
  neutral: 'neutral',
  error: 'error',
  info: 'info',
  warning: 'warning',
  disabled: 'disabled', // оставлено для обратной совместимости
} as const

export type TBadgeStatus = keyof typeof BadgeStatus

export interface BadgeProps
  extends BadgeStylesProps,
    ComponentPropsWithRefFix<'span'> {
  /**
   * JSS-классы для стилизации.
   */
  classes?: Classes
  /**
   * Отображает значок, как цветную точку без контента. В этом состоянии,
   * значок отображается только при НЕ пустом значении свойства `content`.
   */
  dot?: boolean
  /**
   * Цветовая схема значка.
   *
   * secondary - по-умолчанию,
   * success - сообщение об успехе,
   * error - сообщение об ошибке,
   * processing - сообщение об выполняющемся действии,
   * warning - предупреждение,
   */
  status?: TBadgeStatus
  /**
   * Положение значка относительно дочернего элемента.
   */
  position?: TBadgePosition | BadgePositionProperties
  /**
   * Контент, который отображается внутри значка. Если свойство имеет пустое значение —
   * _0, undefined, null, '', false_ — то значок не будет отображаться.
   * Это поведение можно изменить с помощью свойства `showZero`.
   */
  content?: React.ReactNode
  /**
   * Верхняя граница для числового значения значка. Чтобы убрать верхнюю границу
   * можно передать значение равное Infinity
   */
  max?: number
  /**
   * Включает отображение значка при пустом значении — _0, undefined, null, '', false_ —
   * свойства `content`.
   */
  showZero?: boolean
  /**
   * Состояние активности элемента
   */
  disabled?: boolean
}

export const Badge = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      dot,
      status = BadgeStatus.error,
      position = {
        vertical: 'top',
        horizontal: 'right',
      },
      max = 99,
      content,
      children,
      showZero,
      disabled,
      horizontalOffset = 0,
      verticalOffset = 0,
      ...rest
    }: BadgeProps,
    ref: React.Ref<HTMLSpanElement>
  ) => {
    let computedPosition = position as BadgePositionProperties

    if (typeof position === 'string') {
      const [vertical, horizontal] = position.split('-') as [
        BadgePositionProperties['vertical'],
        BadgePositionProperties['horizontal']
      ]

      computedPosition = { vertical, horizontal }
    }

    const showBadge = showZero || !!content
    /**
     * Контент, который отображается внутри значка, имеет ряд условия на отображение,
     * в зависимости от типа и значения.
     */
    let actualContent = content

    if (typeof actualContent === 'number') {
      // Верхняя граница для числового значения значка.
      actualContent = actualContent <= max ? actualContent : `${max}+`
    }

    if (dot) {
      actualContent = null
    }

    const classesList = useStyles()
    const dynamicStyles = getDynamicStyles({
      verticalOffset,
      horizontalOffset,
      top: computedPosition.vertical === 'top',
      bottom: computedPosition.vertical === 'bottom',
      right: computedPosition.horizontal === 'right',
      left: computedPosition.horizontal === 'left',
    })
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.badge, {
      [classesMap.dot]: dot,
      [classesMap.success]: status === BadgeStatus.success,
      [classesMap.error]: status === BadgeStatus.error,
      [classesMap.neutral]: status === BadgeStatus.neutral,
      [classesMap.info]: status === BadgeStatus.info,
      [classesMap.warning]: status === BadgeStatus.warning,
      [classesMap.disabled]: disabled || status === BadgeStatus.disabled,
      [classesMap.top]: computedPosition.vertical === 'top',
      [classesMap.bottom]: computedPosition.vertical === 'bottom',
      [classesMap.right]: computedPosition.horizontal === 'right',
      [classesMap.left]: computedPosition.horizontal === 'left',
      [classesMap.show]: showBadge,
    })

    return (
      <span {...rest} ref={ref} className={classesMap.badgeRoot}>
        {children}
        <span className={className} style={dynamicStyles.badge}>
          {actualContent}
        </span>
      </span>
    )
  }
)
