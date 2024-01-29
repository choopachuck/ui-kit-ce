import * as React from 'react'
import { NotificationProps } from '../types'

export enum Event {
  Show = 'Show',
  Remove = 'Remove',
  ClearAll = 'ClearAll',
  ClearWaitingQueue = 'ClearWaitingQueue',
}

type OnShowCallback = (
  content: React.ReactNode,
  options: NotificationProps
) => void
type OnRemoveCallback = (id: string) => void
type OnClearAllCallback = () => void
type OnClearWaitingQueue = () => void
type OnChangeCallback = (id: string) => void
type Callback =
  | OnShowCallback
  | OnRemoveCallback
  | OnClearAllCallback
  | OnClearWaitingQueue
  | OnChangeCallback

export interface EventManager {
  eventList: Map<Event, Callback[]>
  eventEmitQueue: Map<Event, Array<ReturnType<typeof setTimeout>>>
  on(event: Event.Show, callback: OnShowCallback): EventManager
  on(event: Event.Remove, callback: OnRemoveCallback): EventManager
  on(event: Event.ClearAll, callback: OnClearAllCallback): EventManager
  on(
    event: Event.ClearWaitingQueue,
    callback: OnClearWaitingQueue
  ): EventManager
  off(event: Event, callback?: Callback): EventManager
  cancelEmit(event: Event): EventManager
  emit(event: Event.Show, content: React.ReactNode, options: unknown): void
  emit(event: Event.Remove, id: string): void
  emit(event: Event.ClearAll): void
  emit(event: Event.ClearWaitingQueue): void
}

export const eventManager: EventManager = {
  eventList: new Map(),
  eventEmitQueue: new Map(),

  on(event: Event, callback: Callback) {
    if (!this.eventList.has(event)) {
      this.eventList.set(event, [])
    }
    this.eventList.get(event)?.push(callback)

    return this
  },

  off(event: Event, callback?: Callback) {
    if (callback) {
      const newCallbacks = this.eventList
        .get(event)
        ?.filter((cb) => cb !== callback)
      this.eventList.set(event, newCallbacks ?? [])
    } else {
      this.eventList.delete(event)
    }

    return this
  },

  cancelEmit(event) {
    const timeoutIds = this.eventEmitQueue.get(event)
    if (timeoutIds) {
      timeoutIds.forEach(clearTimeout)
      this.eventEmitQueue.delete(event)
    }

    return this
  },

  emit(event: Event, ...args: unknown[]) {
    this.eventList.get(event)?.forEach((callback: Callback) => {
      const timeoutId = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(...args)
      }, 0)

      if (!this.eventEmitQueue.has(event)) {
        this.eventEmitQueue.set(event, [])
      }
      this.eventEmitQueue.get(event)?.push(timeoutId)
    })
  },
}
