import React from 'react'
import { ListProps, List, ListItemGroup, ListItemProps } from '@v-uik/list'
import { CommonProps, GroupType } from '../interfaces'
import { defaultOptionItemElement, defaultOptionListElement } from '../config'

import { OptionItemBaseProps, OptionItemProps } from './OptionItem'

export type OptionListProps<
  Option,
  E extends React.ElementType,
  O extends React.ElementType
> = CommonProps<Option> & {
  groupedOptions?: GroupType<Option>[]
  groupBy?: (option: Option) => string

  noOptionsText?: string

  commonOptionItemProps: ListItemProps<O>
  OptionItemComponent: React.ComponentType<OptionItemProps<Option, O>>

  loadingLabel?: React.ReactNode
  loading?: boolean
  listProps: Omit<ListProps<E>, 'children'>
} & Omit<OptionItemBaseProps<Option>, 'option'>

export const OptionList = <
  Option,
  E extends React.ElementType = typeof defaultOptionListElement,
  O extends React.ElementType = typeof defaultOptionItemElement
>({
  groupBy,
  groupedOptions,
  optionClasses,
  noOptionsText,
  commonOptionItemProps,
  listProps,
  loadingLabel,
  loading,
  OptionItemComponent,
  ...props
}: OptionListProps<Option, E, O>): React.ReactElement => {
  const renderGroupOptions = () => {
    if (groupBy && groupedOptions) {
      return groupedOptions.map(({ key, group, options }) => (
        <ListItemGroup key={key} label={group}>
          {options.map((option) => renderListOption(option))}
        </ListItemGroup>
      ))
    }

    return undefined
  }

  const renderOptions = () => {
    if (!groupBy) {
      return props.filteredOptions.map((option) => renderListOption(option))
    }

    return undefined
  }

  const renderNoOptionsText = () => {
    if (
      (groupBy && groupedOptions?.length === 0) ||
      (!groupBy && props.filteredOptions?.length === 0)
    ) {
      return (
        <OptionItemComponent
          isInfoOption
          className={optionClasses.noOptionsText}
        >
          {noOptionsText}
        </OptionItemComponent>
      )
    }

    return undefined
  }

  const renderListOption = (option: Option) => {
    const optionValue = props.getOptionValue(option)

    return (
      <OptionItemComponent
        key={optionValue}
        option={option}
        optionClasses={optionClasses}
        {...props}
      />
    )
  }

  const renderLoadingLabel = () => {
    return (
      <OptionItemComponent isInfoOption className={optionClasses.optionLoading}>
        {loadingLabel}
      </OptionItemComponent>
    )
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <List<ListElement> interactive={false} role="list" {...listProps}>
      {loading ? (
        renderLoadingLabel()
      ) : (
        <>
          {renderGroupOptions()}
          {renderOptions()}
          {renderNoOptionsText()}
        </>
      )}
    </List>
  )
}
