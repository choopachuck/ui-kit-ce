'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useGeneratedId, useClassList, useButtonReset } from '@v-uik/hooks'
import { AccordionComponentsConfig, getComponents } from './components'
import { Classes } from './classes'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles((theme) => ({
  root: {
    margin: 0,
    boxSizing: 'border-box',
    color: theme.comp.accordionItem.colorText,
    borderTopLeftRadius: theme.comp.accordionItem.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.accordionItem.shapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.accordionItem.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.accordionItem.shapeBorderRadiusBottomRight,
  },

  expanded: {
    '&>$header': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      '&>$headerIcon': {
        transform: 'rotate(-180deg)',
      },
    },
  },

  header: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: [8, 16],
    textAlign: 'left',
    borderTopLeftRadius: theme.comp.accordionItem.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.accordionItem.shapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.accordionItem.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.accordionItem.shapeBorderRadiusBottomRight,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderTopStyle: theme.shape.borderStyle,
      borderTopWidth: theme.shape.borderWidth,
      borderTopColor: theme.comp.accordionItem.colorBorder,
    },

    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${theme.comp.accordionItem.colorShadowFocus}`,

      '&::after': {
        borderTopWidth: 0,
      },
    },

    '&:hover': {
      backgroundColor: theme.comp.accordionItem.colorBackgroundHover,
    },

    '&:active': {
      backgroundColor: theme.comp.accordionItem.colorBackgroundActive,
    },

    '&:disabled': {
      pointerEvents: 'none',
      color: theme.comp.accordionItem.colorTextDisabled,
    },
  },

  headerText: {
    zIndex: 2,
    fontFamily: theme.comp.accordionItem.typographyFontFamily,
    fontWeight: theme.comp.accordionItem.typographyFontWeight,
    fontSize: theme.comp.accordionItem.typographyFontSize,
    lineHeight: theme.comp.accordionItem.typographyLineHeight,
    letterSpacing: theme.comp.accordionItem.typographyLetterSpacing,
  },

  headerIcon: {
    zIndex: 2,
    flex: '0 0 24px',
    marginLeft: 8,
    transition: 'transform 200ms linear',
  },

  content: {
    background: 'none',
    padding: [16, 16, 24],
    color: theme.comp.accordionItem.contentColorText,
    borderBottomLeftRadius:
      theme.comp.accordionItem.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.accordionItem.shapeBorderRadiusBottomRight,

    fontFamily: theme.comp.accordionItem.contentTypographyFontFamily,
    fontWeight: theme.comp.accordionItem.contentTypographyFontWeight,
    fontSize: theme.comp.accordionItem.contentTypographyFontSize,
    lineHeight: theme.comp.accordionItem.contentTypographyLineHeight,
    letterSpacing: theme.comp.accordionItem.contentTypographyLetterSpacing,
  },
}))

interface HeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.RefCallback<HTMLButtonElement>
}

interface ContentProps extends ComponentPropsWithRefFix<'div'> {
  ref?: React.RefCallback<HTMLDivElement>
}

export interface AccordionItemProps
  extends Omit<ComponentPropsWithRefFix<'div'>, 'onClick'> {
  /**
   * JSS-классы для стилизации.
   */
  classes?: Partial<Classes>
  /**
   * Состояние активности элемента
   */
  disabled?: boolean
  /**
   * Заголовок аккордеона
   */
  header: React.ReactNode
  /**
   * Состояние элемента "скрыт"/"раскрыт"
   */
  expanded?: boolean
  /**
   * Набор пользовательских свойств для заголовка элемента
   */
  headerProps?: HeaderProps
  /**
   * Набор пользовательских свойств для контента элемента
   */
  contentProps?: ContentProps
  /**
   * Обработчик события клика по кнопке
   */
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void

  /**
   * Свойство для переопределения элементов AccordionItem
   */
  components?: AccordionComponentsConfig
}

export const AccordionItem = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      contentProps,
      headerProps,
      disabled,
      onClick,
      header,
      expanded = false,
      children,
      components,
      ...rest
    }: AccordionItemProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const buttonClasses = useButtonReset()
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classesMap.root, classNameProp, {
      [classesMap.expanded ?? '']: expanded,
    })
    const contentClassName = clsx(classesMap.content, contentProps?.className)
    const headerClassName = clsx(
      buttonClasses.resetButton,
      classesMap.header,
      headerProps?.className
    )

    const contentId = useGeneratedId(contentProps?.id)

    const headerId = useGeneratedId(headerProps?.id)

    const { Icon } = getComponents(components)

    return (
      <div {...rest} ref={ref} className={className}>
        <button
          {...headerProps}
          type="button"
          id={headerId}
          disabled={disabled}
          className={headerClassName}
          aria-disabled={disabled}
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={onClick}
        >
          <span className={classesMap.headerText}>{header}</span>
          <Icon
            expanded={expanded}
            contentProps={contentProps}
            headerProps={headerProps}
            header={header}
            classes={classesMap}
            disabled={disabled}
          />
        </button>
        {expanded && (
          <div
            role="region"
            {...contentProps}
            id={contentId}
            aria-labelledby={headerId}
            className={contentClassName}
          >
            {children}
          </div>
        )}
      </div>
    )
  }
)
