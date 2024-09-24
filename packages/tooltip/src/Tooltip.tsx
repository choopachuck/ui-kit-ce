'use client'

import * as React from 'react'
import type { ComponentPropsWithRefFix } from '@v-uik/common'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList, useGeneratedId } from '@v-uik/hooks'
import { Dropdown, DropdownProps, DropdownTriggerType } from '@v-uik/dropdown'
import { mergeRefs } from '@v-uik/utils'
import { TooltipContext } from './TooltipContext'
import { IndicatorIcon } from './assets/IndicatorIcon'

const useStyles = createUseStyles((theme) => {
  return {
    tooltip: {
      position: 'relative',
      display: 'flex',
      padding: 16,
      borderTopLeftRadius: theme.comp.tooltip.shapeBorderRadiusTopLeft,
      borderTopRightRadius: theme.comp.tooltip.shapeBorderRadiusTopRight,
      borderBottomLeftRadius: theme.comp.tooltip.shapeBorderRadiusBottomLeft,
      borderBottomRightRadius: theme.comp.tooltip.shapeBorderRadiusBottomRight,
      backgroundColor: theme.comp.tooltip.colorBackground,
      color: theme.comp.tooltip.colorText,
      border: `1px solid ${theme.comp.tooltip.colorBorder}`,

      fontFamily: theme.comp.tooltip.typographyFontFamily,
      fontSize: theme.comp.tooltip.typographyFontSize,
      lineHeight: theme.comp.tooltip.typographyLineHeight,
      letterSpacing: theme.comp.tooltip.typographyLetterSpacing,
      fontWeight: theme.comp.tooltip.typographyFontWeight,
    },

    single: {
      padding: [2, 8],
      whiteSpace: 'nowrap',

      '& $indicator': {
        marginRight: 4,
      },
    },

    indicator: {
      color: theme.comp.tooltip.indicatorColorBackground,
      marginTop: 2,
      marginRight: 8,
    },

    arrow: {
      overflow: 'hidden',
      position: 'absolute',
      width: 12,
      height: 9 /**  {@link https://github.com/mui/material-ui/blob/next/packages/mui-material/src/Tooltip/Tooltip.js#L273} **/,
      backgroundColor: 'inherit',
      visibility: 'hidden',

      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        transform: 'rotate(45deg)',
        backgroundColor: 'inherit',
        visibility: 'visible',
        boxSizing: 'border-box',
        borderWidth: 0,
        borderColor: theme.comp.tooltip.arrowColorBorder,
        borderStyle: 'solid',
      },

      '[data-popper-placement*="bottom"] &': {
        top: 0,
        marginTop: -9,
        '&::before': {
          transformOrigin: '0 100%',
          borderLeftWidth: 1,
          borderTopWidth: 1,
        },
      },

      '[data-popper-placement*="top"] &': {
        bottom: 0,
        marginBottom: -9,
        '&::before': {
          transformOrigin: '100% 0',
          borderBottomWidth: 1,
          borderRightWidth: 1,
        },
      },

      '[data-popper-placement*="right"] &': {
        left: 0,
        height: 12,
        width: 9,
        marginLeft: -9,
        '&::before': {
          transformOrigin: '100% 100%',
          borderBottomWidth: 1,
          borderLeftWidth: 1,
        },
      },

      '[data-popper-placement*="left"] &': {
        right: 0,
        height: 12,
        width: 9,
        marginRight: -9,
        '&::before': {
          transformOrigin: '0 0',
          borderTopWidth: 1,
          borderRightWidth: 1,
        },
      },
    },
  }
})

export type Classes = {
  /** Стиль, применяемый к элементу Tooltip */
  tooltip?: string
  /** Стиль, применяемый к элементу с `single='true'` */
  single?: string
  /** Стиль, применяемый к стрелке в содержимом Tooltip*/
  arrow?: string
  /** Стиль, применяемый к элементу с `indicator='true'` */
  indicator?: string
}

