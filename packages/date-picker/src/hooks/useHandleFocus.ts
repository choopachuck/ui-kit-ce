import * as React from 'react'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { IUseOpenStateResult } from './useOpenState'

interface IUseHandleFocusProps {
  panelRef: React.RefObject<HTMLDivElement>
  open: boolean
  setOpen: IUseOpenStateResult['setOpen']
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export interface IUseHandleFocusResult {
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const useCommonHandleKeyDown = ({
  open,
  panelRef,
  onKeyDown,
}: Omit<
  IUseHandleFocusProps,
  'setOpen' | 'onBlur'
>): IUseHandleFocusResult['handleKeyDown'] => {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (open && isEqualKeyboardKeys('Tab', event.key) && !event.shiftKey) {
      event.preventDefault()
      const firstFocusableElement = panelRef.current?.querySelector(
        'input:not([disabled]),button:not([disabled])'
      )
      if (firstFocusableElement) {
        ;(firstFocusableElement as HTMLElement).focus?.()
      }
    }

    onKeyDown?.(event)
  }
}

export const useHandleFocus = ({
  panelRef,
  open,
  setOpen,
  onKeyDown,
  onBlur,
}: IUseHandleFocusProps): IUseHandleFocusResult => {
  const handleKeyDown = useCommonHandleKeyDown({ panelRef, open, onKeyDown })

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      open &&
      event.relatedTarget &&
      !panelRef.current?.contains(event.relatedTarget as Node)
    ) {
      setOpen(false, true)
    }

    onBlur?.(event)
  }

  return {
    handleKeyDown,
    handleBlur,
  }
}
