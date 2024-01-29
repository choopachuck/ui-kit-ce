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
    const comboBoxProps = useAutocomplete(autocompleteProps)
    const hiddenProps: IHiddenPropsContext = React.useMemo(
      () => ({
        backfill: props.backfill ?? true,
        recoveryBackfillInputValue: (handler: (inputValue: string) => void) =>
          handler(autocompleteProps.inputValue ?? ''),
      }),
      [props.backfill, autocompleteProps.inputValue]
    )

    return (
      <HiddenPropsContext.Provider value={hiddenProps}>
        <ComboBox ref={ref} {...comboBoxProps} />
      </HiddenPropsContext.Provider>
    )
  }
)
