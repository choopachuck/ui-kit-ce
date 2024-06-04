'use client'

import * as React from 'react'
import { clsx, createUseStyles, useTheme, Theme } from '@v-uik/theme'
import { useClassList, useMergedRefs } from '@v-uik/hooks'
import {
  NotificationClasses,
  NotificationProps,
  NotificationStatus,
  TNotificationStatus,
} from './types'
import { Transition } from './components/Transition'
import { IconError, IconInfo, IconSuccess } from './assets'
import { isEqualKeyboardKeys, getClassnameByStatus, pick } from '@v-uik/utils'
import { CloseButton, Direction } from '@v-uik/common'

const iconByStatus: Record<TNotificationStatus, React.ReactElement> = {
  default: <IconInfo />,
  info: <IconInfo />,
  error: <IconError />,
  warning: <IconError />,
  success: <IconSuccess />,
}

const useStyles = createUseStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    padding: [8, 8, 8, 0],
    marginBottom: 16,
    borderTopLeftRadius: theme.comp.notification.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.notification.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.notification.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.notification.shapeBorderRadiusBottomRight,
    boxShadow: theme.comp.notification.elevationShadow,
    backgroundColor: theme.comp.notification.colorBackground,
    color: theme.comp.notification.colorText,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -1,
      left: -1,
      borderWidth: theme.shape.borderWidth,
      borderStyle: theme.shape.borderStyle,
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
      borderColor: theme.comp.notification.colorBorderNeutral,
      height: '100%',
      width: '100%',
      zIndex: -1,
    },
  },

  horizontal: {
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
      margin: 0,
      display: 'block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flex: 1,
      minWidth: 0,
    },
  },

  vertical: {
    '& $content': {
      margin: 0,
      display: 'block',
    },
    '& $textContainer': {
      flexDirection: 'column',
      gap: 8,
    },
    '& $body': {
      marginTop: 10,
      marginBottom: 8,
      flexDirection: 'column',
      gap: 16,
    },
  },

  next_content: {
    fontFamily: theme.comp.notification.next_contentTypographyFontFamily,
    fontSize: theme.comp.notification.next_contentTypographyFontSize,
    lineHeight: theme.comp.notification.next_contentTypographyLineHeight,
    letterSpacing: theme.comp.notification.next_contentTypographyLetterSpacing,
    fontWeight: theme.comp.notification.next_contentTypographyFontWeight,
  },

  contentError: {
    color: theme.comp.notification.contentColorTextError,
  },
  contentWarning: {
    color: theme.comp.notification.contentColorTextWarning,
  },
  contentSuccess: {
    color: theme.comp.notification.contentColorTextSuccess,
  },
  contentNeutral: {
    color: theme.comp.notification.contentColorTextNeutral,
  },
  contentInfo: {
    color: theme.comp.notification.contentColorTextInfo,
  },

  body: {
    display: 'flex',
    flexGrow: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  textContainer: {
    display: 'flex',
  },

  title: {
    fontFamily: theme.comp.notification.titleTypographyFontFamily,
    fontWeight: theme.comp.notification.titleTypographyFontWeight,
    fontSize: theme.comp.notification.titleTypographyFontSize,
    lineHeight: theme.comp.notification.titleTypographyLineHeight,
    letterSpacing: theme.comp.notification.titleTypographyLetterSpacing,
  },
  titleError: {
    color: theme.comp.notification.titleColorTextError,
  },
  titleWarning: {
    color: theme.comp.notification.titleColorTextWarning,
  },
  titleSuccess: {
    color: theme.comp.notification.titleColorTextSuccess,
  },
  titleNeutral: {
    color: theme.comp.notification.titleColorTextNeutral,
  },
  titleInfo: {
    color: theme.comp.notification.titleColorTextInfo,
  },
  actions: {},

  indicator: {
    backgroundColor: theme.comp.notification.indicatorColorBackgroundNeutral,
    width: 4,
    marginLeft: 8,
    borderRadius: 1,
    flexShrink: 0,
  },

  clickable: {
    cursor: 'pointer',
  },

  success: {
    '&::after': {
      borderColor: theme.comp.notification.colorBorderSuccess,
    },
    '& $indicator': {
      backgroundColor: theme.comp.notification.indicatorColorBackgroundSuccess,
    },

    '& $icon': {
      color: theme.comp.notification.iconColorTextSuccess,
    },
  },

  info: {
    '&::after': {
      borderColor: theme.comp.notification.colorBorderInfo,
    },
    '& $indicator': {
      backgroundColor: theme.comp.notification.indicatorColorBackgroundInfo,
    },

    '& $icon': {
      color: theme.comp.notification.iconColorTextInfo,
    },
  },

  warning: {
    '&::after': {
      borderColor: theme.comp.notification.colorBorderWarning,
    },
    '& $indicator': {
      backgroundColor: theme.comp.notification.indicatorColorBackgroundWarning,
    },

    '& $icon': {
      color: theme.comp.notification.iconColorTextWarning,
    },
  },

  error: {
    '&::after': {
      borderColor: theme.comp.notification.colorBorderError,
    },
    '& $indicator': {
      backgroundColor: theme.comp.notification.indicatorColorBackgroundError,
    },

    '& $icon': {
      color: theme.comp.notification.iconColorTextError,
    },
  },

  icon: {
    flex: '0 0 24px',
    display: 'flex',
    marginLeft: 16,
    padding: [8, 0],
    color: theme.comp.notification.iconColorTextNeutral,
  },

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    margin: [10, 8, 8, 16],

    fontFamily: theme.comp.notification.contentTypographyFontFamily,
    fontSize: theme.comp.notification.contentTypographyFontSize,
    lineHeight: theme.comp.notification.contentTypographyLineHeight,
    letterSpacing: theme.comp.notification.contentTypographyLetterSpacing,
    fontWeight: theme.comp.notification.contentTypographyFontWeight,
  },

  '@keyframes fakeProgress': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },

  progressImitationHelper: {
    position: 'absolute',
    bottom: 0,
    height: 0,
    animationName: '$fakeProgress',
  },
}))

