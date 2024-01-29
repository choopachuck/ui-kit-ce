import React from 'react'

interface Props {
  isOpen: boolean
  setOpen: (v: boolean) => void
  inputRef: React.RefObject<HTMLDivElement>
}

export const useDropdownStateChange = ({
  isOpen,
  setOpen,
  inputRef,
}: Props): {
  onInputClick: () => void
  onDropdownStateChange: (value: boolean) => void
} => {
  const isInputClicked = React.useRef(false)

  const onDropdownStateChange = React.useCallback(
    (value: boolean) => {
      if (isInputClicked.current && isOpen) {
        isInputClicked.current = false

        return
      }
      setOpen(value)
      isInputClicked.current = false
    },
    [setOpen, isOpen]
  )

  const onInputClick = React.useCallback(() => {
    //клик может быть по иконке календаря, ставим фокус на инпут
    inputRef?.current?.focus()
    isInputClicked.current = true
  }, [])

  return {
    onInputClick,
    onDropdownStateChange,
  }
}
