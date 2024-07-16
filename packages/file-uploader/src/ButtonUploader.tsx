'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { UploaderBaseProps, UploaderFile } from './types'
import { Button as BaseButton, ButtonProps } from '@v-uik/button'
import { filterFilesByAccept } from './utils'

const useStyles = createUseStyles({
  input: {
    display: 'none',
  },
})

export interface ButtonUploaderProps
  extends UploaderBaseProps,
    Omit<ButtonProps, 'onError'> {
  /**
   * Калбек выбора файла Выбор файла
   */
  onUpload: (
    files: UploaderFile[],
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  components?: {
    Button?: React.ForwardRefExoticComponent<
      ButtonProps & React.RefAttributes<HTMLButtonElement>
    >
  }
}

export const ButtonUploader = React.forwardRef(
  (
    {
      inputProps,
      multiple = true,
      disabled = false,
      accept,
      children,
      onClick,
      onUpload,
      components = { Button: BaseButton },
      ...rest
    }: ButtonUploaderProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const Button = components.Button as React.ForwardRefExoticComponent<
      ButtonProps & React.RefAttributes<HTMLButtonElement>
    >
    const classesList = useStyles()

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
      React.useCallback(
        (e) => {
          e.preventDefault()
          if (!e.target.files || !e.target.files.length) {
            return
          }

          let newFiles: File[] = Array.from(e.target.files)

          if (!multiple) {
            newFiles = [newFiles[0]]
          }

          onUpload(filterFilesByAccept(newFiles, accept), e)
          // для сброса файла https://stackoverflow.com/questions/19643265/second-use-of-input-file-doesnt-trigger-onchange-anymore
          e.target.value = ''
        },
        [onUpload, multiple, accept]
      )

    const handleButtonClick = React.useCallback(
      (e) => {
        if (!inputRef.current) {
          return
        }

        inputRef.current.click()
        onClick?.(e)
      },
      [onClick]
    )

    return (
      <>
        <input
          ref={inputRef}
          className={clsx(classesList.input, inputProps?.className)}
          multiple={multiple}
          accept={accept}
          type="file"
          disabled={disabled}
          onChange={handleInputChange}
          {...inputProps}
        />
        <Button
          ref={ref}
          disabled={disabled}
          onClick={handleButtonClick}
          {...rest}
        >
          {children}
        </Button>
      </>
    )
  }
)
