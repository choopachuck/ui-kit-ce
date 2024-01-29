import * as React from 'react'
import { eventManager, Event } from './eventManager'
import {
  NotificationOptions,
  NotificationStatus,
  TNotificationStatus,
} from '../types'

const generateId = (): string => `v-uik-${Math.round(Math.random() * 1e10)}`

const emitNotification = (
  status: TNotificationStatus,
  content: React.ReactNode,
  options?: NotificationOptions
): string => {
  const id = options?.id || generateId()
  eventManager.emit(Event.Show, content, {
    ...options,
    status,
    id,
  })

  return id
}

const notification = (
  content: React.ReactNode,
  options?: NotificationOptions
): string =>
  emitNotification(
    options?.status || NotificationStatus.default,
    content,
    options
  )

notification.success = (
  content: React.ReactNode,
  options?: NotificationOptions
): string => emitNotification(NotificationStatus.success, content, options)

notification.info = (
  content: React.ReactNode,
  options?: NotificationOptions
): string => emitNotification(NotificationStatus.info, content, options)

notification.warning = (
  content: React.ReactNode,
  options?: NotificationOptions
): string => emitNotification(NotificationStatus.warning, content, options)

notification.error = (
  content: React.ReactNode,
  options?: NotificationOptions
): string => emitNotification(NotificationStatus.error, content, options)

notification.close = (id: string) => eventManager.emit(Event.Remove, id)

notification.closeAll = () => eventManager.emit(Event.ClearAll)

notification.clearWaitingQueue = () =>
  eventManager.emit(Event.ClearWaitingQueue)

export { notification }
