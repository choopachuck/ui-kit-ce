'use client'

/* eslint-disable react/prop-types */ // TODO: косячит eslint при типизации пропсов компонента через дженерики React.forwardRef

import * as React from 'react'
import {
  getElementAttributes,
  getElementValue,
  getTagName,
  getApplicationLanguage,
  getBatteryLevel,
  getBrowser,
  getConnectionType,
  getPageName,
  getScreenSize,
  getSystemLanguage,
  getISOTime,
  getClickEventElement,
  getChangeEventElement,
  isForbiddenForElement,
} from './utils'
import {
  ClickStreamElementType,
  ClickStreamEventData,
  ClickStreamEventMeta,
  ClickStreamContextProps,
  ClickStreamProviderProps,
  ClickStreamEventBatch,
  ClickStreamEventBatchItem,
} from './types'
import {
  CLICK_STREAM_EVENTS,
  CLICK_STREAM_BATCH_SIZE,
  CLICK_STREAM_INACTIVITY_TIME,
} from './constants'

const EVENT_TYPE_TO_HANDLER_MAP: Record<
  string,
  (event: Event) => [ClickStreamElementType, HTMLElement]
> = {
  click: getClickEventElement,
  change: getChangeEventElement,
} as const

const generateBaseData = async () => ({
  url: window.location.href,
  batteryLevel: await getBatteryLevel(),
  connectionType: getConnectionType(),
  pageName: getPageName(),
  timeStamp: getISOTime(),
})

const makeProcessData =
  (elementType: ClickStreamElementType, element: HTMLElement) =>
  async (_: Event, elementEvent: string): Promise<ClickStreamEventData> => {
    const baseData = await generateBaseData()

    return {
      elementEvent,
      value: String(getElementValue(element)),
      elementType,
      elementTag: getTagName(element),
      elementAttributes: getElementAttributes(element),
      ...baseData,
    }
  }

const generateMeta = (): ClickStreamEventMeta => ({
  applicationLanguage: getApplicationLanguage(),
  browser: getBrowser(),
  platform: 'WEB',
  screenSize: getScreenSize(),
  systemLanguage: getSystemLanguage(),
  timeStamp: getISOTime(),
})

const processDispatchToBody = (
  dispatch: (
    event: Event,
    elementEvent?: string,
    immediate?: boolean
  ) => Promise<void>,
  strategy: 'add' | 'remove'
) => {
  const _dispatch = dispatch as ClickStreamContextProps['dispatchEvent']

  CLICK_STREAM_EVENTS.forEach((event) => {
    if (strategy === 'add') {
      document.body.addEventListener(event, _dispatch)
    }
    if (strategy === 'remove') {
      document.body.removeEventListener(event, _dispatch)
    }
  })
}

export type ClickStreamRef = Pick<ClickStreamContextProps, 'dispatchEvent'>

const ClickStreamContext = React.createContext({} as ClickStreamContextProps)

const _ClickStreamProvider = React.forwardRef<
  ClickStreamRef,
  React.PropsWithChildren<ClickStreamProviderProps>
>(
  (
    {
      onSendEvent,
      formatEventData: formatEventDataProp,
      disableAutoSendEvent,
      children,
      batchSize = CLICK_STREAM_BATCH_SIZE,
      onBatch,
      inactivityTime = CLICK_STREAM_INACTIVITY_TIME,
      onInit,
    },
    ref
  ): JSX.Element => {
    const batchRef =
      React.useRef<ClickStreamEventBatch<ClickStreamEventData> | null>([])

    const dispatchTimeout = React.useRef<ReturnType<typeof setTimeout>>()

    const debouncedDispatchEvent = React.useCallback(
      async (
        event: Event,
        elementEvent?: string,
        immediate = false,
        verify = true
      ) => {
        if (dispatchTimeout.current) {
          clearTimeout(dispatchTimeout.current)
        }

        if (!batchRef.current) {
          return
        }

        const [elementType, element] = (
          EVENT_TYPE_TO_HANDLER_MAP[event.type] || getClickEventElement
        )(event)

        if (verify && isForbiddenForElement(element, event.type)) {
          return
        }

        const formatEventData =
          formatEventDataProp || makeProcessData(elementType, element)

        const data = await Promise.resolve(
          formatEventData(event, elementEvent ?? event.type)
        )
        const newEventData: ClickStreamEventBatchItem = { event, data }
        const meta = generateMeta()

        onBatch?.(event, data, batchRef.current)

        // Если очередь событий достигла допустимого размера или событие отправлено с флагом `immediate`,
        // то сразу отправляем очередь пользователю, иначе оборачиваем отправку в отложенный вызов на
        // случай, если пользователь не достигнет допустипого размера очереди по истечению разрешенного
        // времени бездействия

        const releaseBatch = () => {
          if (!batchRef.current || !batchRef.current.length) {
            return
          }

          onSendEvent?.(batchRef.current, meta)
          batchRef.current = []
        }

        // Отложенный вызов делаем только в том случае, если `inactivityTime` является
        // неотрицательным числом. Специальные значения, такие как `NaN`, `Infinity`
        // отключают отложенный вызов
        if (Number.isFinite(inactivityTime) && Math.sign(inactivityTime) >= 0) {
          dispatchTimeout.current = setTimeout(releaseBatch, inactivityTime)
        }

        if (immediate) {
          onSendEvent?.([newEventData], meta)

          return
        }

        batchRef.current.push(newEventData)

        if (batchSize === batchRef.current.length) {
          releaseBatch()
        }
      },
      [formatEventDataProp, onSendEvent, batchSize, onBatch, inactivityTime]
    )

    const value = React.useMemo<ClickStreamContextProps>(
      () => ({
        dispatchEvent: (
          event: Event,
          elementEvent?: string,
          immediate?: boolean
        ) => debouncedDispatchEvent(event, elementEvent, immediate, false),
      }),
      [debouncedDispatchEvent]
    )

    React.useEffect(() => {
      if (disableAutoSendEvent) {
        return
      }
      const dispatchClickStreamEvent = async (event: Event) => {
        await debouncedDispatchEvent(event, event.type)
      }

      processDispatchToBody(dispatchClickStreamEvent, 'add')

      return () => {
        processDispatchToBody(dispatchClickStreamEvent, 'remove')
      }
    }, [debouncedDispatchEvent, disableAutoSendEvent])

    React.useImperativeHandle(
      ref,
      () => ({
        dispatchEvent: value.dispatchEvent,
      }),
      [value.dispatchEvent]
    )

    React.useEffect(() => {
      //eslint-disable-next-line no-void
      void (async () => {
        const baseData = await generateBaseData()

        onInit?.(baseData, generateMeta())
      })()
    }, [onInit])

    return (
      <ClickStreamContext.Provider value={value}>
        {children}
      </ClickStreamContext.Provider>
    )
  }
)

export const ClickStreamProvider = _ClickStreamProvider as <
  TData extends unknown = ClickStreamEventData
>(
  props: React.PropsWithChildren<ClickStreamProviderProps<TData>> & {
    ref?: React.ForwardedRef<ClickStreamRef>
  },
  ref: React.ForwardedRef<ClickStreamRef>
) => JSX.Element

export const useClickStreamContext = (): ClickStreamContextProps => {
  const clickStreamContext = React.useContext(ClickStreamContext)

  if (!clickStreamContext) {
    throw new Error(
      'ClickStream context must be in ClickStream context provider!'
    )
  }

  return clickStreamContext
}
