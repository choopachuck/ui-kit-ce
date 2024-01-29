import * as React from 'react'
import {
  mergeRefs,
  isEqualKeyboardKeys,
  includesKeyboardKey,
} from '@v-uik/utils'
import { useMergedRefs, useValue } from '@v-uik/hooks'
import { Popup, PopupProps } from '@v-uik/popup'
import { VirtualElement } from '@popperjs/core'

const SUBMIT_KEYS = ['Space', 'Enter']

export const DropdownTriggerType = {
  hover: 'hover',
  click: 'click',
  contextMenu: 'contextMenu',
} as const

export type TDropdownTriggerType = keyof typeof DropdownTriggerType

export interface DropdownProps extends Partial<PopupProps> {
  /**
   * Тип события, по которому срабатывает триггер
   */
  action?: TDropdownTriggerType | TDropdownTriggerType[]
  /**
   * Содержимое дропдауна
   */
  content?: React.ReactNode
  /**
   * Задержка при открытии с hover (в миллисекундах)
   */
  mouseEnterDelay?: number
  /**
   * Задержка при закрытии с hover (в миллисекундах)
   */
  mouseLeaveDelay?: number
  /**
   * Обработчик изменения состояния открытия/закрытия
   */
  onStateChange?: (open: boolean) => void
  /**
   * HTML-элемент, который будет триггером
   */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
}

export const Dropdown = React.forwardRef(
  (
    {
      action = DropdownTriggerType.click,
      anchor,
      content,
      children,
      open: openProp,
      mouseEnterDelay = 100,
      mouseLeaveDelay = 150,
      onStateChange,
      ...rest
    }: DropdownProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const triggerRef = React.useRef<HTMLElement | null>(null)
    const popupRef = React.useRef<HTMLDivElement | null>(null)

    const mergedPopupRef = useMergedRefs([ref, popupRef])

    const delayTimeout = React.useRef<ReturnType<typeof setTimeout>>()

    const [open, setOpen] = useValue(openProp)
    const [virtualElement, setVirtualElement] =
      React.useState<VirtualElement | null>(null)

    const isHoverAction = action.includes(DropdownTriggerType.hover)
    const isClickAction = action.includes(DropdownTriggerType.click)
    const isContextMenuAction = action.includes(DropdownTriggerType.contextMenu)
    const contextOnly = isContextMenuAction && !isClickAction && !isHoverAction

    const clearDelayTimeout = () => {
      if (delayTimeout.current) {
        clearTimeout(delayTimeout.current)
        delayTimeout.current = undefined
      }
    }

    const handleSetOpen = (value: boolean) => {
      clearDelayTimeout()

      if (open !== value) {
        setOpen(value)

        onStateChange?.(value)
      }
    }

    const outsideClickCloseHandler = (event: Event) => {
      if (
        (!triggerRef.current?.contains(event.target as Node) || contextOnly) &&
        !popupRef.current?.contains(event.target as Node)
      ) {
        handleSetOpen(false)
      }
    }

    const outsideScrollCloseHandler = () => {
      handleSetOpen(false)
    }

    React.useEffect(() => {
      if (open) {
        if (isClickAction || isContextMenuAction) {
          document.addEventListener('mousedown', outsideClickCloseHandler)
        }

        document.addEventListener('touchstart', outsideClickCloseHandler)

        if (isContextMenuAction) {
          document.addEventListener('scroll', outsideScrollCloseHandler)
        }
      }

      return () => {
        document.removeEventListener('mousedown', outsideClickCloseHandler)
        document.removeEventListener('touchstart', outsideClickCloseHandler)
        document.removeEventListener('scroll', outsideClickCloseHandler)
      }
    }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

    const setDelayedOpen = (value: boolean, delay?: number) => {
      clearDelayTimeout()

      if (delay) {
        delayTimeout.current = setTimeout(() => {
          handleSetOpen(value)
        }, delay)
      } else {
        handleSetOpen(value)
      }
    }

    const onPopupMouseEnter = () => {
      clearDelayTimeout()
    }

    const onPopupMouseLeave = (event: React.MouseEvent) => {
      if (
        event.relatedTarget &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        !event.relatedTarget.setTimeout && // window can be relatedTarget
        popupRef.current?.contains(event.relatedTarget as Node)
      ) {
        return
      }

      setDelayedOpen(false, mouseLeaveDelay)
    }

    const onContextMenu = (event: React.MouseEvent<HTMLElement>) => {
      event.persist()
      event.preventDefault()
      children?.props?.onContextMenu?.(event)
      setVirtualElement({
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          top: event.pageY,
          left: event.pageX,
          right: event.pageX,
          bottom: event.pageY,
        }),
      })
      handleSetOpen(true)
    }

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault()
      children?.props?.onClick?.(event)
      handleSetOpen(!open)
    }

    const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault()
      children?.props?.onMouseEnter?.(event)
      setDelayedOpen(true, mouseEnterDelay)
    }

    const onMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault()
      children?.props?.onMouseLeave?.(event)
      setDelayedOpen(false, mouseLeaveDelay)
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      children?.props?.onKeyDown?.(event)

      if (includesKeyboardKey(SUBMIT_KEYS, event.key)) {
        event.preventDefault()
        handleSetOpen(!open)
      }

      if (isEqualKeyboardKeys('Escape', event.key)) {
        event.preventDefault()
        handleSetOpen(false)
      }
    }

    const child = React.Children.only(children)

    const newChildProps: React.HTMLAttributes<HTMLElement> & {
      key: string
      ref: React.Ref<HTMLElement>
    } = {
      key: 'trigger',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref: mergeRefs([triggerRef, child.ref]),
    }

    if (isContextMenuAction) {
      newChildProps.onContextMenu = onContextMenu
    }
    if (isClickAction) {
      newChildProps.onClick = onClick
      newChildProps.onKeyDown = onKeyDown
    }
    if (isHoverAction) {
      newChildProps.onMouseEnter = onMouseEnter
      newChildProps.onMouseLeave = onMouseLeave
      newChildProps.onKeyDown = onKeyDown
    }

    const getAnchor = (): PopupProps['anchor'] => {
      if (contextOnly) {
        return virtualElement
      }

      return anchor || triggerRef.current
    }

    const trigger = React.cloneElement(child, newChildProps)

    return (
      <>
        {trigger}

        <Popup
          {...rest}
          key="portal"
          ref={mergedPopupRef}
          open={open}
          anchor={getAnchor()}
          onMouseEnter={isHoverAction ? onPopupMouseEnter : undefined}
          onMouseLeave={isHoverAction ? onPopupMouseLeave : undefined}
        >
          {content}
        </Popup>
      </>
    )
  }
)
