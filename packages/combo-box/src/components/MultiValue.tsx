'use client'

import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Tag, TagProps } from '@v-uik/tag'
import { ElementSizeType, ComponentPropsWithRefFix } from '@v-uik/common'
import { CommonProps } from '../interfaces'

const useStyles = createUseStyles((theme) => ({
  tag: {
    overflow: 'hidden',
    margin: [2, 6, 2, 2],
  },

  tagText: {
    display: 'block',
  },

  focused: {
    zIndex: 1,
    boxShadow: `0 0 0 2px ${theme.comp.tag.colorShadowFocus}`,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      borderStyle: theme.shape.borderStyle,
      borderWidth: theme.shape.borderWidth,
      borderColor: theme.comp.tag.colorBorderFocus,
    },
  },
}))

type Classes = Partial<Record<'tag' | 'tagText' | 'focused', string>>

export type MultiValueProps<Option> = {
  children: React.ReactNode
  classes?: Classes
  size?: ElementSizeType
  isDisabled?: boolean
  isFocused?: boolean
  onDelete?: (e: React.MouseEvent<HTMLSpanElement>) => void
  deleteButtonProps?: ComponentPropsWithRefFix<'span'>
} & CommonProps<Option>

export const MultiValue = <Option,>({
  children,
  classes,
  isDisabled,
  isFocused,
  onDelete,
  deleteButtonProps,
}: MultiValueProps<Option>): JSX.Element => {
  const classesList = useStyles()

  const classesMap = useClassList<typeof classesList, Classes>(
    classesList,
    classes
  )

  const tagClasses: TagProps['classes'] = {
    tag: classesMap.tag,
    text: classesMap.tagText,
  }

  return (
    <Tag
      selected
      className={isFocused ? classesMap.focused : ''}
      disabled={isDisabled}
      classes={tagClasses}
      size="sm"
      kind="lite"
      deleteButtonProps={deleteButtonProps}
      onDelete={onDelete as TagProps['onDelete']}
    >
      {children}
    </Tag>
  )
}
