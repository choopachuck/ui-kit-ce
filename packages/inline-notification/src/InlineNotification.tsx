'use client'

import React from 'react'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import {
  InlineNotificationKindType,
  InlineNotificationStatusType,
  InlineNotificationKind,
  InlineNotificationStatus,
} from './types'
import { IconClasses, Icon } from './components/Icon'
import { IndicatorClasses, Indicator } from './components/Indicator'
import { CloseButton, Direction, DirectionType } from '@v-uik/common'
import { getClassnameByStatus } from '@v-uik/utils'

const useStyles = createUseStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    padding: 8,
    borderTopLeftRadius: theme.comp.inlineNotification.shapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.inlineNotification.shapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.inlineNotification.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.inlineNotification.shapeBorderRadiusBottomRight,
    display: 'flex',
    flexWrap: 'nowrap',
    gap: 8,
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

  horizontal: {
    '& $bodyWrapper': {
      // компенсация отрицательных margin
      padding: [12, 8],
      alignItems: 'center',
      overflow: 'hidden',
      // хак overflow для close button
      marginTop: -8,
      marginBottom: -8,
    },
    '& $body': {
      alignItems: 'center',
      gap: 16,
      overflow: 'hidden',
    },
    '& $textContainer': {
      flexGrow: 1,
      gap: 4,
      overflow: 'hidden',
    },
    '& $title': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '& $content': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flex: 1,
      minWidth: 0,
    },
    '& $closeButton': {
      margin: -8,
    },
  },

  vertical: {
    '& $bodyWrapper': {
      padding: 8,
    },
    '& $textContainer': {
      flexDirection: 'column',
      gap: 8,
    },
    '& $body': {
      marginTop: 2,
      flexDirection: 'column',
      gap: 16,
    },
    '& $closeButton': {
      marginTop: -8,
      marginLeft: -8,
      marginRight: -8,
    },
  },

  bodyWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: 16,
    flexGrow: 1,
    zIndex: 2,
  },

  body: {
    display: 'flex',
    flexGrow: 1,
  },

  textContainer: {
    display: 'flex',
  },

  title: {
    fontFamily: theme.comp.inlineNotification.titleTypographyFontFamily,
    fontWeight: theme.comp.inlineNotification.titleTypographyFontWeight,
    fontSize: theme.comp.inlineNotification.titleTypographyFontSize,
    lineHeight: theme.comp.inlineNotification.titleTypographyLineHeight,
    letterSpacing: theme.comp.inlineNotification.titleTypographyLetterSpacing,
  },
  titleError: {
    color: theme.comp.inlineNotification.titleColorTextError,
  },
  titleWarning: {
    color: theme.comp.inlineNotification.titleColorTextWarning,
  },
  titleSuccess: {
    color: theme.comp.inlineNotification.titleColorTextSuccess,
  },
  titleNeutral: {
    color: theme.comp.inlineNotification.titleColorTextNeutral,
  },
  titleInfo: {
    color: theme.comp.inlineNotification.titleColorTextInfo,
  },

  content: {
    flexGrow: 1,
    fontFamily: theme.comp.inlineNotification.contentTypographyFontFamily,
    fontWeight: theme.comp.inlineNotification.contentTypographyFontWeight,
    fontSize: theme.comp.inlineNotification.contentTypographyFontSize,
    lineHeight: theme.comp.inlineNotification.contentTypographyLineHeight,
    letterSpacing: theme.comp.inlineNotification.contentTypographyLetterSpacing,
  },
  contentError: {
    color: theme.comp.inlineNotification.contentColorTextError,
  },
  contentWarning: {
    color: theme.comp.inlineNotification.contentColorTextWarning,
  },
  contentSuccess: {
    color: theme.comp.inlineNotification.contentColorTextSuccess,
  },
  contentNeutral: {
    color: theme.comp.inlineNotification.contentColorTextNeutral,
  },
  contentInfo: {
    color: theme.comp.inlineNotification.contentColorTextInfo,
  },

  actions: {},

  closeButton: {},

  outlined: {
    backgroundColor: theme.comp.inlineNotification.colorBackgroundOutlined,
  },
  outlinedError: {
    borderColor: theme.comp.inlineNotification.colorBorderOutlinedError,
  },
  outlinedWarning: {
    borderColor: theme.comp.inlineNotification.colorBorderOutlinedWarning,
  },
  outlinedSuccess: {
    borderColor: theme.comp.inlineNotification.colorBorderOutlinedSuccess,
  },
  outlinedInfo: {
    borderColor: theme.comp.inlineNotification.colorBorderOutlinedInfo,
  },
  outlinedNeutral: {
    borderColor: theme.comp.inlineNotification.colorBorderOutlinedNeutral,
  },

  filled: {
    boxShadow: theme.comp.inlineNotification.elevationShadowFilled,
  },
  filledError: {
    backgroundColor: theme.comp.inlineNotification.colorBackgroundFilledError,
    borderColor: theme.comp.inlineNotification.colorBorderFilledError,
  },
  filledWarning: {
    backgroundColor: theme.comp.inlineNotification.colorBackgroundFilledWarning,
    borderColor: theme.comp.inlineNotification.colorBorderFilledWarning,
  },
  filledSuccess: {
    backgroundColor: theme.comp.inlineNotification.colorBackgroundFilledSuccess,
    borderColor: theme.comp.inlineNotification.colorBorderFilledSuccess,
  },
  filledInfo: {
    backgroundColor: theme.comp.inlineNotification.colorBackgroundFilledInfo,
    borderColor: theme.comp.inlineNotification.colorBorderFilledInfo,
  },
  filledNeutral: {
    backgroundColor: theme.comp.inlineNotification.colorBackgroundFilledNeutral,
    borderColor: theme.comp.inlineNotification.colorBorderFilledNeutral,
  },
}))

