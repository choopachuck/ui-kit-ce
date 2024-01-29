'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import {
  useDynamicContainer,
  UseDynamicContainerParams,
  UseDynamicContainerReturnType,
} from './hooks'
import { Classes } from './classes'

const getDynamicStyles = (props: UseDynamicContainerReturnType) => {
  return {
    root: {
      paddingLeft: props.padding,
      paddingRight: props.padding,
      maxWidth: props.maxWidth ?? undefined,
      marginLeft: props.margin[0],
      marginRight: props.margin[1],
    },
  }
}
const useStyles = createUseStyles({
  root: {
    width: '100%',
    display: 'block',
    boxSizing: 'border-box',
  },
})

const defaultElement = 'div'

export interface ContainerBaseProps
  extends React.ComponentPropsWithRef<typeof defaultElement>,
    UseDynamicContainerParams {
  /**
   * CSS классы компонента
   */
  classes?: Partial<Classes>
}

export type ContainerProps<
  E extends React.ElementType = typeof defaultElement
> = PolymorphicComponentProps<E, ContainerBaseProps>

export const Container = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      classes,
      as,
      children,
      maxWidth: maxWidthProps,
      className,
      disableMargins = false,
      fixed = false,
      justify = 'center',
      margin,
      ref,
      style,
      ...rest
    }: ContainerProps<E>,
    innerRef: typeof ref
  ) => {
    const params = useDynamicContainer({
      maxWidth: maxWidthProps,
      fixed,
      justify,
      disableMargins,
      margin,
    })

    const classList = useStyles()
    const dynamicStyles = getDynamicStyles(params)

    const classesMap: Required<Classes> = {
      root: clsx(className, classList.root, classes?.root),
    }

    return (
      <Box
        className={classesMap.root}
        style={{ ...dynamicStyles.root, ...(style ?? {}) }}
        as={as ?? defaultElement}
        {...rest}
        ref={innerRef}
      >
        {children}
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: ContainerProps<E>
) => JSX.Element
