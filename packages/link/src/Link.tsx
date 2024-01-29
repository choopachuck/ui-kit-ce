'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { useClassList } from '@v-uik/hooks'
import { Classes } from './classes'

const useStyles = createUseStyles((theme) => ({
  link: {
    outline: 0,
    border: 0,
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    color: theme.comp.link.colorText,
    display: 'inline-flex',
    alignItems: 'center',
    borderTopLeftRadius: theme.comp.link.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.link.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.link.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.link.shapeBorderRadiusBottomRight,

    fontFamily: theme.comp.link.typographyFontFamily,
    fontSize: theme.comp.link.typographyFontSize,
    lineHeight: theme.comp.link.typographyLineHeight,
    letterSpacing: theme.comp.link.typographyLetterSpacing,
    fontWeight: theme.comp.link.typographyFontWeight,

    '&:visited': {
      color: theme.comp.link.colorTextVisited,
    },

    '&:hover': {
      color: theme.comp.link.colorTextHover,
      textDecoration: 'underline',
    },

    '&:focus-visible': {
      color: theme.comp.link.colorText,
      boxShadow: `0 0 0 2px ${theme.comp.link.colorShadowFocus}`,
      textDecoration: 'underline',
    },

    '&:active': {
      color: theme.comp.link.colorTextActive,
      boxShadow: 'none',
      textDecoration: 'underline',
    },
  },
  disabled: {
    pointerEvents: 'none',
    cursor: 'not-allowed',
    color: theme.comp.link.colorTextDisabled,
    userSelect: 'none',
  },
  underline: {
    textDecoration: 'underline',
  },
}))

const defaultElement = 'a'

export interface LinkBaseProps
  extends React.ComponentPropsWithRef<typeof defaultElement> {
  /**
   * Адрес ссылки
   */
  href?: string
  /**
   * Блокирование компонента
   */
  disabled?: boolean
  /**
   * Ссылка с подчеркиванием
   */
  underline?: boolean
  /**
   * Список классов
   */
  classes?: Classes
}

export type LinkProps<E extends React.ElementType = typeof defaultElement> =
  PolymorphicComponentProps<E, LinkBaseProps>

export const Link = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      className,
      underline,
      as,
      ref,
      children,
      disabled,
      classes,
      ...rest
    }: LinkProps<E>,
    innerRef: typeof ref
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    /**
     * Пропсы для дизейблинга кнопки (см. табличку с accessibility)
     */
    const disabledProps = disabled
      ? { role: 'link', 'aria-disabled': true, href: undefined }
      : {}

    return (
      <Box
        as={as ?? defaultElement}
        {...rest}
        {...disabledProps}
        ref={innerRef}
        className={clsx(className, classesMap.link, {
          [classesMap.disabled]: disabled,
          [classesMap.underline]: underline,
        })}
      >
        {children}
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: LinkProps<E>
) => JSX.Element
