'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import {
  CheckboxGroupContext,
  CheckboxGroupContextValue,
} from '@v-uik/checkbox-group'
import { CheckedIcon, IndeterminateIcon } from './icons'
import type { Classes } from './classes'

const useStyles = createUseStyles((theme) => ({
  control: {
    width: 24,
    height: 24,
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',

    '&$disabled': {
      cursor: 'default',
    },
  },

  disabled: {},

  input: {
    position: 'absolute',
    cursor: 'pointer',
    opacity: 0,
    margin: 0,
    zIndex: 5,
    width: 21,
    height: 21,

    '&:disabled': {
      cursor: 'default',

      '&$inputChecked': {
        '& ~ $checkbox': {
          backgroundColor: theme.comp.checkbox.colorBackgroundCheckedDisabled,
          borderColor: theme.comp.checkbox.colorBorderCheckedDisabled,

          '& $checkboxIcon': {
            stroke:
              theme.comp.checkbox.colorMarkCheckedDisabled ||
              theme.comp.checkbox.iconColorTextCheckedDisabled,
          },
        },
      },

      '& ~ $checkbox': {
        backgroundColor: theme.comp.checkbox.colorBackgroundDisabled,
        borderColor: theme.comp.checkbox.colorBorderDisabled,
      },
    },

    '&:not(:disabled)': {
      '&:hover': {
        '& ~ $checkbox': {
          backgroundColor: theme.comp.checkbox.colorBackgroundHover,
          borderColor: theme.comp.checkbox.colorBorderHover,
        },
      },

      '&:hover:active': {
        '& ~ $checkbox': {
          backgroundColor: theme.comp.checkbox.colorBackgroundActive,
          borderColor: theme.comp.checkbox.colorBorderActive,
        },
      },

      '&:focus-visible': {
        '& ~ $checkbox': {
          zIndex: 2,
          boxShadow: `0 0 0 2px ${theme.comp.checkbox.colorShadowFocus}`,
        },
      },

      '&$inputChecked': {
        '& ~ $checkbox': {
          borderColor: theme.comp.checkbox.colorBorderChecked,
          backgroundColor: theme.comp.checkbox.colorBackgroundChecked,
          '& $checkboxIcon': {
            stroke:
              theme.comp.checkbox.colorMarkChecked ||
              theme.comp.checkbox.iconColorTextChecked,
          },
        },

        '&:hover': {
          '& ~ $checkbox': {
            borderColor: theme.comp.checkbox.colorBorderCheckedHover,
            backgroundColor: theme.comp.checkbox.colorBackgroundCheckedHover,
            '& $checkboxIcon': {
              stroke:
                theme.comp.checkbox.colorMarkCheckedHover ||
                theme.comp.checkbox.iconColorTextCheckedHover,
            },
          },
        },

        '&:hover:active': {
          '& ~ $checkbox': {
            borderColor: theme.comp.checkbox.colorBorderCheckedActive,
            backgroundColor: theme.comp.checkbox.colorBackgroundCheckedActive,
            '& $checkboxIcon': {
              stroke:
                theme.comp.checkbox.colorMarkCheckedActive ||
                theme.comp.checkbox.iconColorTextCheckedActive,
            },
          },
        },
      },
    },
  },

  inputChecked: {},

  indeterminate: {
    '& $input': {
      '& ~ $checkbox': {
        borderColor: theme.comp.checkbox.colorBorderIndeterminate,
        backgroundColor: theme.comp.checkbox.colorBackgroundIndeterminate,
        '& $checkboxIcon': {
          stroke:
            theme.comp.checkbox.colorMarkIndeterminate ||
            theme.comp.checkbox.iconColorTextIndeterminate,
        },
      },

      '&:disabled': {
        '& ~ $checkbox': {
          borderColor: theme.comp.checkbox.colorBorderIndeterminateDisabled,
          backgroundColor:
            theme.comp.checkbox.colorBackgroundIndeterminateDisabled,
          '& $checkboxIcon': {
            stroke:
              theme.comp.checkbox.colorMarkIndeterminateDisabled ||
              theme.comp.checkbox.iconColorTextIndeterminateDisabled,
          },
        },
      },

      '&:not(:disabled)': {
        '&:hover': {
          '& ~ $checkbox': {
            borderColor: theme.comp.checkbox.colorBorderIndeterminateHover,
            backgroundColor:
              theme.comp.checkbox.colorBackgroundIndeterminateHover,
            '& $checkboxIcon': {
              stroke:
                theme.comp.checkbox.colorMarkIndeterminateHover ||
                theme.comp.checkbox.iconColorTextIndeterminateHover,
            },
          },
        },

        '&:hover:active': {
          '& ~ $checkbox': {
            borderColor: theme.comp.checkbox.colorBorderIndeterminateActive,
            backgroundColor:
              theme.comp.checkbox.colorBackgroundIndeterminateActive,
            '& $checkboxIcon': {
              stroke:
                theme.comp.checkbox.colorMarkIndeterminateActive ||
                theme.comp.checkbox.iconColorTextIndeterminateActive,
            },
          },
        },
      },
    },
  },

  checkbox: {
    flexShrink: 0,
    width: 21,
    height: 21,
    boxSizing: 'border-box',
    backgroundColor: theme.comp.checkbox.colorBackground,
    zIndex: 1,
    position: 'relative',
    boxShadow: 'none',
    borderColor: theme.comp.checkbox.colorBorder,
    borderStyle: theme.shape.borderStyle,
    borderWidth: theme.shape.borderWidth,
    borderRadius: theme.shape.borderRadius,
    outline: theme.shape.outline,
  },

  checkboxIcon: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    strokeLinecap: 'round',
    strokeWidth: 2,
    stroke: theme.comp.checkbox.colorMark || theme.comp.checkbox.iconColorText,
    left: 0,
  },
}))

