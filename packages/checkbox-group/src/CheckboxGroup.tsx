'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList, useGeneratedId } from '@v-uik/hooks'
import { Direction } from '@v-uik/common'
import { InputLabel } from '@v-uik/input-label'
import { InputHelperText } from '@v-uik/input-helper-text'
import { CheckboxGroupContext } from './CheckboxGroupContext'
import { CheckboxGroupProps } from './interfaces'

const useStyles = createUseStyles({
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  checkboxGroup: {
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

export const CheckboxGroup = React.forwardRef(
  (
    {
      classes,
      className,
      direction = Direction.horizontal,
      label,
      labelProps,
      error,
      disabled,
      value = [],
      onChange,
      helperText,
      helperTextProps,
      children,
      ...rest
    }: CheckboxGroupProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const containerClassName = clsx(classesMap.container, className, {
      [classesMap?.error ?? '']: error,
      [classesMap?.disabled ?? '']: disabled,
    })

    const checkboxGroupClassName = clsx(classesMap.checkboxGroup, {
      [classesMap.vertical]: direction === Direction.vertical,
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.name) {
        if (onChange) {
          let newValue = [...value]
          if (event.target.checked) {
            newValue.push(event.target.name)
          } else {
            newValue = newValue.filter((value) => value !== event.target.name)
          }
          onChange(event, newValue)
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            [
              'v-uik: Вы забыли передать свойство `name` компоненту Checkbox',
              'Это свойство необходимо для использования внутри CheckboxGroup',
            ].join('\n')
          )
        }
      }
    }

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

        <div className={checkboxGroupClassName}>
          <CheckboxGroupContext.Provider
            value={{ value, onChange: handleChange, disabled }}
          >
            {children}
          </CheckboxGroupContext.Provider>
        </div>

        {helperText && (
          <InputHelperText
            {...helperTextProps}
            disabled={disabled}
            error={error}
          >
            {helperText}
          </InputHelperText>
        )}
      </div>
    )
  }
)
