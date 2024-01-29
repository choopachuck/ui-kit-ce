import * as React from 'react'

interface IUseOpenStateProps {
  open?: boolean
  onStateChange?: (open: boolean) => void
}

export interface IUseOpenStateResult {
  open: boolean
  setOpen: (value: boolean, preventHandleFocus?: boolean) => void
}

export const useOpenState = ({
  open,
  onStateChange,
}: IUseOpenStateProps): IUseOpenStateResult => {
  const [openState, setOpenState] = React.useState(!!open)
  const previousFocusedElement = React.useRef<Element | null>(null)

  const handleFocus = (open: boolean) => {
    if (open) {
      previousFocusedElement.current = document.activeElement
    } else {
      ;(previousFocusedElement.current as HTMLElement)?.focus?.()
    }
  }

  React.useEffect(() => {
    if (open !== undefined && open !== openState) {
      handleFocus(open)
      setOpenState(open)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSetOpen = (value: boolean, preventHandleFocus?: boolean) => {
    if (openState !== value) {
      if (open === undefined) {
        if (!preventHandleFocus) {
          handleFocus(value)
        }
        setOpenState(value)
      }
      onStateChange?.(value)
    }
  }

  return {
    open: openState,
    setOpen: handleSetOpen,
  }
}