export interface CheckboxProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /**
   * Список классов
   */
  classes?: Partial<Classes>
  /**
   * Элемент выбран
   */
  checked?: boolean
  /**
   * Элемент отключен
   */
  disabled?: boolean
  /**
   * Неопределенное состояние чекбокса
   */
  indeterminate?: boolean
  /**
   * Атрибут name элемента input
   */
  name?: string
  /**
   * Обработчик, вызываемый при изменении состояния
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Свойства элемента input
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const Checkbox = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      checked: checkedProp,
      indeterminate,
      disabled: disabledProp,
      name,
      onChange: onChangeProp,
      inputProps,
      children,
      ...rest
    }: CheckboxProps,
    ref: React.Ref<HTMLLabelElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const checkboxGroupContext: CheckboxGroupContextValue =
      React.useContext(CheckboxGroupContext)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist()
      // https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return
      }
      if (onChangeProp) {
        onChangeProp(event)
      }
      if (checkboxGroupContext.onChange) {
        checkboxGroupContext.onChange(event)
      }
    }

    let checked = checkedProp
    const disabled = checkboxGroupContext.disabled || disabledProp

    if (typeof checked === 'undefined') {
      if (checkboxGroupContext.value && name) {
        checked = checkboxGroupContext.value.indexOf(name) >= 0
      }
    }

    const className = clsx(classesMap.control, classNameProp, {
      [classesMap.disabled]: disabled,
      [classesMap.indeterminate]: indeterminate,
      [classesMap.checked ?? '']: !indeterminate && checked,
    })

    const inputClassName = clsx(classesMap.input, {
      [classesMap.inputChecked]: !indeterminate && checked,
    })

    return (
      <span {...rest} ref={ref} className={className}>
        <input
          {...inputProps}
          className={inputClassName}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          name={name}
          onChange={onChange}
        />

        <span className={classesMap.checkbox}>
          {indeterminate && (
            <IndeterminateIcon className={classesMap.checkboxIcon} />
          )}
          {!indeterminate && checked && (
            <CheckedIcon className={classesMap.checkboxIcon} />
          )}
        </span>
      </span>
    )
  }
)
