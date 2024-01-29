import * as React from 'react'
import {
  createPopper,
  VirtualElement,
  Placement,
  Modifier,
  Options,
  Instance,
} from '@popperjs/core'
import { useTheme, Theme } from '@v-uik/theme'
import { Portal, PortalProps } from '@v-uik/portal'
import { useMergedRefs } from '@v-uik/hooks'

export interface PopupProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * HTML-элемент или функция, возвращающая HTML-элемент, относительно которого рендерится Popup
   */
  anchor:
    | (() => HTMLElement | VirtualElement)
    | HTMLElement
    | VirtualElement
    | null
  /**
   * Расположение Popup
   */
  placement?: Placement
  /**
   * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится Popup
   */
  container?: PortalProps['container']
  /**
   * Отменить рендер попапа в контейнер и рендерить в текущем родителе
   */
  disablePortal?: boolean
  /**
   * Оставить элемент в DOM при закрытии
   */
  keepMounted?: boolean
  /**
   * Показать/скрыть попап
   */
  open?: boolean
  /**
   * Модификаторы экземпляра popper.js
   */
  modifiers?: Array<Partial<Modifier<string, { [key: string]: any }>>> // eslint-disable-line @typescript-eslint/no-explicit-any, max-len
  /**
   * Свойства экземпляра popper.js
   */
  popperOptions?: Partial<Options>
  /**
   * Ссылка на экземпляр popper.js
   */
  popperRef?: React.Ref<Instance>
}

export const Popup = React.forwardRef(
  (
    {
      anchor,
      children,
      container,
      disablePortal,
      keepMounted = false,
      modifiers,
      open,
      placement = 'bottom',
      popperOptions,
      popperRef: popperRefProp = null,
      style,
      ...rest
    }: PopupProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const theme = useTheme<Theme>()

    const popupRef = React.useRef<HTMLDivElement>(null)
    const ownRef = useMergedRefs([popupRef, ref])

    const popperRef = React.useRef<Instance>(null)
    const handlePopperRef = useMergedRefs<Instance>([popperRef, popperRefProp])
    const handlePopperRefRef = React.useRef(handlePopperRef)

    React.useEffect(() => {
      handlePopperRefRef.current = handlePopperRef
    }, [handlePopperRef])

    React.useImperativeHandle<Instance | null, Instance | null>(
      popperRefProp,
      () => popperRef.current,
      []
    )

    React.useEffect(() => {
      if (popperRef.current) {
        popperRef.current.forceUpdate()
      }
    })

    const handleOpen = React.useCallback(() => {
      if (!popupRef.current || !anchor || !open) {
        return
      }

      if (popperRef.current) {
        popperRef.current.destroy()
        handlePopperRefRef.current(null)
      }

      const popper = createPopper(
        typeof anchor === 'function' ? anchor() : anchor,
        popupRef.current,
        {
          placement,
          ...popperOptions,
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                altBoundary: disablePortal,
              },
            },
            {
              name: 'flip',
              options: {
                altBoundary: disablePortal,
              },
            },
            ...(modifiers || []),
            ...(popperOptions?.modifiers || []),
          ],
        }
      )

      handlePopperRefRef.current(popper)
    }, [anchor, disablePortal, modifiers, open, placement, popperOptions])

    const handleRef = React.useCallback(
      (node) => {
        ownRef(node)
        handleOpen()
      },
      [ownRef, handleOpen]
    )

    const handleClose = () => {
      if (!popperRef.current) {
        return
      }

      popperRef.current.destroy()
      handlePopperRefRef.current(null)
    }

    React.useEffect(() => {
      return () => {
        handleClose()
      }
    }, [])

    React.useEffect(() => {
      if (!open) {
        handleClose()
      }
    }, [open])

    if (!keepMounted && !open) {
      return null
    }

    const child = (
      <div
        ref={handleRef}
        role="tooltip"
        {...rest}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          display: !open && keepMounted ? 'none' : undefined,
          zIndex: theme.zIndex.popup,
          ...style,
        }}
      >
        {children}
      </div>
    )

    if (disablePortal) {
      return child
    }

    return <Portal container={container}>{child}</Portal>
  }
)
