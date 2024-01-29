import * as React from 'react'
import { IUseOpenStateResult } from './useOpenState'
import { useCommonHandleKeyDown } from './useHandleFocus'

interface IUseRangeHandleFocusProps {
  panelRef: React.RefObject<HTMLInputElement>
  compareInputRef: React.RefObject<HTMLInputElement>
  open: boolean
  setOpen: IUseOpenStateResult['setOpen']
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export interface IUseRangeHandleFocusResult {
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}

export const useRangeHandleFocus = ({
  panelRef,
  compareInputRef,
  open,
  setOpen,
  onKeyDown,
  onBlur,
}: IUseRangeHandleFocusProps): IUseRangeHandleFocusResult => {
  const handleKeyDown = useCommonHandleKeyDown({ panelRef, open, onKeyDown })

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      open &&
      event.relatedTarget &&
      event.relatedTarget !== compareInputRef.current &&
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