export interface NotificationPropsWithClasses extends NotificationProps {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<NotificationClasses>
}

const ESCAPE_KEY = 'Escape'

export const Notification = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      position,
      status = NotificationStatus.default,
      nextNotification,
      direction: propDirection,
      title,
      actions,
      isActive,
      autoClose,
      closeOnClick,
      closeNotification,
      pauseOnHover,
      pauseOnWindowBlur,
      showCloseButton,
      icon: iconProp,
      removeNotification,
      onClick: onClickProp,
      onMouseEnter: onMouseEnterProp,
      onMouseLeave: onMouseLeaveProp,
      children,
      showIndicator = true,
      closeOnEscapeKeyDown = true,
      closeButtonAriaLabel,
      closeButtonProps,
      ...rest
    }: NotificationPropsWithClasses,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const notificationRef = React.useRef<HTMLDivElement | null>(null)

    const mergedRef = useMergedRefs([ref, notificationRef])

    const icon = iconProp === undefined ? iconByStatus[status] : iconProp

    const classesList = useStyles()

    const classesMap = useClassList(classesList, classes)
    const notificationComp = useTheme().comp.notification
    const closeButtonTokens = pick<
      typeof notificationComp,
      Theme['comp']['closeButton']
    >(notificationComp, /^closeButton/, (v) =>
      v.replace(/^(closeButton)([A-Z])/, (_$1, _$2, $3: string) =>
        $3.toLowerCase()
      )
    )

    const direction = nextNotification
      ? propDirection || Direction.horizontal
      : undefined

    const className = clsx(
      classesMap.root,
      classNameProp,
      getClassnameByStatus(status, {
        success: classesMap.success,
        info: classesMap.info,
        warning: classesMap.warning,
        error: classesMap.error,
      }),
      {
        [classesMap.horizontal]: direction === Direction.horizontal,
        [classesMap.vertical]: direction === Direction.vertical,
        [classesMap.clickable]: closeOnClick,
      }
    )

    const [isRunning, setIsRunning] = React.useState(true)

    const runNotification = () => setIsRunning(true)

    const pauseNotification = () => setIsRunning(false)

    const bindWindowBlurEvent = () => {
      if (!document.hasFocus()) {
        runNotification()
      }
      window.addEventListener('focus', runNotification)
      window.addEventListener('blur', pauseNotification)
    }

    const unbindWindowBlurEvents = () => {
      window.removeEventListener('focus', runNotification)
      window.removeEventListener('blur', pauseNotification)
    }

    /**
     * Обработка нажатия на escape (https://mui.com/material-ui/react-snackbar/#accessibility)
     */
    React.useEffect(() => {
      const callback = (event: KeyboardEvent) => {
        if (isEqualKeyboardKeys(ESCAPE_KEY, event.key)) {
          closeNotification()
        }
      }

      if (closeOnEscapeKeyDown) {
        window.addEventListener('keydown', callback)
      }

      return () => {
        if (closeOnEscapeKeyDown) {
          window.removeEventListener('keydown', callback)
        }
      }
    }, [closeOnEscapeKeyDown, closeNotification])

    React.useEffect(() => {
      if (pauseOnWindowBlur) {
        bindWindowBlurEvent()
      }

      return () => {
        if (pauseOnWindowBlur) {
          unbindWindowBlurEvents()
        }
      }
    }, [pauseOnWindowBlur]) // eslint-disable-line react-hooks/exhaustive-deps

    const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnterProp?.(event)
      pauseNotification()
    }

    const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeaveProp?.(event)
      runNotification()
    }

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClickProp?.(event)
      if (closeOnClick) {
        closeNotification?.()
      }
    }

    const shouldListenHoverEvent = autoClose && pauseOnHover

    const titleClassName = getClassnameByStatus(
      status,
      {
        success: classesMap.titleSuccess,
        info: classesMap.titleInfo,
        warning: classesMap.titleWarning,
        error: classesMap.titleError,
        default: classesMap.titleNeutral,
      },
      classesMap.title
    )

    const contentClassName = clsx(
      getClassnameByStatus(
        status,
        {
          success: classesMap.contentSuccess,
          info: classesMap.contentInfo,
          warning: classesMap.contentWarning,
          error: classesMap.contentError,
          default: classesMap.contentNeutral,
        },
        classesMap.content
      ),
      {
        [classesMap.next_content]: nextNotification,
      }
    )

    return (
      <Transition
        position={position}
        isActive={isActive}
        notificationRef={notificationRef}
        onEnd={removeNotification}
      >
        <div
          {...rest}
          ref={mergedRef}
          className={className}
          onClick={onClick}
          onMouseEnter={
            shouldListenHoverEvent ? onMouseEnter : onMouseEnterProp
          }
          onMouseLeave={
            shouldListenHoverEvent ? onMouseLeave : onMouseLeaveProp
          }
        >
          {showIndicator && (
            <div className={classesMap.indicator} aria-hidden="true" />
          )}

          {icon && (
            <div className={classesMap.icon} aria-hidden="true">
              {icon}
            </div>
          )}

          {nextNotification ? (
            <div className={classesMap.body}>
              <div className={classesMap.textContainer}>
                {title && <div className={titleClassName}>{title}</div>}
                {children && <div className={contentClassName}>{children}</div>}
              </div>
              {actions && <div className={classesMap.actions}>{actions}</div>}
            </div>
          ) : (
            <div className={contentClassName}>{children}</div>
          )}

          {showCloseButton && (
            <CloseButton
              tokens={closeButtonTokens}
              aria-label={closeButtonAriaLabel}
              {...closeButtonProps}
              onClick={closeNotification}
            />
          )}

          {!!autoClose && (
            <div
              aria-hidden
              className={classesMap.progressImitationHelper}
              style={{
                animationDuration: `${autoClose || 0}ms`,
                animationPlayState: isRunning ? 'running' : 'paused',
              }}
              onAnimationEnd={() =>
                isActive ? closeNotification?.() : undefined
              }
            />
          )}
        </div>
      </Transition>
    )
  }
)
