'use client'

import * as React from 'react'
import { Input, InputProps } from '@v-uik/input'
import { useToggle, useButtonReset } from '@v-uik/hooks'
import { HideIcon, ShowIcon } from './Icons'
import { clsx, createUseStyles } from '@v-uik/theme'
import { ButtonProps } from '@v-uik/button'

const useStyles = createUseStyles((theme) => ({
  icon: {
    cursor: 'pointer',
    display: 'flex',
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.input.colorShadowFocus}`,
    },
  },
  password: {
    fontFamily: theme.comp.inputPassword.typographyFontFamilyHidden,
    fontWeight: theme.comp.inputPassword.typographyFontWeightHidden,
    fontSize: theme.comp.inputPassword.typographyFontSizeHidden,
    lineHeight: theme.comp.inputPassword.typographyLineHeightHidden,
    letterSpacing: theme.comp.inputPassword.typographyLetterSpacingHidden,
  },
}))

type Visibility = boolean

type IconPosition = 'start' | 'end'

export interface InputPasswordProps<TCanClear extends boolean = boolean>
  extends Omit<InputProps<TCanClear>, 'suffix' | 'prefix'> {
  /**
   * Скрыть/показать текст в input'e
   * @default false
   */
  visible?: Visibility
  /**
   * Обработчик нажатия по иконке видимости
   */
  onVisibilityChange?: (value: Visibility) => void
  /**
   * Местоположение иконки: слева или справа
   * @default "end"
   */
  iconPosition?: IconPosition
  /**
   * Иконка, отображаема при скрытом инпуте
   */
  hideIcon?: React.ReactNode
  /**
   * Иконка, отображаема при НЕ скрытом инпуте
   */
  showIcon?: React.ReactNode
  /**
   * Пропсы для кнопки с иконкой
   */
  buttonIconProps?: Omit<ButtonProps, 'className' | 'onMouseDown' | 'onClick'> //TODO: 2.0 ButtonProps оставлены для обратной совместимости, должны быть HTMLProps Button
}

const _InputPassword = React.forwardRef(
  <TCanClear extends boolean = boolean>(
    {
      visible = false,
      onVisibilityChange,
      iconPosition: iconPositionProp = 'end',
      hideIcon: hideIconProp,
      showIcon: showIconProp,
      buttonIconProps = {},
      ...rest
    }: InputPasswordProps<TCanClear>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const classesList = useStyles()

    const iconPosition = iconPositionProp
    const showIcon = showIconProp || ShowIcon
    const hideIcon = hideIconProp || HideIcon
    const buttonResetClasses = useButtonReset()

    const [toggled, toggle] = useToggle(visible)

    const toggleVisibility = () => {
      toggle()
      onVisibilityChange?.(toggled)
    }

    /*
      Приходится оборачивать в спан, тк нужно навесить курсор и клик
      Тип ReactNode включает в себя еще и строки и числа, а на них
      Не получится навесить ни стили, ни события
    */
    const Icon = (
      // onMouseDown исправляет потерю фокуса с input
      <button
        type="button"
        className={clsx(buttonResetClasses.resetButton, classesList.icon)}
        onClick={toggleVisibility}
        onMouseDown={(e) => e.preventDefault()}
        {...buttonIconProps}
      >
        {toggled ? showIcon : hideIcon}
      </button>
    )

    const classes = {
      ...rest.classes,
      input: clsx(rest.classes?.input, {
        [classesList.password]: !toggled,
      }),
    }

    return (
      <Input
        {...rest}
        ref={ref}
        suffix={iconPosition === 'end' && Icon}
        prefix={iconPosition === 'start' && Icon}
        classes={classes}
        inputProps={{
          ...rest.inputProps,
          type: toggled ? 'input' : 'password',
        }}
      />
    )
  }
)

export const InputPassword = _InputPassword as <
  TCanClear extends boolean = boolean
>(
  props: InputPasswordProps<TCanClear> & {
    ref?: React.ForwardedRef<HTMLDivElement>
  }
) => React.ReactElement