export type InlineNotificationClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
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

  /** Стиль title (стилизуется как потомок horizontal/vertical) */
  title?: string
  /** Стиль title при status: error */
  titleError?: string
  /** Стиль title при status: warning */
  titleWarning?: string
  /** Стиль title при status: success */
  titleSuccess?: string
  /** Стиль title при status: neutral */
  titleNeutral?: string
  /** Стиль title при status: info */
  titleInfo?: string

  /** Стиль content (стилизуется как потомок horizontal/vertical) */
  content?: string
  /** Стиль content при status: error */
  contentError?: string
  /** Стиль content при status: warning */
  contentWarning?: string
  /** Стиль content при status: success */
  contentSuccess?: string
  /** Стиль content при status: neutral */
  contentNeutral?: string
  /** Стиль content при status: info */
  contentInfo?: string

  /** Стиль обертки title и content (стилизуется как потомок horizontal/vertical) */
  textContainer?: string

  /** Стиль контейнера actions (стилизуется как потомок horizontal/vertical) */
  actions?: string

  /** Стиль обёртки контента (стилизуется как потомок horizontal/vertical) */
  bodyWrapper?: string

  /** Стиль контейнера контента (стилизуется как потомок horizontal/vertical) */
  body?: string

  /** Стиль кнопки закрытия уведомления (стилизуется как потомок horizontal/vertical) */
  closeButton?: string

  /** Стиль при direction: horizontal */
  horizontal?: string

  /** Стиль при direction: vertical */
  vertical?: string
} & IconClasses &
  IndicatorClasses

const defaultElement = 'div'

type InlineNotificationBaseProps = {
  /**
   * заголовок
   */
  title?: React.ReactNode
  /**
   * действия
   */
  actions?: React.ReactNode
  /**
   * отображение компонента
   */
  kind?: InlineNotificationKindType
  /**
   * статус компонента
   */
  status?: InlineNotificationStatusType
  /**
   * отображать иконку, либо элемент с иконкой
   */
  icon?: React.ReactNode | boolean
  /**
   * функция нажатия по кнопке закрытия
   */
  onClose?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  /**
   * отображать вертикальную линию
   */
  showIndicator?: boolean
  /**
   * направление размещения элементов
   */
  direction?: DirectionType
  /**
   * CSS классы компонента
   */
  classes?: Partial<InlineNotificationClasses>
  /**
   * свойства кнопки закрытия
   */
  closeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

export type InlineNotificationProps<
  E extends React.ElementType = typeof defaultElement
> = PolymorphicComponentProps<E, InlineNotificationBaseProps>

export const InlineNotification = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      classes,
      kind = InlineNotificationKind.filled,
      status = InlineNotificationStatus.neutral,
      direction = Direction.horizontal,
      title,
      children,
      actions,
      className: propsClassName,
      ref,
      icon = true,
      showIndicator = true,
      onClose,
      closeButtonProps,
      ...props
    }: InlineNotificationProps<E>,
    innerRef: typeof ref
  ) => {
    const classList = useStyles()
    const classesMap = useClassList(classList, classes)

    const filledClassName = getClassnameByStatus(
      status,
      {
        error: classesMap.filledError,
        warning: classesMap.filledWarning,
        success: classesMap.filledSuccess,
        info: classesMap.filledInfo,
        neutral: classesMap.filledNeutral,
      },
      classesMap.filled
    )

    const outlinedClassName = getClassnameByStatus(
      status,
      {
        error: classesMap.outlinedError,
        warning: classesMap.outlinedWarning,
        success: classesMap.outlinedSuccess,
        info: classesMap.outlinedInfo,
        neutral: classesMap.outlinedNeutral,
      },
      classesMap.outlined
    )

    const className = clsx(classesMap.root, propsClassName, {
      [outlinedClassName]: kind === InlineNotificationKind.outlined,
      [filledClassName]: kind === InlineNotificationKind.filled,
      [classesMap.horizontal]: direction === Direction.horizontal,
      [classesMap.vertical]: direction === Direction.vertical,
    })

    const titleClassName = getClassnameByStatus(
      status,
      {
        error: classesMap.titleError,
        warning: classesMap.titleWarning,
        success: classesMap.titleSuccess,
        info: classesMap.titleInfo,
        neutral: classesMap.titleNeutral,
      },
      classesMap.title
    )

    const contentClassName = getClassnameByStatus(
      status,
      {
        error: classesMap.contentError,
        warning: classesMap.contentWarning,
        success: classesMap.contentSuccess,
        info: classesMap.contentInfo,
        neutral: classesMap.contentNeutral,
      },
      classesMap.content
    )

    return (
      <Box
        ref={innerRef}
        className={className}
        role="alert"
        {...(props as PolymorphicComponentProps<E, Record<string, unknown>>)}
      >
        {showIndicator && <Indicator classes={classes} status={status} />}
        <div className={classesMap.bodyWrapper}>
          {icon && (
            <Icon status={status} classes={classes}>
              {icon}
            </Icon>
          )}
          <div className={classesMap.body}>
            <div className={classesMap.textContainer}>
              {title && <div className={titleClassName}>{title}</div>}
              {children && <div className={contentClassName}>{children}</div>}
            </div>
            {actions && <div className={classesMap.actions}>{actions}</div>}
          </div>
          {(onClose || closeButtonProps) && (
            <CloseButton
              onClick={onClose}
              {...closeButtonProps}
              className={clsx(
                closeButtonProps?.className,
                classesMap.closeButton
              )}
            />
          )}
        </div>
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: InlineNotificationProps<E>
) => JSX.Element
