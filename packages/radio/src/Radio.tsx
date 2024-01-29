'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { useCtx, RadioGroupContextValue } from '@v-uik/radio-group'
import { RadioCircleIcon, RadioMarkIcon } from './icons'
import { Classes } from './classes'

const defaultRadioWidth = 21
const defaultControlWidth = 24

const useStyles = createUseStyles((theme) => ({
  control: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: defaultControlWidth,
    width: defaultControlWidth,
    justifyContent: 'center',

    '&$disabled': {
      cursor: 'default',
    },
  },

  disabled: {},

  inputChecked: {},

  input: {
    width: defaultRadioWidth,
    height: defaultRadioWidth,
    opacity: 0,
    margin: 0,
    position: 'absolute',
    zIndex: 5,

    '&:disabled': {
      '&$inputChecked': {
        '& ~ $radio': {
          background: theme.comp.radio.colorBackgroundCheckedDisabled,
          color: theme.comp.radio.colorBorderCheckedDisabled,

          '& $radioMark': {
            color: theme.comp.radio.colorMarkDisabled,
          },
        },
      },
      '& ~ $radio': {
        backgroundColor: theme.comp.radio.next_colorBackgroundDisabled,
        color:
          theme.comp.radio.colorBorderDisabled ||
          theme.comp.radio.colorBackgroundDisabled,
        opacity: 1,
      },
    },

    '&:not(:disabled)': {
      '&$inputChecked': {
        '& + $radio': {
          backgroundColor: theme.comp.radio.colorBackgroundChecked,
          color:
            theme.comp.radio.colorBorderChecked ||
            theme.comp.radio.colorBackground,
        },
        '&:hover:not(:active)': {
          '& + $radio': {
            backgroundColor: theme.comp.radio.colorBackgroundCheckedHover,
            color: theme.comp.radio.colorBorderCheckedHover,

            '& $radioMark': {
              color: theme.comp.radio.colorMarkHover,
            },
          },
        },
        '&:active': {
          '& + $radio': {
            backgroundColor: theme.comp.radio.colorBackgroundCheckedActive,
            color: theme.comp.radio.colorBorderCheckedActive,

            '& $radioMark': {
              color: theme.comp.radio.colorMarkActive,
            },
          },
        },
      },
      '&:hover:not(:active)': {
        cursor: 'pointer',
        '& + $radio': {
          backgroundColor: theme.comp.radio.next_colorBackgroundHover,
          color:
            theme.comp.radio.colorBorderHover ||
            theme.comp.radio.colorBackgroundHover,
        },
      },

      '&:active': {
        cursor: 'pointer',

        '& + $radio': {
          zIndex: 2,
          color:
            theme.comp.radio.colorBorderActive ||
            theme.comp.radio.colorBackgroundActive,
          backgroundColor: theme.comp.radio.next_colorBackgroundActive,
        },
      },

      '&:focus-visible': {
        '& + $radio': {
          zIndex: 2,
          boxShadow: `0 0 0 2px ${theme.comp.radio.colorShadowFocus}`,
        },
      },
    },
  },

  radio: {
    background: theme.comp.radio.next_colorBackground,
    color: theme.comp.radio.colorBorder || theme.comp.radio.colorBackground,
    zIndex: 1,
    boxSizing: 'border-box',
    height: defaultRadioWidth,
    width: defaultRadioWidth,
    borderRadius: '50%',
  },

  radioMark: {
    color: theme.comp.radio.colorMark,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export interface RadioProps<T extends unknown = string>
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Показывает выбран ли компонент
   */
  checked?: boolean
  /**
   * Элемент отключен
   */
  disabled?: boolean
  /**
   * Свойства элемента input
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /**
   * Атрибут name элемента input
   */
  name?: string
  /**
   * Значение поля input
   */
  value?: T
  /**
   * Обработчик, вызываемый при изменении состояния
   */
  onChange?: (value: T, event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radio = <T extends string>({
  classes,
  className,
  checked: checkedProp,
  onChange: onChangeProp,
  name: nameProp,
  value: valueProp,
  disabled: disabledProp,
  inputProps,
  ref,
  ...rest
}: RadioProps<T> & { ref?: React.Ref<HTMLLabelElement> }): JSX.Element => {
  const classesList = useStyles()
  const classesMap = useClassList(classesList, classes)

  const radioGroupContext: RadioGroupContextValue<T> = useCtx()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    // https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return
    }
    if (onChangeProp) {
      onChangeProp(event.target.value as T, event)
    }
    if (radioGroupContext.onChange) {
      radioGroupContext.onChange(event.target.value as T, event)
    }
  }

  let checked = checkedProp
  let name = nameProp
  const disabled = radioGroupContext.disabled || disabledProp

  if (
    typeof checked === 'undefined' &&
    typeof radioGroupContext.value !== 'undefined'
  ) {
    checked = radioGroupContext.value === valueProp
  }

  if (typeof name === 'undefined') {
    name = radioGroupContext.name
  }

  const labelClassName = clsx(classesMap.control, className, {
    [classesMap.disabled]: disabled,
    [classesMap?.checked ?? '']: checked,
  })

  const inputClassName = clsx(classesMap.input, {
    [classesMap.inputChecked]: checked,
  })

  return (
    <span {...rest} ref={ref} className={labelClassName}>
      <input
        {...inputProps}
        checked={checked}
        type="radio"
        className={inputClassName}
        disabled={disabled}
        name={name}
        value={String(valueProp)}
        onChange={onChange}
      />
      <span className={classesMap.radio}>
        <RadioCircleIcon />
        {checked && (
          <span className={classesMap.radioMark}>
            <RadioMarkIcon />
          </span>
        )}
      </span>
    </span>
  )
}
