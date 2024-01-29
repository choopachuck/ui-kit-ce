import React, { PropsWithChildren } from 'react'
import { ComboBox } from './ComboBox'
import { defaultOptionItemElement } from './config'
import { useCreatable, useStateManager, CreatableProps } from './hooks'

export const Creatable = React.forwardRef(
  <
    Option,
    ListElement extends React.ElementType,
    IsMulti extends boolean = false,
    ListItemElement extends React.ElementType = typeof defaultOptionItemElement
  >(
    props: PropsWithChildren<
      CreatableProps<Option, ListElement, IsMulti, ListItemElement>
    >,
    ref: React.Ref<HTMLDivElement>
  ) => {
    //@ts-ignore
    const creatableProps = useStateManager(props) as CreatableProps<
      Option,
      ListElement,
      IsMulti,
      ListItemElement
    >

    const comboBoxProps = useCreatable(creatableProps)

    return <ComboBox ref={ref} {...comboBoxProps} />
  }
) as <
  Option,
  ListElement extends React.ElementType,
  IsMulti extends boolean = false,
  ListItemElement extends React.ElementType = typeof defaultOptionItemElement
>(
  props: CreatableProps<Option, ListElement, IsMulti, ListItemElement>,
  ref: React.Ref<HTMLDivElement>
) => JSX.Element
