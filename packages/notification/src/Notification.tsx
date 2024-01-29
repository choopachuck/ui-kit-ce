'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList, useMergedRefs } from '@v-uik/hooks'
import { useButtonReset } from '@v-uik/button'
import {
  NotificationClasses,
  NotificationProps,
  NotificationStatus,
  TNotificationStatus,
} from './types'
import { Transition } from './components/Transition'
import { IconClose, IconError, IconInfo, IconSuccess } from './assets'
import { isEqualKeyboardKeys } from '@v-uik/utils'

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
  },

  indicator: {
    backgroundColor: theme.comp.notification.indicatorColorBackgroundNeutral,
    width: 4,
    marginLeft: 8,
    borderRadius: 1,
  },

  clickable: {
    cursor: 'pointer',
  },

  success: {
    '& $indicator': {
      backgroundColor: theme.comp.notification.indicatorColorBackgroundSuccess,
    },

    '& $icon': {
      color: theme.comp.notification.iconColorTextSuccess,
    },
  },

  info: {
    '& $indicator': {
      backgroundColor: theme.comp.notification.indicatorColorBackgroundInfo,
    },

    '& $icon': {
      color: theme.comp.notification.iconColorTextInfo,
    },
  },

  warning: {
    '& $indicator': {
      backgroundColor: theme.comp.notification.indicatorColorBackgroundWarning,
    },

    '& $icon': {
      color: theme.comp.notification.iconColorTextWarning,
    },
  },

  error: {
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

  closeButton: {
    flex: '0 0 40px',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    color: theme.comp.notification.closeButtonColorText,
    cursor: 'pointer',

    '&:hover': {
      color: theme.comp.notification.closeButtonColorTextHover,
      backgroundColor: theme.comp.notification.closeButtonColorBackgroundHover,
    },

    '&:active': {
      color: theme.comp.notification.closeButtonColorTextActive,
      backgroundColor: theme.comp.notification.closeButtonColorBackgroundActive,
    },

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.notification.closeButtonColorShadowFocus}`,
    },
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
      ...rest
    }: NotificationPropsWithClasses,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const notificationRef = React.useRef<HTMLDivElement | null>(null)

    const mergedRef = useMergedRefs([ref, notificationRef])

    const icon = iconProp === undefined ? iconByStatus[status] : iconProp

    const classesList = useStyles()

    const buttonClasses = useButtonReset()

    const classesMap = useClassList(classesList, classes)

    const className = clsx(classesMap.root, classNameProp, {
      [classesMap.clickable]: closeOnClick,
      [classesMap.success]: status === NotificationStatus.success,
      [classesMap.info]: status === NotificationStatus.info,
      [classesMap.warning]: status === NotificationStatus.warning,
      [classesMap.error]: status === NotificationStatus.error,
    })

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

          <div className={classesMap.content}>{children}</div>

          {showCloseButton && (
            <button
              type="button"
              className={clsx(
                buttonClasses.resetButton,
                classesMap.closeButton
              )}
              aria-label={closeButtonAriaLabel}
              onClick={closeNotification}
            >
              <IconClose />
            </button>
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
