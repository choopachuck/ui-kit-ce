'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { ElementSize, ElementSizeType } from '@v-uik/common'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { Text, TextProps } from '@v-uik/typography'
import { useMergedRefs, useClassList } from '@v-uik/hooks'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { ListContext } from './ListContext'
import { Classes } from './classes'

const useStyles = createUseStyles((theme) => ({
  listItem: {
    minWidth: 200,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    minHeight: 40,
    padding: [8, 16],
    color: theme.comp.listItem.colorText,
    borderTopLeftRadius: theme.comp.listItem.shapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.listItem.shapeBorderRadiusTopRightMd,
    borderBottomLeftRadius: theme.comp.listItem.shapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius: theme.comp.listItem.shapeBorderRadiusBottomRightMd,

    '&:focus': {
      outline: 'none',
    },
  },

  disabled: {
    color: theme.comp.listItem.colorTextDisabled,
    pointerEvents: 'none',
  },

  selected: {},

  interactive: {
    '&:not($disabled)': {
      cursor: 'pointer',

      '&:focus-visible:active': {
        backgroundColor: theme.comp.listItem.colorBackgroundActive,
      },

      '&:focus-visible': {
        backgroundColor: theme.comp.listItem.colorBackgroundHover,
      },

      '&:hover': {
        backgroundColor: theme.comp.listItem.colorBackgroundHover,
      },
    },
  },

  critical: {
    '&:not($disabled)': {
      cursor: 'pointer',
      color: theme.comp.listItem.colorTextCritical,

      '&:focus-visible:active': {
        backgroundColor: theme.comp.listItem.colorBackgroundCriticalActive,
        color: theme.comp.listItem.colorTextCriticalActive,
      },

      '&:focus-visible': {
        backgroundColor: theme.comp.listItem.colorBackgroundCriticalHover,
        color: theme.comp.listItem.colorTextCriticalHover,
      },

      '&:hover': {
        backgroundColor: theme.comp.listItem.colorBackgroundCriticalHover,
        color: theme.comp.listItem.colorTextCriticalHover,
      },
    },
  },

  small: {
    minHeight: 32,
    padding: [6, 16],
    borderTopLeftRadius: theme.comp.listItem.shapeBorderRadiusTopLeftSm,
    borderTopRightRadius: theme.comp.listItem.shapeBorderRadiusTopRightSm,
    borderBottomLeftRadius: theme.comp.listItem.shapeBorderRadiusBottomLeftSm,
    borderBottomRightRadius: theme.comp.listItem.shapeBorderRadiusBottomRightSm,

    '& $affix': {
      '& > svg': {
        width: 16,
        height: 16,
      },
    },
  },

  large: {
    minHeight: 48,
    padding: [12, 16],
    borderTopLeftRadius: theme.comp.listItem.shapeBorderRadiusTopLeftLg,
    borderTopRightRadius: theme.comp.listItem.shapeBorderRadiusTopRightLg,
    borderBottomLeftRadius: theme.comp.listItem.shapeBorderRadiusBottomLeftLg,
    borderBottomRightRadius: theme.comp.listItem.shapeBorderRadiusBottomRightLg,
  },

  text: {
    flexGrow: 1,
    '&$textTypography': {
      fontFamily: theme.comp.listItem.typographyFontFamily,
      fontSize: theme.comp.listItem.typographyFontSize,
      fontWeight: theme.comp.listItem.typographyFontWeight,
      lineHeight: theme.comp.listItem.typographyLineHeight,
      letterSpacing: theme.comp.listItem.typographyLetterSpacing,
    },
  },
  textTypography: {},

  affix: {
    display: 'inline-flex',
  },

  prefix: {
    marginRight: 8,
  },

  suffix: {
    marginLeft: 8,
  },

  stripe: {
    borderBottom: `1px solid ${theme.comp.listItem.colorBorder}`,

    '&:last-child': {
      border: 'none',
    },
  },
}))

export interface ListItemOwnProps {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Размер элементов списка
   */
  size?: ElementSizeType
  /**
   * Отметить элемент выбранным
   */
  selected?: boolean
  /**
   * Сделать элемент интерактивным
   */
  interactive?: boolean
  /**
   * Отключить элемент
   */
  disabled?: boolean
  /**
   * Выделение критически важного элемента
   */
  critical?: boolean
  /**
   * Свойства компонента Text
   */
  textProps?: TextProps
  /**
   * Вспомогательный элемент после поля ввода
   */
  suffix?: React.ReactNode
  /**
   * Между опций отображается разделитель
   */
  stripe?: boolean
}

const defaultElement = 'li'

export type ListItemProps<E extends React.ElementType> = Omit<
  PolymorphicComponentProps<E, ListItemOwnProps>,
  'prefix'
> & {
  /**
   * Вспомогательный элемент перед полем ввода
   */
  prefix?: React.ReactNode
}

export const ListItem = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      classes,
      className: classNameProp,
      interactive: interactiveProp,
      selected,
      disabled,
      critical,
      size: sizeProp,
      textProps,
      prefix,
      suffix,
      children,
      stripe: stripeProp,
      onKeyDown: onKeyDownProp,
      onClick: onClickProp,
      ...rest
    }: ListItemProps<E>,
    ref: typeof rest.ref
  ) => {
    const listContext = React.useContext(ListContext)

    const mergedRef = useMergedRefs([
      ref,
      selected ? listContext.selectedItemRef : null,
    ])

    const interactive = listContext.interactive || interactiveProp
    const size = sizeProp || listContext.size
    const stripe = listContext.stripe || stripeProp

    const classesList = useStyles()
    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )
    const className = clsx(classNameProp, classesMap.listItem, {
      [classesMap.stripe]: stripe,
      [classesMap.interactive]: interactive,
      [classesMap.disabled]: disabled,
      [classesMap.critical]: critical,
      [classesMap.selected]: selected,
      [classesMap.small]: size === ElementSize.sm,
      [classesMap.large]: size === ElementSize.lg,
    })

    const textClassName = clsx(classesMap.text, textProps?.className, {
      [classesMap.textTypography]: !textProps?.kind,
    })

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      onKeyDownProp?.(event)

      if (event.target === event.currentTarget) {
        if (
          isEqualKeyboardKeys('Enter', event.key) ||
          // event.key у клавиши Space был равен ' ', по-этому перешли на code
          isEqualKeyboardKeys('Space', event.code)
        ) {
          if (interactive) {
            event.preventDefault()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            onClickProp?.(event)
          }
        }
      }
    }

    return (
      <Box
        ref={mergedRef}
        as={defaultElement}
        role={interactive ? 'menuitem' : undefined}
        tabIndex={interactive && !disabled ? -1 : undefined}
        aria-selected={selected}
        {...rest}
        disabled={disabled}
        aria-disabled={disabled}
        className={className}
        onKeyDown={onKeyDown}
        onClick={onClickProp}
      >
        {prefix && (
          <span className={clsx(classesMap.affix, classesMap.prefix)}>
            {prefix}
          </span>
        )}

        <Text ellipsis as="span" {...textProps} className={textClassName}>
          {children}
        </Text>

        {suffix && (
          <span className={clsx(classesMap.affix, classesMap.suffix)}>
            {suffix}
          </span>
        )}
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: ListItemProps<E>
) => JSX.Element
