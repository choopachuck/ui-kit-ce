import React from 'react'
import {
  ComboBox,
  useStateManager,
  HiddenPropsContext,
  IHiddenPropsContext,
} from '@v-uik/combo-box'
import { AutocompleteProps, useAutocomplete } from './hooks'
import { defaultOptionListElement, defaultOptionItemElement } from './config'

export const Autocomplete = React.forwardRef(
  <
    Option,
    ListElement extends React.ElementType = typeof defaultOptionListElement,
    ListItemElement extends React.ElementType = typeof defaultOptionItemElement
  >(
    props: AutocompleteProps<Option, ListElement, ListItemElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    //@ts-ignore
    const autocompleteProps = useStateManager(props) as AutocompleteProps<
      Option,
      ListElement,
      ListItemElement
    >
    const { currentValue, ...comboBoxProps } =
      useAutocomplete(autocompleteProps)
    const hiddenProps: IHiddenPropsContext = React.useMemo(
      () => ({
        backfill: props.backfill ?? true,
        recoveryBackfillInputValue: (handler: (inputValue: string) => void) =>
          handler(autocompleteProps.inputValue ?? ''),
        shouldClearValue: (value) => {
          return value !== currentValue.current
        },
        isAutocomplete: true,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.backfill, autocompleteProps.inputValue]
    )

    return (
      <HiddenPropsContext.Provider value={hiddenProps}>
        <ComboBox ref={ref} {...comboBoxProps} />
      </HiddenPropsContext.Provider>
    )
  }
)
