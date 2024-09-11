import React from 'react'
import { BoxProps } from '@v-uik/box'
import { TagProps } from '../src/Tag'

type PolymorphicTagDummyProps<E extends React.ElementType = React.ElementType> =
  {
    ref?:
      | ((instance: HTMLElement | null) => void)
      | React.RefObject<HTMLHtmlElement>
      | null
    as?: BoxProps<E>['as']
  } & Omit<TagProps, 'placeholder' | 'ref'>

export const PolymorphicTagDummy: React.FC<PolymorphicTagDummyProps> = () =>
  null
