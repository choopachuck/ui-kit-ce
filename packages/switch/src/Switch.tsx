'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { ElementSize, ElementSizeType } from '@v-uik/common'
import { Classes } from './interfaces'

const defaultWidth = 48
const defaultHeight = 24
const defaultBorderWidth = 1
const defaultHandleOffset = 1
const defaultHandleWidth =
  defaultHeight - 2 * defaultBorderWidth - 2 * defaultHandleOffset

const smallWidth = 32
const smallHeight = 16
const smallHandleWidth =
  smallHeight - 2 * defaultBorderWidth - 2 * defaultHandleOffset

const useStyles = createUseStyles((theme) => ({
  control: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',

    '&:hover $switch': {
      backgroundColor: theme.comp.switch.colorBackgroundHover,
    },
  },

  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
  },

  small: {
    '& $switch': {
      width: smallWidth,
      height: smallHeight,
    },

    '& $input': {
      width: smallWidth,

      '&:checked': {
        '& ~ $switch': {
          '& $thumb': {
            left:
              smallWidth -
              2 * defaultBorderWidth -
              defaultHandleOffset -
              smallHandleWidth,
          },
        },

        '&:active ~ $switch': {
          '& $thumb': {
            left:
              smallWidth -
              2 * defaultBorderWidth -
              defaultHandleOffset -
              smallHandleWidth -
              2,
          },
        },
      },
    },

    '& $thumb': {
      width: smallHandleWidth,
      height: smallHandleWidth,
    },
  },

  input: {
    position: 'absolute',
    cursor: 'pointer',
    width: defaultWidth,
    height: '100%',
    opacity: 0,
    margin: 0,
    left: 0,
    top: 0,
    zIndex: 2,

    /**
     * Normal (not Checked)
     */
    '& ~ $switch': {
      backgroundColor: theme.comp.switch.colorBackground,

      '& $thumb': {
        backgroundColor: theme.comp.switch.thumbColorBackground,
      },
    },

    /**
     * Disabled
     */
    '&:disabled': {
      cursor: 'default',
    },
    '&:disabled ~ $switch, &:disabled:checked ~ $switch': {
      backgroundColor: theme.comp.switch.colorBackgroundDisabled,

      '& $thumb': {
        backgroundColor: theme.comp.switch.thumbColorBackgroundDisabled,
      },
    },

    /**
     * Active
     */
    '&:active ~ $switch': {
      '& $thumb': {
        left: defaultHandleOffset + 2,
      },
    },

    /**
     * Focus
     */
    '&:focus-visible:not(:disabled) ~ $switch': {
      borderColor: theme.comp.switch.colorBorderFocus,
      boxShadow: `0 0 0 2px ${theme.comp.switch.colorShadowFocus}`,
    },

    /**
     * Checked
     */
    '&:checked': {
      '& ~ $switch': {
        backgroundColor: theme.comp.switch.colorBackgroundChecked,

        '& $thumb': {
          left:
            defaultWidth -
            2 * defaultBorderWidth -
            defaultHandleOffset -
            defaultHandleWidth,
        },
      },

      // Checked + Hover
      '&:hover ~ $switch': {
        backgroundColor: theme.comp.switch.colorBackgroundCheckedHover,
      },

      // Active + Hover
      '&:active ~ $switch': {
        backgroundColor: theme.comp.switch.colorBackgroundCheckedActive,

        '& $thumb': {
          left:
            defaultWidth -
            2 * defaultBorderWidth -
            defaultHandleOffset -
            defaultHandleWidth -
            2,
        },
      },
    },
  },

  switch: {
    position: 'relative',
    boxSizing: 'border-box',
    borderWidth: defaultBorderWidth,
    borderStyle: 'solid',
    width: defaultWidth,
    height: defaultHeight,
    borderTopLeftRadius: theme.comp.switch.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.switch.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.switch.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.switch.shapeBorderRadiusBottomRight,
    borderColor: 'transparent',
  },

  thumb: {
    position: 'absolute',
    left: defaultHandleOffset,
    top: defaultHandleOffset,
    width: defaultHandleWidth,
    height: defaultHandleWidth,
    borderTopLeftRadius: theme.comp.switch.thumbShapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.switch.thumbShapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.switch.thumbShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.switch.thumbShapeBorderRadiusBottomRight,
    zIndex: 1,
    transition: 'left 0.15s ease-in',
  },
}))

export interface SwitchProps
  extends Omit<React.ComponentPropsWithRef<'label'>, 'onChange'> {
  /**
   * CSS классы компонента
   */
  classes?: Partial<Classes>
  /**
   * Значение поля
   */
  checked?: boolean
  /**
   * Размер компонента
   */
  size?: Exclude<ElementSizeType, 'lg'>
  /**
   * Элемент отключен
   */
  disabled?: boolean
  /**
   * Обработчик, вызываемый при изменении состояния
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Свойства элемента input
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /**
   * Атрибут name элемента input
   */
  name?: string
}

export const Switch = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      disabled,
      checked,
      onChange,
      inputProps,
      size = ElementSize.md,
      name,
      ...rest
    }: SwitchProps,
    ref: React.Ref<HTMLLabelElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classesMap.control, classNameProp, {
      [classesMap.small]: size === ElementSize.sm,
      [classesMap.disabled]: disabled,
      [classesMap.checked ?? '']: checked,
    })

    return (
      <span {...rest} ref={ref} className={className}>
        <input
          {...inputProps}
          name={name}
          type="checkbox"
          className={classesMap.input}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <div className={classesMap.switch}>
          <div className={classesMap.thumb} />
        </div>
      </span>
    )
  }
)
