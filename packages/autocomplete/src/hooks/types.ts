import React from 'react'
import {
  ComboboxEvent,
  Options,
  SingleValue,
  ComboboxProps,
  ComboboxChangeReason,
} from '@v-uik/combo-box'

export interface BaseAutocompleteProps<Option> {
  /**
   * Необходимо ли автозаполнение поля ввода активной опцией?
   */
  backfill?: boolean
  /**
   * Определяет, какие буквы будут выделены в процессе нахождения совпадений
   */
  selectionFormat?: 'typed' | 'suggested'
  /**
   * Доступные опции
   */
  options?: Options<Option> | string[]
  /**
   * Хранилище опции (такое же, что и у компонента ComboBox, но с новым типом)
   */
  value?: SingleValue<string>
  /**
   * Обработчик события выбора опции (тот же, что и у компонента ComboBox, но с новыми типами)
   */
  onChange?: (
    value: string,
    event: ComboboxEvent,
    reason?: ComboboxChangeReason
  ) => void
}

type OverrideComboboxKeys =
  | 'onChange'
  | 'value'
  | 'multiple'
  | 'backfill'
  | 'disableCloseOnSelect'
  | 'isSearchable'

const defaultListElement = 'ul'
const defaultListItemElement = 'li'

export type AutocompleteProps<
  Option,
  ListElement extends React.ElementType = typeof defaultListElement,
  ListItemElement extends React.ElementType = typeof defaultListItemElement
> = Omit<
  ComboboxProps<Option, ListElement, ListItemElement>,
  OverrideComboboxKeys
> &
  BaseAutocompleteProps<Option>
