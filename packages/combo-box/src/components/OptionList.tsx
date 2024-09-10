import React from 'react'
import {
  ListProps,
  List,
  ListItemGroup,
  ListItemGroupProps,
  ListItemProps,
} from '@v-uik/list'
import {
  CommonProps,
  GroupType,
  ComboboxEvent,
  ComboBoxInputEvent,
} from '../interfaces'
import { defaultOptionItemElement, defaultOptionListElement } from '../config'

import { OptionItemBaseProps, OptionItemProps } from './OptionItem'

export type OptionListProps<
  Option,
  E extends React.ElementType,
  O extends React.ElementType
> = CommonProps<Option> & {
  groupedOptions?: GroupType<Option>[]
  groupBy?: (option: Option) => string

  noOptionsText?: React.ReactNode | null

  commonOptionItemProps: ListItemProps<O>
  OptionItemComponent: React.ComponentType<OptionItemProps<Option, O>>

  loadingLabel?: React.ReactNode
  loading?: boolean
  listProps: Omit<ListProps<E>, 'children'>
  getListItemGroupProps?: (
    groupName: string,
    options: Option[]
  ) => Omit<ListItemGroupProps<O>, 'children'>
  handleChangeInputValue: (value: string, event?: ComboBoxInputEvent) => void
  handleClear: (event: ComboboxEvent) => void
  inputRef: React.RefObject<HTMLInputElement>
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
  getListItemGroupProps,
  loadingLabel,
  loading,
  OptionItemComponent,
  ...props
}: OptionListProps<Option, E, O>): React.ReactElement<
  OptionListProps<Option, E, O>
> => {
  const renderGroupOptions = () => {
    if (groupBy && groupedOptions) {
      return groupedOptions.map(({ key, group, options }) => (
        <ListItemGroup
          key={key}
          label={group}
          {...(getListItemGroupProps?.(group, options) as
            | Omit<
                ListItemGroupProps<typeof defaultOptionItemElement>,
                'children'
              >
            | undefined)}
        >
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
    const withoutSystemOptions = props.filteredOptions?.filter(
      (option) =>
        !(option as typeof option & { __isCreating__: boolean }).__isCreating__
    )

    if (
      (groupBy && groupedOptions?.length === 0) ||
      (!groupBy && withoutSystemOptions?.length === 0 && noOptionsText)
    ) {
      return (
        <OptionItemComponent
          isInfoOption
          className={optionClasses.noOptionsText}
          commonOptionItemProps={commonOptionItemProps}
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
        commonOptionItemProps={commonOptionItemProps}
        {...props}
      />
    )
  }

  const renderLoadingLabel = () => {
    return (
      <OptionItemComponent
        isInfoOption
        className={optionClasses.optionLoading}
        commonOptionItemProps={commonOptionItemProps}
      >
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
          {renderNoOptionsText()}
          {renderOptions()}
        </>
      )}
    </List>
  )
}
