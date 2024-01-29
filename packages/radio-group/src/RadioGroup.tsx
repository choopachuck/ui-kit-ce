'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList, useGeneratedId } from '@v-uik/hooks'
import { Direction } from '@v-uik/common'
import { InputLabel } from '@v-uik/input-label'
import { InputHelperText } from '@v-uik/input-helper-text'
import { createCtx } from './RadioGroupContext'
import { RadioGroupProps } from './interfaces'

const useStyles = createUseStyles({
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  radioGroup: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',

    '&$vertical': {
      flexDirection: 'column',
    },

    '& > *': {
      '&:not(:last-child)': {
        marginRight: 16,
      },
    },
  },

  vertical: {
    '& > *': {
      '&:not(:last-child)': {
        marginRight: 0,
        marginBottom: 8,
      },
    },
  },
})

export const [useCtx, RadioGroupContextProvider] = createCtx()

export const RadioGroup = <T extends string>({
  classes,
  className,
  direction = Direction.horizontal,
  label,
  labelProps,
  value,
  name,
  onChange,
  helperText,
  helperTextProps,
  disabled,
  error,
  children,
  ref,
  ...rest
}: RadioGroupProps<T> & { ref?: React.Ref<HTMLDivElement> }): JSX.Element => {
  const classesList = useStyles()
  const classesMap = useClassList(classesList, classes)
  const containerClassName = clsx(classesMap.container, className, {
    [classesMap.error ?? '']: error,
    [classesMap.disabled ?? '']: disabled,
  })
  const radioGroupClassName = clsx(classesMap.radioGroup, {
    [classesMap.vertical]: direction === Direction.vertical,
  })

  const groupLabelId = useGeneratedId(labelProps?.id)

  return (
    <div
      {...rest}
      ref={ref}
      className={containerClassName}
      role="group"
      aria-labelledby={groupLabelId}
    >
      {label && (
        <InputLabel {...labelProps} id={groupLabelId} disabled={disabled}>
          {label}
        </InputLabel>
      )}

      <div className={radioGroupClassName}>
        <RadioGroupContextProvider value={{ value, onChange, name, disabled }}>
          {children}
        </RadioGroupContextProvider>
      </div>

      {helperText && (
        <InputHelperText {...helperTextProps} disabled={disabled} error={error}>
          {helperText}
        </InputHelperText>
      )}
    </div>
  )
}
