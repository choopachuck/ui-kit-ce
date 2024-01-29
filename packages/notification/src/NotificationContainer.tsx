'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import {
  NotificationContainerProps,
  NotificationContainerClasses,
} from './types'
import { Notification } from './Notification'
import {
  NotificationsToRender,
  useNotificationContainer,
} from './hooks/useNotificationContainer'

const OFFSET_POSITION = 16

const useStyles = createUseStyles((theme) => ({
  root: {},

  container: {
    position: 'fixed',
    zIndex: theme.zIndex.notification,
    width: 384,
    maxWidth: `calc(100vw - ${2 * OFFSET_POSITION}px)`,
  },

  top: {
    top: OFFSET_POSITION,
  },

  bottom: {
    bottom: OFFSET_POSITION,
  },

  left: {
    left: OFFSET_POSITION,
  },

  right: {
    right: OFFSET_POSITION,
  },

  center: {
    left: '50%',
    transform: 'translateX(-50%)',
  },
}))

export interface NotificationContainerPropsWithClasses
  extends NotificationContainerProps {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<NotificationContainerClasses>
}

const notificationContainerDefaultProps = {
  position: 'top-right',
  autoClose: 5000,
  closeOnEscapeKeyDown: true,
  showCloseButton: true,
  showIndicator: true,
  pauseOnHover: true,
  pauseOnWindowBlur: true,
  closeOnClick: true,
  closeButtonAriaLabel: undefined,
}

export const NotificationContainer = React.forwardRef(
  (
    props: NotificationContainerPropsWithClasses,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { classes } = props

    const classesList = useStyles()
    const mergedProps = React.useMemo(
      () => ({
        ...(notificationContainerDefaultProps as NotificationContainerPropsWithClasses),
        ...props,
      }),
      [props]
    )

    const classesMap = useClassList(classesList, classes)

    const { notificationsToRender, isNotificationActive } =
      useNotificationContainer(mergedProps)

    const renderNotifications = (notifications: NotificationsToRender) => {
      let position: keyof NotificationsToRender

      for (position in notifications) {
        // eslint-disable-next-line no-prototype-builtins
        if (notifications.hasOwnProperty(position)) {
          const isTop = position.includes('top')
          const isCenter = position.includes('center')
          const isLeft = isCenter ? false : position.includes('left')

          let directionClassName = isLeft ? classesMap.left : classesMap.right

          if (isCenter) {
            directionClassName = classesMap.center
          }

          const className = clsx(
            classesMap.container,
            isTop ? classesMap.top : classesMap.bottom,
            directionClassName
          )

          return (
            <div key={position} className={className}>
              {notifications[position]?.map(({ content, props }) => (
                <Notification
                  role="alert"
                  {...props}
                  key={props.id}
                  isActive={isNotificationActive(props.id as string)}
                >
                  {content}
                </Notification>
              ))}
            </div>
          )
        }
      }
    }

    return (
      <div ref={ref} className={classesMap.root}>
        {renderNotifications(notificationsToRender)}
      </div>
    )
  }
)
