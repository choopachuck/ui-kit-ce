import * as React from 'react'
import { eventManager, Event } from '../core/eventManager'
import {
  NotificationContainerProps,
  TNotificationPosition,
  NotificationProps,
  NotificationObject,
} from '../types'
import { mergeClasses } from '@v-uik/utils'
import { clsx } from '@v-uik/theme'

type NotificationByIdMap = Record<string, NotificationObject>
export type NotificationsToRender = Partial<
  Record<TNotificationPosition, NotificationObject[]>
>

export interface UseNotificationContainerValue {
  notificationsToRender: NotificationsToRender
  isNotificationActive: (id: string) => boolean
}

export const useNotificationContainer = (
  props: NotificationContainerProps
): UseNotificationContainerValue => {
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0)
  const [showingNotificationIds, setShowingNotificationIds] = React.useState<
    string[]
  >([])

  let notificationsCount = React.useRef(0).current
  let notificationsQueue = React.useRef<NotificationObject[]>([]).current
  const notificationByIdMap = React.useRef<NotificationByIdMap>({}).current

  const propsRef = React.useRef(props)

  React.useEffect(() => {
    propsRef.current = props
  })

  const isNotificationActive = (id: string) => {
    return showingNotificationIds.includes(id)
  }

  React.useEffect(() => {
    const clearWaitingQueue = () => {
      if (propsRef.current.limit) {
        notificationsCount -= notificationsQueue.length
        notificationsQueue = []
      }
    }

    const appendNotification = (
      content: React.ReactNode,
      props: NotificationProps
    ) => {
      if (props.id) {
        notificationByIdMap[props.id] = {
          content,
          props,
        }

        setShowingNotificationIds((prevState) => [
          ...prevState,
          props.id as string,
        ])
      }
    }

    const removeNotification = (notificationId: string) => {
      setShowingNotificationIds((prevState) =>
        prevState.filter((id) => id !== notificationId)
      )
    }

    const removeAllNotifications = () => {
      setShowingNotificationIds([])
    }

    const removeCompletelyFromStore = (notificationId: string) => {
      delete notificationByIdMap[notificationId]
      notificationsCount = (notificationsCount || 1) - 1

      if (notificationsQueue.length) {
        dequeueNotification()
      } else {
        forceUpdate()
      }
    }

    const dequeueNotification = () => {
      const notification = notificationsQueue.shift()
      if (notification) {
        appendNotification(notification.content, notification.props)
      }
    }

    const createNotification = (
      content: React.ReactNode,
      options: NotificationProps
    ) => {
      const { id } = options

      if (id && notificationByIdMap[id]) {
        return
      }

      notificationsCount++

      const closeNotification = () => removeNotification(id as string)

      const notificationProps: NotificationProps = {
        ...options,
        closeNotification,
        position: options.position || propsRef.current.position,
        classes: mergeClasses({
          classes1: propsRef.current.notificationClasses || {},
          classes2: options.classes || {},
          mergeCallback: clsx,
        }),
        closeButtonProps:
          options.closeButtonProps || propsRef.current.closeButtonProps,
        nextNotification:
          options.nextNotification || propsRef.current.nextNotification,
        closeButtonAriaLabel:
          options.closeButtonAriaLabel || propsRef.current.closeButtonAriaLabel,
        closeOnEscapeKeyDown:
          typeof options.closeOnEscapeKeyDown === 'boolean'
            ? options.closeOnEscapeKeyDown
            : propsRef.current.closeOnEscapeKeyDown,
        pauseOnHover:
          typeof options.pauseOnHover === 'boolean'
            ? options.pauseOnHover
            : propsRef.current.pauseOnHover,
        pauseOnWindowBlur:
          typeof options.pauseOnWindowBlur === 'boolean'
            ? options.pauseOnWindowBlur
            : propsRef.current.pauseOnWindowBlur,
        closeOnClick:
          typeof options.closeOnClick === 'boolean'
            ? options.closeOnClick
            : propsRef.current.closeOnClick,
        autoClose:
          options.autoClose !== undefined
            ? options.autoClose
            : propsRef.current.autoClose,
        showCloseButton:
          typeof options.showCloseButton === 'boolean'
            ? options.showCloseButton
            : propsRef.current.showCloseButton,
        showIndicator:
          typeof options.showIndicator === 'boolean'
            ? options.showIndicator
            : propsRef.current.showIndicator,
        removeNotification: () =>
          removeCompletelyFromStore(options.id as string),
      }

      let notificationContent = content

      if (React.isValidElement(content) && typeof content.type !== 'string') {
        notificationContent = React.cloneElement(content, {
          closeNotification,
          notificationProps,
        })
      }

      const limit = propsRef.current.limit

      if (limit && limit > 0 && notificationsCount > limit) {
        notificationsQueue.push({
          content: notificationContent,
          props: notificationProps,
        })
      } else {
        appendNotification(notificationContent, notificationProps)
      }
    }

    eventManager
      .on(Event.Show, createNotification)
      .on(Event.Remove, removeNotification)
      .on(Event.ClearAll, removeAllNotifications)
      .on(Event.ClearWaitingQueue, clearWaitingQueue)

    return () => {
      eventManager
        .off(Event.Show, createNotification)
        .off(Event.Remove, removeNotification)
        .off(Event.ClearAll, removeAllNotifications)
        .off(Event.ClearWaitingQueue, clearWaitingQueue)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const notificationsToRender: NotificationsToRender = {}

  const notificationsIds = Object.keys(notificationByIdMap)
  notificationsIds.forEach((id) => {
    const notification = notificationByIdMap[id]
    const { position } = notification.props

    if (position) {
      if (!notificationsToRender[position]) {
        notificationsToRender[position] = []
      }
      notificationsToRender[position]?.push(notification)
    }
  })

  return {
    notificationsToRender,
    isNotificationActive,
  }
}
