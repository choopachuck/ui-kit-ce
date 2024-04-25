import * as React from 'react'
import { ListItemProps, ListItem } from '@v-uik/list'
import { clsx } from '@v-uik/theme'
import type { ComboboxEvent } from '../interfaces'
import { Divider } from '@v-uik/divider'
import { defaultOptionItemElement } from '../config'

type OptionClasses = {
  option?: string
  optionSmall?: string
  optionMedium?: string
  optionLarge?: string
  optionText?: string
  optionTextTypography?: string
  selectedOption?: string
  optionActive?: string
  optionDisabled?: string
  noOptionsText?: string
  optionLoading?: string
  creatableDivider?: string
  prefix?: string
}

export type OptionItemBaseProps<Option> = {
  isOptionSelected: (option: Option) => boolean
  renderOptionPrefix: (option: Option, isCreating?: boolean) => React.ReactNode
  renderOptionSuffix: (option: Option) => React.ReactNode
  getOptionLabel: (option: Option) => string
  getOptionValue: (option: Option) => string
  isOptionDisabled: (option: Option) => boolean
  isCreatableDivided?: boolean
  option: Option
  active: Option | undefined
  optionClasses: OptionClasses
  inputValue?: string
  isInfoOption?: false
  filteredOptions: Option[]
  formatOptionLabel?: (label: string, inputValue?: string) => React.ReactNode
  setActive: (active: Option | undefined) => void
  onSelectOption: (option: Option, event: ComboboxEvent) => void
  createAriaActiveDescendantId: (value: string) => string
}

type OptionItemStatusProps = {
  isInfoOption: true
  children?: React.ReactNode
}

type OptionItemCommonProps<E extends React.ElementType> = {
  commonOptionItemProps?: ListItemProps<E>
  className?: string
}

export type OptionItemProps<
  Option,
  E extends React.ElementType
> = OptionItemCommonProps<E> &
  (OptionItemStatusProps | OptionItemBaseProps<Option>)

export const OptionItem = <
  Option,
  E extends React.ElementType = typeof defaultOptionItemElement
>(
  props: OptionItemProps<Option, E>
): React.ReactElement => {
  if (!props.isInfoOption) {
    const {
      formatOptionLabel,
      inputValue,
      onSelectOption,
      renderOptionPrefix,
      setActive,
      renderOptionSuffix,
      getOptionValue,
      isOptionSelected,
      isOptionDisabled,
      getOptionLabel,
      active,
      createAriaActiveDescendantId,
      option,
      isCreatableDivided,
      filteredOptions,
      optionClasses,
      className,
      commonOptionItemProps,
    } = props as OptionItemBaseProps<Option> & OptionItemCommonProps<E>
    const {
      classes: classesCommonOptionItemProps,
      ...restCommonOptionItemProps
    } = commonOptionItemProps as ListItemProps<E>

    const label = getOptionLabel(option)
    const optionValue = getOptionValue(option)

    const isSelected = isOptionSelected(option)
    const isOptionActive = active && optionValue === getOptionValue(active)
    const isDisabled = isOptionDisabled(option)

    // id нужен для aria-activedescendant
    const listId = createAriaActiveDescendantId(optionValue)

    const isCreating = (option as Option & { __isCreating__?: boolean })
      .__isCreating__
    const isDivided =
      isCreating && isCreatableDivided && filteredOptions.length > 1

    const rootClassName = clsx(
      className,
      isOptionActive && optionClasses.optionActive
    )

    const classes: ListItemProps<E>['classes'] = {
      listItem: optionClasses.option,
      text: optionClasses.optionText,
      textTypography: optionClasses.optionTextTypography,
      small: optionClasses.optionSmall,
      medium: optionClasses.optionMedium,
      large: optionClasses.optionLarge,
      disabled: optionClasses.optionDisabled,
      selected: optionClasses.selectedOption,
      prefix: optionClasses.prefix,
      ...classesCommonOptionItemProps,
    }

    return (
      <>
        {isDivided && (
          <Divider
            classes={{ root: optionClasses.creatableDivider }}
            direction="horizontal"
          />
        )}
        <ListItem<E>
          classes={classes}
          id={listId}
          role="option"
          aria-selected={isSelected}
          disabled={isDisabled}
          suffix={renderOptionSuffix(option)}
          prefix={renderOptionPrefix(option, isCreating)}
          className={rootClassName}
          onMouseEnter={() => setActive(option)}
          onKeyDown={() => setActive(option)}
          // @ts-ignore
          onMouseDown={(event) => onSelectOption(option, event)}
          {...(restCommonOptionItemProps as ListItemProps<E>)}
        >
          {formatOptionLabel ? formatOptionLabel(label, inputValue) : label}
        </ListItem>
      </>
    )
  }

  const { className, commonOptionItemProps, children } = props

  return (
    <ListItem<E>
      className={className}
      role="option"
      {...(commonOptionItemProps as ListItemProps<E>)}
    >
      {children}
    </ListItem>
  )
}
