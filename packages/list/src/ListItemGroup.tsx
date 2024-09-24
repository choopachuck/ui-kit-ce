'use client'

import * as React from 'react'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { useClassList, useGeneratedId } from '@v-uik/hooks'
import { ListItem } from './ListItem'

import { createUseStyles, clsx } from '@v-uik/theme'
import { useListStyles } from './styles'

const useStyles = createUseStyles((theme) => ({
  label: {
    color: theme.comp.listItemGroup.colorText,
  },
  text: {
    '&$textTypography': {
      fontFamily: theme.comp.listItemGroup.typographyFontFamily,
      fontWeight: theme.comp.listItemGroup.typographyFontWeight,
      fontSize: theme.comp.listItemGroup.typographyFontSize,
      lineHeight: theme.comp.listItemGroup.typographyLineHeight,
      letterSpacing: theme.comp.listItemGroup.typographyLetterSpacing,
    },
  },
  groupList: {
    padding: 0,
  },
  textTypography: {},
}))

export interface ListItemGroupOwnProps {
  /**
   * CSS классы для стилизации.
   */
  classes?: ReturnType<typeof useStyles>
  /**
   * Имя группы, которое будет отображено заголовком для группы.
   */
  label: string
}

export const DATA_TYPE_GROUP = 'optgroup'

export type ListItemGroupProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, ListItemGroupOwnProps>

const defaultElement = 'li'

export const ListItemGroup = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    { classes, label, children, className, ...rest }: ListItemGroupProps<E>,
    ref: React.Ref<HTMLLIElement>
  ) => {
    const listClassesList = useListStyles()
    const classesList = useStyles()
    const cl = useClassList(classesList, classes)
    const id = useGeneratedId()

    return (
      <Box
        role="group"
        aria-labelledby={id}
        as="ul"
        className={clsx(listClassesList.list, classesList.groupList)}
        data-type={DATA_TYPE_GROUP}
      >
        {label && (
          <ListItem<typeof defaultElement>
            ref={ref}
            disabled
            {...rest}
            role="presentation"
            id={id}
            className={clsx(className, cl.label)}
            classes={{
              text: classesList.text,
              textTypography: classesList.textTypography,
            }}
          >
            {label}
          </ListItem>
        )}
        {children}
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: ListItemGroupProps<E>
) => JSX.Element