export interface TooltipProps extends ComponentPropsWithRefFix<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Компактное отображение содержимого в одну строку
   */
  single?: boolean
  /**
   * Добавить иконку-индикатор в тултип
   */
  indicator?: boolean
  /**
   * Свойства компонента Dropdown
   */
  dropdownProps?: Omit<DropdownProps, 'children'>
  /**
   * HTML-элемент, который будет триггером
   */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  /**
   * Показывать тултип, когда триггер получает фокус
   */
  showOnChildFocus?: boolean
  /**
   * Должен быть true, если в тултипе есть интерактивные элементы
   */
  interactive?: boolean
}

const arrowModifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 8],
    },
  },
  {
    name: 'arrow',
    options: {
      padding: 4,
    },
  },
]

export const Tooltip = React.forwardRef(
  (
    {
      classes: classesProp,
      dropdownProps,
      className: classNameProp,
      children: childrenProp,
      single,
      indicator,
      showOnChildFocus,
      interactive,
      ...rest
    }: TooltipProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      open: openProp,
      onStateChange: onStateChangeProp,
      content: contentProp,
    } = dropdownProps ?? {}

    const innerRef = React.useRef<HTMLDivElement | null>(null)
    const tooltipRef = React.useRef<HTMLDivElement | null>(null)

    const [open, setOpen] = React.useState(false)

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classesProp)

    const tooltipClassName = clsx(classNameProp, classesMap.tooltip, {
      [classesMap.single]: single,
    })

    const handleSetOpen = React.useCallback(
      (value: boolean) => {
        setOpen(value)
        if (openProp !== undefined && openProp !== value) {
          onStateChangeProp?.(value)
        }
      },
      [setOpen, openProp, onStateChangeProp]
    )

    const onBlur = (event: React.FocusEvent<HTMLElement>) => {
      if (interactive) {
        return
      }

      if (tooltipRef.current) {
        if (!tooltipRef.current.contains(event.relatedTarget)) {
          handleSetOpen(false)
        }
      }
    }

    const handleClose = React.useCallback(() => {
      handleSetOpen(false)
      innerRef.current?.focus()
    }, [handleSetOpen])

    const onStateChange = React.useCallback(
      (value: boolean) => {
        setOpen(value)
        onStateChangeProp?.(value)
      },
      [setOpen, onStateChangeProp]
    )

    const child = React.Children.only(childrenProp)

    const dropdownId = useGeneratedId(dropdownProps?.id)

    const children = React.cloneElement(child, {
      // @ts-ignore
      ref: mergeRefs([child.ref, innerRef]),
      onFocus: (event: React.FocusEvent<HTMLElement>) => {
        child.props.onFocus?.(event)
        if (showOnChildFocus) {
          setOpen(true)
        }
      },
      onBlur: (event: React.FocusEvent<HTMLElement>) => {
        child.props.onBlur?.(event)

        onBlur(event)
      },
      ...(interactive
        ? {
            'aria-expanded': open,
            'aria-controls': dropdownId,
          }
        : {}),
    })

    const modifiers = dropdownProps?.modifiers
      ? [...arrowModifiers, ...dropdownProps?.modifiers]
      : arrowModifiers

    if (!contentProp) {
      return children
    }

    const content = (
      <TooltipContext.Provider value={{ close: handleClose }}>
        <div {...rest} ref={tooltipRef} className={tooltipClassName}>
          <div data-popper-arrow className={classesMap.arrow} />
          {indicator && <IndicatorIcon className={classesMap.indicator} />}
          {contentProp}
        </div>
      </TooltipContext.Provider>
    )

    return (
      <Dropdown
        ref={ref}
        disablePortal
        action={
          interactive ? DropdownTriggerType.click : DropdownTriggerType.hover
        }
        open={open}
        {...dropdownProps}
        id={dropdownId}
        modifiers={modifiers}
        content={content}
        onStateChange={onStateChange}
        onBlur={(ev) => {
          dropdownProps?.onBlur?.(ev)
          onBlur(ev)
        }}
        onKeyDown={(event) => {
          dropdownProps?.onKeyDown?.(event)
          if (interactive && event.key === 'Escape') {
            handleSetOpen(false)
            innerRef.current?.focus()
          }
        }}
      >
        {children}
      </Dropdown>
    )
  }
)
