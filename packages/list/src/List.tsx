import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { ElementSize, ElementSizeType } from '@v-uik/common'
import { useMergedRefs } from '@v-uik/hooks'
import { ListContext, ListContextValue } from './ListContext'
import { scrollElement } from './utils/scrollListToOption'
import { isEqualKeyboardKeys, includesKeyboardKey } from '@v-uik/utils'
import { useListStyles } from './styles'
import { DATA_TYPE_GROUP } from './ListItemGroup'

const ARROWS_KEYS = ['ArrowUp', 'ArrowDown']

export type ListOwnProps = {
  /**
   * Размер элементов списка
   */
  size?: ElementSizeType
  /**
   * Сделать список интерактивным
   */
  interactive?: boolean
  /**
   * @internal
   * Получить активный элемент списка
   */
  getActiveElement?: () => HTMLElement | null
  /**
   * Между опций отображается разделитель
   */
  stripe?: boolean
}

const defaultElement = 'ul'

const getTabIndex = (
  interactive: boolean | undefined,
  isActive: boolean
): number | undefined => {
  if (interactive) {
    return isActive ? -1 : 0
  }

  return undefined
}

export type ListProps<E extends React.ElementType> = PolymorphicComponentProps<
  E,
  ListOwnProps
>

export const List = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      className: classNameProp,
      size = ElementSize.md,
      interactive,
      getActiveElement,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onKeyDown: onKeyDownProp,
      children,
      stripe,
      ...rest
    }: ListProps<E>,
    ref: typeof rest.ref
  ) => {
    const classesList = useListStyles()
    const className = clsx(classesList.list, classNameProp)

    const [isActive, setIsActive] = React.useState(false)

    const listRef = React.useRef<HTMLElement | null>(null)
    const selectedItemRef = React.useRef<HTMLElement | null>(null)

    const mergedListRef = useMergedRefs([listRef, ref])

    const listContextValue = React.useMemo<ListContextValue>(
      () => ({
        size,
        interactive,
        selectedItemRef,
        stripe,
      }),
      [size, interactive, stripe]
    )

    const scrollListToOption = (element: HTMLElement) => {
      const list = listRef.current
      if (list && list.scrollHeight > list.clientHeight) {
        const listPadding = parseFloat(
          window.getComputedStyle(list).getPropertyValue('padding-top') || '0'
        )
        scrollElement(listRef.current, element, listPadding)
      }
    }

    const focusFirstItem = () => {
      const focusableElement = listRef.current?.querySelector(
        '[tabindex]:not([aria-disabled="true"])'
      )
      if (focusableElement) {
        ;(focusableElement as HTMLElement).focus?.()
      }
    }

    const findFocusableSibling = (
      element: HTMLElement,
      previous = false
    ): HTMLElement | null => {
      const sibling = previous
        ? (element.previousElementSibling as HTMLElement)
        : (element.nextElementSibling as HTMLElement)

      if (sibling) {
        if (sibling.getAttribute('aria-disabled') !== 'true') {
          return sibling
        } else {
          return findFocusableSibling(sibling, previous)
        }
      }

      const parentNode = element.parentElement

      // Условие для навигации с учетом ListItemGroup
      if (parentNode && parentNode.dataset.type === DATA_TYPE_GROUP) {
        const parentSibling = previous
          ? (parentNode.previousElementSibling as HTMLElement)
          : (parentNode.nextElementSibling as HTMLElement)

        if (!parentSibling) {
          return null
        }

        const result = (
          previous ? parentSibling.lastElementChild : parentSibling.children[1]
        ) as HTMLElement

        return result || null
      }

      return null
    }

    const findLastFocusableSibling = (
      element: HTMLElement,
      previous = false
    ): HTMLElement | null => {
      let lastSibling: HTMLElement | null = null
      let currentSibling = findFocusableSibling(element, previous)

      while (currentSibling) {
        lastSibling = currentSibling
        currentSibling = findFocusableSibling(currentSibling, previous)
      }

      return lastSibling
    }

    const focusSibling = (previous = false) => {
      const currentFocusedItem =
        getActiveElement?.() ?? (document.activeElement as HTMLElement)
      if (currentFocusedItem) {
        const sibling = findFocusableSibling(currentFocusedItem, previous)
        if (sibling) {
          scrollListToOption(sibling)
          sibling.focus()
        } else {
          const lastFocusableSibling = findLastFocusableSibling(
            currentFocusedItem,
            !previous
          )
          lastFocusableSibling?.focus()
        }
      }
    }

    const onFocus = (event: React.FocusEvent<HTMLElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onFocusProp?.(event)
      setIsActive(true)

      if (event.target !== event.currentTarget) {
        return
      }

      //если фокус произошел не самому List
      if (selectedItemRef?.current) {
        selectedItemRef.current.focus()
      } else {
        focusFirstItem()
      }
    }

    const onBlur = (event: React.FocusEvent<HTMLElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onBlurProp?.(event)

      if (isActive && !listRef.current?.contains(event.relatedTarget as Node)) {
        setIsActive(false)
      }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onKeyDownProp?.(event)

      if (includesKeyboardKey(ARROWS_KEYS, event.key)) {
        event.preventDefault()
        event.stopPropagation()
        focusSibling(isEqualKeyboardKeys('ArrowUp', event.key))
      }
    }

    return (
      <Box
        ref={mergedListRef}
        as={defaultElement}
        role={interactive ? 'menu' : undefined}
        tabIndex={getTabIndex(interactive, isActive)}
        {...rest}
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <ListContext.Provider value={listContextValue}>
          {children}
        </ListContext.Provider>
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: ListProps<E>
) => JSX.Element
