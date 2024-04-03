'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { omit } from '@v-uik/utils'

import { useClassList, useButtonAriaActionProps } from '@v-uik/hooks'
import { isSelectable, CardKindType, isClickable, CardProps } from './types'
import { useButtonReset } from '@v-uik/button'
import { getInputProps, getOmittedParams, getClickableProps } from './utils'

import { KEY_CODES, CardKind } from './constants'
import { CardContent } from './CardContent'

const useStyles = createUseStyles((theme) => ({
  root: {
    position: 'relative',
  },
  card: {
    padding: 24,
    position: 'relative',
    boxSizing: 'border-box',

    borderTopLeftRadius: theme.comp.card.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.card.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.card.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.card.shapeBorderRadiusBottomRight,
    boxShadow: theme.comp.card.elevationShadow,

    borderWidth: 1,
    borderStyle: 'solid',
  },
  container: {
    background: theme.comp.card.colorBackgroundContainer,
    borderColor: theme.comp.card.colorBorderContainer,
  },
  clickable: {
    cursor: 'pointer',
    display: 'block',
    textAlign: 'left',

    background: theme.comp.card.colorBackgroundClickable,
    borderColor: theme.comp.card.colorBorderClickable,

    '&:hover': {
      background: theme.comp.card.colorBackgroundClickableHover,
      borderColor: theme.comp.card.colorBorderClickableHover,
    },
    '&$active, &:active': {
      background: theme.comp.card.colorBackgroundClickableActive,
      borderColor: theme.comp.card.colorBorderClickableActive,
    },
    '&$disabled': {
      cursor: 'unset',
      background: theme.comp.card.colorBackgroundClickableDisabled,
      borderColor: theme.comp.card.colorBorderClickableDisabled,
    },
    '&:not($disabled)': {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${theme.comp.card.colorShadowFocus}`,
      },
    },
  },
  active: {},
  disabled: {},
  selectable: {
    background: theme.comp.card.colorBackgroundSelectable,
    borderColor: theme.comp.card.colorBorderSelectable,
  },

  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    zIndex: 2,
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'unset',
      '& ~ $selectable': {
        pointerEvents: 'none',
        background: theme.comp.card.colorBackgroundSelectableDisabled,

        borderColor: theme.comp.card.colorBorderSelectableDisabled,
      },
      '&:checked ~ $selectable': {
        background: theme.comp.card.colorBackgroundSelectableCheckedDisabled,
        borderColor: theme.comp.card.colorBorderSelectableCheckedDisabled,
      },
    },
    '&:not(:disabled)': {
      '& ~ $selectable': {
        cursor: 'pointer',
      },
      '&:focus-visible ~ $selectable': {
        outline: 'none',

        boxShadow: `0 0 0 2px ${theme.comp.card.colorShadowFocus}`,
      },
      '&:hover ~ $selectable': {
        background: theme.comp.card.colorBackgroundSelectableHover,
        borderColor: theme.comp.card.colorBorderSelectableHover,
      },
      '&:active ~ $selectable': {
        background: theme.comp.card.colorBackgroundSelectableActive,
        borderColor: theme.comp.card.colorBorderSelectableActive,
      },

      '&:checked': {
        '& ~ $selectable': {
          background: theme.comp.card.colorBackgroundSelectableChecked,
          borderColor: theme.comp.card.colorBorderSelectableChecked,
        },
        '&:hover ~ $selectable': {
          background: theme.comp.card.colorBackgroundSelectableCheckedHover,
          borderColor: theme.comp.card.colorBorderSelectableChecked,
        },
        '&:active ~ $selectable': {
          background: theme.comp.card.colorBackgroundSelectableCheckedActive,
          borderColor: theme.comp.card.colorBorderSelectableCheckedActive,
        },
      },
    },
  },
  body: {
    fontFamily: theme.comp.card.bodyTypographyFontFamily,
    fontSize: theme.comp.card.bodyTypographyFontSize,
    fontWeight: theme.comp.card.bodyTypographyFontWeight,
    letterSpacing: theme.comp.card.bodyTypographyLetterSpacing,
    lineHeight: theme.comp.card.bodyTypographyLineHeight,

    color: theme.comp.card.bodyColorText,

    '$disabled &': {
      color: theme.comp.card.bodyColorTextDisabled,
    },
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: theme.comp.card.headerTypographyFontFamily,
    fontSize: theme.comp.card.headerTypographyFontSize,
    fontWeight: theme.comp.card.headerTypographyFontWeight,
    letterSpacing: theme.comp.card.headerTypographyLetterSpacing,
    lineHeight: theme.comp.card.headerTypographyLineHeight,

    color: theme.comp.card.headerColorText,

    '$disabled &': {
      color: theme.comp.card.headerColorTextDisabled,
    },
  },
  subtitleText: {
    marginTop: 8,

    fontFamily: theme.comp.card.subtitleTypographyFontFamily,
    fontSize: theme.comp.card.subtitleTypographyFontSize,
    fontWeight: theme.comp.card.subtitleTypographyFontWeight,
    letterSpacing: theme.comp.card.subtitleTypographyLetterSpacing,
    lineHeight: theme.comp.card.subtitleTypographyLineHeight,

    color: theme.comp.card.subtitleColorText,

    '$disabled &': {
      color: theme.comp.card.subtitleColorTextDisabled,
    },
  },
  footer: {
    marginTop: 20,
  },
}))

export const Card = React.forwardRef(
  (
    {
      classes,
      children,
      header,
      footer,
      className,
      subtitle,
      ...props
    }: CardProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classList = useStyles()

    const omittedProps = omit<
      Omit<React.HTMLProps<HTMLDivElement>, 'onChange'>
    >(props, getOmittedParams(props as CardProps))

    const classesMap = useClassList(classList, classes)

    const kind: CardKindType = props.kind || CardKind.container

    const { resetButton } = useButtonReset()
    const [isKeyActive, setIsKeyActive] = React.useState(false)

    const cardClasses = clsx(classesMap.card, classesMap[kind])

    const inputProps = getInputProps(props)
    const buttonProps = getClickableProps(props)

    const actions = useButtonAriaActionProps<HTMLDivElement>(
      (e) => {
        if (isClickable(props) && props.disabled) {
          return
        }

        buttonProps?.onClick?.(e)
      },
      (e) => {
        if (isClickable(props) && props.disabled) {
          return
        }

        if (KEY_CODES.includes(e.keyCode)) {
          setIsKeyActive(false)
        }

        buttonProps?.onKeyUp?.(e)
      },
      (e) => {
        if (isClickable(props) && props.disabled) {
          return
        }

        if (KEY_CODES.includes(e.keyCode)) {
          setIsKeyActive(true)
        }

        buttonProps?.onKeyDown?.(e)
      }
    )

    const getCardContent = () => {
      if (isClickable(props)) {
        return (
          <div
            tabIndex={props.disabled ? -1 : 0}
            className={clsx(
              resetButton,
              cardClasses,
              props.disabled && classesMap.disabled,
              isKeyActive && classesMap.active,
              buttonProps?.className
            )}
            role="button"
            {...buttonProps}
            {...actions}
          >
            <CardContent
              classes={classesMap}
              header={header}
              subtitle={subtitle}
              footer={footer}
            >
              {children}
            </CardContent>
          </div>
        )
      }

      return (
        <>
          {isSelectable(props) && inputProps && (
            <input
              type="checkbox"
              disabled={props.disabled}
              {...inputProps}
              className={clsx(classesMap.input, inputProps.className)}
            />
          )}
          <div
            className={clsx(
              cardClasses,
              isSelectable(props) && props.disabled && classesMap.disabled
            )}
          >
            <CardContent
              classes={classesMap}
              header={header}
              subtitle={subtitle}
              footer={footer}
            >
              {children}
            </CardContent>
          </div>
        </>
      )
    }

    return (
      <div
        className={clsx(classesMap.root, className)}
        {...omittedProps}
        ref={ref}
      >
        {getCardContent()}
      </div>
    )
  }
)
