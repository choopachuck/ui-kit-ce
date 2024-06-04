'use client'

import * as React from 'react'
import { UploaderBaseProps, UploaderFile } from './types'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useButtonAriaActionProps, useClassList } from '@v-uik/hooks'

import { filterFilesByAccept } from './utils'
import { isEvtWithFiles } from './utils/isEvtWithFiles'
import { DropzoneClasses } from './classes'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles((theme) => ({
  input: {
    display: 'none',
  },
  dropzone: {
    padding: 8,
    boxSizing: 'border-box',
    minHeight: 96,
    cursor: 'pointer',
    background: theme.comp.dropzone.colorBackground,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.comp.dropzone.contentColorText,

    borderTopRightRadius: theme.comp.dropzone.shapeBorderRadiusTopRight,
    borderTopLeftRadius: theme.comp.dropzone.shapeBorderRadiusTopLeft,
    borderBottomLeftRadius: theme.comp.dropzone.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.dropzone.shapeBorderRadiusBottomRight,

    fontFamily: theme.comp.dropzone.contentTypographyFontFamily,
    fontSize: theme.comp.dropzone.contentTypographyFontSize,
    lineHeight: theme.comp.dropzone.contentTypographyLineHeight,
    fontWeight: theme.comp.dropzone.contentTypographyFontWeight,
    letterSpacing: theme.comp.dropzone.contentTypographyLetterSpacing,

    position: 'relative',
    '&$disabled': {
      color: theme.comp.dropzone.contentColorTextDisabled,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,

      borderRadius: 'inherit',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: theme.comp.dropzone.colorBorder,
    },

    '&:focus': {
      outline: 'none',
    },

    '&:not($disabled):hover': {
      background: theme.comp.dropzone.colorBackgroundHover,
      '&::after': {
        borderColor: theme.comp.dropzone.colorBorderHover,
      },
    },
    '&:not($disabled):active': {
      background: theme.comp.dropzone.colorBackgroundActive,
      '&::after': {
        borderColor: theme.comp.dropzone.colorBorderActive,
      },
    },

    '&:not($disabled):focus-visible': {
      boxShadow: `0px 0px 0px 2px ${theme.comp.dropzone.colorShadowFocus}`,
      '&::after': {
        borderStyle: 'solid',
        borderColor: theme.comp.dropzone.colorBorderFocus,
      },
    },
  },
  dragEnter: {
    background: theme.comp.dropzone.colorBackgroundDragEnter,
    '&:not($disabled)::after': {
      borderColor: theme.comp.dropzone.colorBorderDragEnter,
    },
  },
  error: {
    '&:not($disabled)::after': {
      borderColor: theme.comp.dropzone.colorBorderError,
    },
  },
  disabled: {
    cursor: 'initial',
    '&::after': {
      borderColor: theme.comp.dropzone.colorBorderDisabled,
    },
  },
}))

const defaultElement = 'div'

export type DropzoneOwnProps = {
  /**
   * Обработчик события выбора файла
   * @param files
   * @param e
   */
  onUpload: (
    files: UploaderFile[],
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>
  ) => void
  /**
   * Dropzone содержит ошибку
   */
  error?: boolean
  children: React.ReactNode
  /**
   * Классы
   */
  classes?: DropzoneClasses
} & ComponentPropsWithRefFix<typeof defaultElement> &
  UploaderBaseProps

export type DropzoneProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, DropzoneOwnProps>

export const Dropzone = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      children,
      onUpload,
      inputProps,
      accept,
      disabled,
      multiple = true,
      error,
      as,
      ref,
      className: classNameProps,
      classes,
      onClick,
      onDragEnter,
      onDragLeave,
      onDrop,
      onDragOver,
      onKeyDown,
      onKeyUp,
      ...props
    }: DropzoneProps<E>,
    innerRef: typeof ref
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const inputRef = React.useRef<HTMLInputElement>(null)

    const [dragEnter, setDragEnter] = React.useState(false)

    const className = clsx(classNameProps, classesMap.dropzone, {
      [classesMap.dragEnter]: dragEnter,
      [classesMap.error]: error,
      [classesMap.disabled]: disabled,
    })
    const handleClick = React.useCallback(
      (event) => {
        inputRef.current?.click()
        onClick?.(event)
      },
      [onClick]
    )

    const handleInputClick: React.MouseEventHandler<HTMLInputElement> =
      React.useCallback(
        (e) => {
          e.stopPropagation()
          inputProps?.onClick?.(e)
        },
        [inputProps?.onClick]
      )

    const actionProps = useButtonAriaActionProps(
      handleClick,
      onKeyUp,
      onKeyDown
    )

    const handleDragEnter = React.useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (!isEvtWithFiles(event)) {
          return
        }

        setDragEnter(true)

        onDragEnter?.(event)
      },
      [onDragEnter]
    )

    const handleDragLeave = React.useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()

        setDragEnter(false)
        onDragLeave?.(event)
      },
      [onDragLeave]
    )

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
      React.useCallback(
        (event) => {
          event.preventDefault()
          if (!isEvtWithFiles(event)) {
            return
          }

          let newFiles: UploaderFile[] = Array.from(event.target.files!).map(
            (f) => ({ file: f })
          )

          if (!multiple) {
            newFiles = [newFiles[0]]
          }

          onUpload(newFiles, event)
          // для сброса файла https://stackoverflow.com/questions/19643265/second-use-of-input-file-doesnt-trigger-onchange-anymore
          event.target.value = ''
        },
        [onUpload, multiple]
      )

    const handleDrop = React.useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (!isEvtWithFiles(event)) {
          return
        }

        const filesArray = Array.from(event.dataTransfer.files)

        onUpload(
          filterFilesByAccept(multiple ? filesArray : [filesArray[0]], accept),
          event
        )

        setDragEnter(false)
        onDrop?.(event)
      },
      [onDrop, accept, onUpload, multiple]
    )

    const handleDragOver = React.useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()

        const hasFiles = isEvtWithFiles(event)
        if (hasFiles && event.dataTransfer) {
          setDragEnter(true)
          try {
            event.dataTransfer.dropEffect = 'copy'
          } catch {} /* eslint-disable-line no-empty */
        }

        onDragOver?.(event)

        return false
      },
      [onDragOver]
    )

    return (
      <Box
        as={as ?? defaultElement}
        tabIndex={!disabled ? 0 : -1}
        className={className}
        {...props}
        ref={innerRef}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        {...actionProps}
      >
        <input
          ref={inputRef}
          tabIndex={-1}
          className={classesMap.input}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          {...inputProps}
          onClick={handleInputClick}
        />
        {children}
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: DropzoneProps<E>
) => JSX.Element
