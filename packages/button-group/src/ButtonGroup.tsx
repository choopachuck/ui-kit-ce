'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { ElementSize } from '@v-uik/common'
import { Button, ButtonProps, ButtonKinds, ButtonColor } from '@v-uik/button'
import { mergeClasses, warning } from '@v-uik/utils'
import { Classes } from './classes'

export const ButtonGroupKinds = {
  radio: 'radio',
  multi: 'multi',
} as const

export type TButtonGroupKinds = keyof typeof ButtonGroupKinds

type GetChildButtonOptions = { isFirst: boolean; isLast: boolean }

export interface ButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Тип группы
   * radio - можно выбрать только одно значение, multi - несколько значений
   */
  kind?: TButtonGroupKinds
  /**
   * Цветовая схема кнопок.
   */
  color?: Exclude<ButtonProps['color'], 'error'>
  /**
   * Размер кнопки
   */
  size?: ButtonProps['size']
  /**
   * Значение элемента
   */
  value?: string | string[]
  /**
   * Обработчик изменения значения
   */
  onChange?: (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string | string[]
  ) => void
  /**
   * Отключить все кнопки группы
   */
  disabled?: boolean
}

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'inline-flex',
  },

  button: {
    '&:focus-visible': {
      zIndex: 2,
    },
  },

  buttonMiddle: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: -1,
  },

  buttonFirst: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  buttonLast: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: -1,
  },

  selected: {},

  primary: {
    '&$outlined:not($selected)': {
      '&:focus-visible': {
        backgroundColor: 'transparent',
        color: theme.comp.button.colorTextOutlinedPrimary,

        '&:hover': {
          color: theme.comp.button.colorTextOutlinedPrimaryHover,
          backgroundColor:
            theme.comp.button.colorBackgroundOutlinedPrimaryHover,
        },
      },
    },

    '&$selected': {
      color: theme.comp.buttonGroup.colorTextPrimarySelected,
      backgroundColor: theme.comp.buttonGroup.colorBackgroundPrimarySelected,
    },
  },

  secondary: {
    '&$outlined:not($selected)': {
      '&:focus-visible': {
        backgroundColor: 'transparent',
        color: theme.comp.button.colorTextOutlinedSecondary,

        '&:hover': {
          color: theme.comp.button.colorTextOutlinedSecondaryHover,
          backgroundColor:
            theme.comp.button.colorBackgroundOutlinedSecondaryHover,
        },
      },
    },

    '&$selected': {
      color: theme.comp.buttonGroup.colorTextSecondarySelected,
      backgroundColor: theme.comp.buttonGroup.colorBackgroundSecondarySelected,
    },
  },
  outlined: {},
}))

export const ButtonGroup = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      color = ButtonColor.secondary,
      size = ElementSize.md,
      kind = ButtonGroupKinds.radio,
      disabled,
      value,
      onChange,
      children: childrenProp,
      ...rest
    }: ButtonGroupProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.container)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onChange) {
        const name = event.currentTarget.name
        if (name) {
          if (kind === ButtonGroupKinds.radio) {
            if (!value || value !== name) {
              onChange(event, name)
            }
          } else {
            let newValue: string[] = []
            if (Array.isArray(value)) {
              newValue = [...value]
            } else {
              if (value) {
                newValue = [value]
              }
            }
            if (newValue.indexOf(name) >= 0) {
              newValue = newValue.filter((value) => value !== name)
            } else {
              newValue.push(name)
            }
            onChange(event, newValue)
          }
        } else {
          warning(
            false,
            'ButtonGroup',
            'Вы забыли передать свойство `name` компоненту Button. Это свойство необходимо для использования внутри ButtonGroup'
          )
        }
      }
    }

    const getChildButtonProps = (
      childButton: React.ReactElement<ButtonProps>,
      { isFirst, isLast }: GetChildButtonOptions
    ) => {
      const name = childButton.props.name
      const isSelected =
        !!name &&
        (kind === ButtonGroupKinds.radio
          ? name === value
          : !!value && value.indexOf(name) >= 0)

      return {
        kind: ButtonKinds.outlined,
        color,
        size,
        disabled: disabled || childButton.props.disabled,
        className: clsx(childButton.props.className, classesMap.button, {
          [classesMap.selected]: isSelected,
          [classesMap.buttonFirst]: isFirst,
          [classesMap.buttonLast]: isLast,
          [classesMap.buttonMiddle]: !isFirst && !isLast,
        }),
        classes: mergeClasses({
          classes1: childButton.props.classes || {},
          classes2: classesMap,
          mergeCallback: clsx,
        }),
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          childButton.props.onClick?.(event)
          handleClick(event)
        },
      }
    }

    const childrenArray = React.Children.toArray(childrenProp)

    const children = childrenArray
      .map((item, index) => {
        if (React.isValidElement(item)) {
          const isFirst = index === 0
          const isLast = index === childrenArray.length - 1
          if (item.type === Button) {
            return React.cloneElement(
              item,
              getChildButtonProps(item, { isFirst, isLast })
            )
          }

          const childOfAChild = (
            item as React.ReactElement<{ children?: React.ReactElement }>
          ).props?.children
          const isNestedButton =
            !!childOfAChild && childOfAChild.type === Button

          if (isNestedButton) {
            return React.cloneElement(item, {
              children: React.cloneElement(
                childOfAChild as React.ReactElement<ButtonProps>,
                getChildButtonProps(
                  childOfAChild as React.ReactElement<ButtonProps>,
                  { isFirst, isLast }
                )
              ),
            })
          }
        }

        warning(
          false,
          'ButtonGroup',
          'В контекст компонента можно передавать только Button из @v-uik/button'
        )
      })
      .filter(Boolean)

    return (
      <div {...rest} ref={ref} className={className} role="group">
        {children}
      </div>
    )
  }
)
