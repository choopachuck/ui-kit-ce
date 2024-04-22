'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import {
  DirectionType,
  Direction,
  ComponentPropsWithRefFix,
} from '@v-uik/common'
import { useClassList } from '@v-uik/hooks'
import { Classes } from './classes'

export const TextAlign = {
  center: 'center',
  right: 'right',
  left: 'left',
} as const

export type TextAlignType = keyof typeof TextAlign

type DividerStyles = {
  width: React.CSSProperties['width']
}

// allowed dynamic classes usage
const useStyles = createUseStyles((theme) => ({
  root: {
    margin: 0,
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: theme.comp.divider.styleBorder,
    borderColor: theme.comp.divider.colorBorder,
    borderBottomWidth: ({ width }: DividerStyles) =>
      width ?? theme.comp.divider.widthBorder,
  },

  horizontal: {},

  vertical: {
    height: 'auto',
    borderBottomWidth: 0,
    borderRightWidth: ({ width }: DividerStyles) =>
      width ?? theme.comp.divider.widthBorder,
    alignSelf: 'stretch',
    margin: [0, 8],
  },

  horizontalWithText: {
    display: 'flex',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    border: 0,
    margin: [8, 0],

    '&::before, &::after': {
      position: 'relative',
      width: '100%',
      content: "''",
      transform: `translateY(calc(50% - ${
        theme.comp.divider.widthBorder / 2
      }%))`,
      borderTopWidth: ({ width }: DividerStyles) =>
        width ?? theme.comp.divider.widthBorder,
      borderTopStyle: theme.comp.divider.styleBorder,
      borderTopColor: theme.comp.divider.colorBorder,
    },
  },

  verticalWithText: {
    margin: [8, 0],
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRight: 0,
    borderBottom: 0,

    '&::before, &::after': {
      height: '100%',
      content: "''",
      borderTop: 0,
      transform: `translateX(calc(50% - ${
        theme.comp.divider.widthBorder / 2
      }%))`,
      borderLeftStyle: theme.comp.divider.styleBorder,
      borderLeftColor: theme.comp.divider.colorBorder,
      borderLeftWidth: ({ width }: DividerStyles) =>
        width ?? theme.comp.divider.widthBorder,
    },

    '& $text': {
      margin: [8, 0],
    },
  },

  text: {
    display: 'inline-block',
    padding: [0, 8],
    textAlign: 'center',

    color: theme.comp.divider.colorText,
    fontFamily: theme.comp.divider.typographyFontFamily,
    fontWeight: theme.comp.divider.typographyFontWeight,
    fontSize: theme.comp.divider.typographyFontSize,
    lineHeight: theme.comp.divider.typographyLineHeight,
    letterSpacing: theme.comp.divider.typographyLetterSpacing,
  },

  left: {
    '&::before': {
      width: '10%',
    },
    '&::after': {
      width: '90%',
    },
  },

  right: {
    '&::before': {
      width: '90%',
    },
    '&::after': {
      width: '10%',
    },
  },

  center: {},
}))

const defaultElement = 'hr'

export interface BaseDividerProps
  extends ComponentPropsWithRefFix<typeof defaultElement> {
  /**
   * CSS классы компонента
   */
  classes?: Partial<Classes>
  /**
   * Расположение разделителя
   * @default Direction.horizontal
   */
  direction?: DirectionType
  /**
   * Ориентация контента внутри линии
   */
  textAlign?: TextAlignType
  /**
   * Ширина линии разделителя
   *
   * Имеет больший вес чем токен
   */
  width?: React.CSSProperties['width']
}

export type DividerProps<E extends React.ElementType = typeof defaultElement> =
  PolymorphicComponentProps<E, BaseDividerProps>

export const Divider = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      as,
      children,
      classes,
      direction = Direction.horizontal,
      ref,
      textAlign = TextAlign.center,
      width,
      className: classNameProp,
      ...rest
    }: DividerProps<E>,
    innerRef: typeof ref
  ) => {
    const classesList = useStyles({ width })

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    const hasChildren = !!children

    // условие нужно для исключения ошибки при наличии children в hr линии
    const defaultComponent = hasChildren ? 'div' : 'hr'

    const className = clsx(
      classNameProp,
      classesMap.root,
      classesMap[direction],
      classesMap[textAlign],
      {
        [classesMap.horizontalWithText]:
          hasChildren && direction === Direction.horizontal,
        [classesMap.verticalWithText]:
          hasChildren && direction === Direction.vertical,
      }
    )

    return (
      <Box
        as={as ?? defaultComponent}
        role="separator"
        aria-orientation={direction}
        {...rest}
        ref={innerRef}
        className={className}
      >
        {hasChildren ? (
          <span className={classesMap.text}>{children}</span>
        ) : null}
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: DividerProps<E>
) => JSX.Element
