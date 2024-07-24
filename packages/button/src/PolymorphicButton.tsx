'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { useClassList, useButtonReset } from '@v-uik/hooks'
import { ElementSize } from '@v-uik/common'
import { Text, TextKinds } from '@v-uik/typography'
import { ButtonBaseProps, ButtonKinds, ButtonColor } from './interfaces'

import { getStyles } from './styles'

const defaultElement = 'button'

export type PolymorphicButtonProps<
  E extends React.ElementType = typeof defaultElement
> = PolymorphicComponentProps<E, ButtonBaseProps>

const useStyles = createUseStyles(getStyles)

export const PolymorphicButton = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      classes,
      className: classNameProp,
      kind = ButtonKinds.contained,
      color = ButtonColor.primary,
      size = ElementSize.md,
      fullWidth,
      textProps,
      children,
      as = defaultElement as E,
      disabled,
      ...rest
    }: PolymorphicButtonProps<E>,
    ref: React.Ref<E>
  ) => {
    const buttonClasses = useButtonReset()
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const isSmall = size === ElementSize.sm
    const isMedium = size === ElementSize.md
    const isLarge = size === ElementSize.lg
    const className = clsx(
      buttonClasses.resetButton,
      classNameProp,
      classesMap.button,
      {
        [classesMap.contained]: kind === ButtonKinds.contained,
        [classesMap.outlined]: kind === ButtonKinds.outlined,
        [classesMap.ghost]: kind === ButtonKinds.ghost,
        [classesMap.primary]: color === ButtonColor.primary,
        [classesMap.error]: color === ButtonColor.error,
        [classesMap.secondary]: color === ButtonColor.secondary,
        [classesMap.small]: isSmall,
        [classesMap.medium]: isMedium,
        [classesMap.large]: isLarge,
        [classesMap.fullWidth]: fullWidth,
        [classesMap.disabled]: disabled,
      }
    )
    const textClassName = clsx(textProps?.className, classesMap.text, {
      [classesList.textTypography]: !textProps?.kind,
      [classesMap.textSm]: isSmall,
      [classesMap.textMd]: isMedium,
      [classesMap.textLg]: isLarge,
    })

    const buttonProps = as === 'button' ? { type: 'button' } : {}

    return (
      <Box
        as={as}
        {...buttonProps}
        {...(rest as PolymorphicButtonProps<E>)}
        ref={ref}
        className={className}
      >
        <Text kind={TextKinds.button} {...textProps} className={textClassName}>
          {children}
        </Text>
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: PolymorphicButtonProps<E>
) => JSX.Element
