import React from 'react'
import {
  ComboboxEvent,
  MultiValue,
  SingleValue,
  ComboBoxInputEvent,
  createFilter,
  FilterOption,
  toOption,
  toString,
  ComboboxProps,
  getOptionLabel as baseGetOptionLabel,
  ComboboxChangeReason,
} from '@v-uik/combo-box'
import { DATA_V_UIK_INPUT_TYPE } from '@v-uik/common'
import { typed, suggested } from '../utils'
import { AutocompleteProps } from './types'
import { useValue } from '@v-uik/hooks'
import { defaultOptionListElement, defaultOptionItemElement } from '../config'

const clearValue = <Option>(
  option: SingleValue<Option> | SingleValue<string> | undefined
) => {
  if (!option) {
    return ''
  }

  return option
}

export function useAutocomplete<
  Option,
  ListElement extends React.ElementType = typeof defaultOptionListElement,
  ListItemElement extends React.ElementType = typeof defaultOptionItemElement
>({
  options: propsOptions = [],
  value: propsValue,
  inputValue: propsInputValue,
  onChange: propsOnChange,
  onInputChange: propsOnInputChange,
  selectionFormat = 'typed',
  getOptionLabel = baseGetOptionLabel,
  formatOptionLabel: propsFormatOptionLabel,
  filterOption: propsFilterOption = createFilter(),
  opened: propsOpened,
  showArrow = false,
  showCheckMark = false,
  openOnClick = true,
  ...restComboBoxProps
}: AutocompleteProps<Option, ListElement, ListItemElement>): ComboboxProps<
  Option,
  ListElement,
  ListItemElement
> {
  const [inputValue] = useValue(propsValue, { fallbackValue: '' })

  // новая фильтрация опций, это необходимо чтобы фильтрация работала только по изменению inputValue через клавиатуру
  const filterOption = React.useCallback(
    (option: FilterOption<Option>) => {
      // propsInputValue всегда будет строкой, т.к. попадает сюда из useStateManager, но типизация ComboBox'a не позволяет однозначно определить как строку
      return propsFilterOption(option, propsInputValue ?? '')
    },
    [propsInputValue, propsFilterOption]
  )

  // переопределенный onChange с нужными combobox'у параметрами
  const onChange = React.useCallback(
    (
      //TODO: уйдет, когда полностью перейдем на Options<Option>
      _newValue: string | string[],
      event: ComboboxEvent,
      fullValue?: MultiValue<Option> | SingleValue<Option>,
      reason?: ComboboxChangeReason
    ) => {
      propsOnChange?.(
        toString(
          clearValue(fullValue as SingleValue<Option> | SingleValue<string>),
          getOptionLabel
        ),
        event,
        reason
      )
    },
    [propsOnChange, getOptionLabel]
  )

  const onInputChange = React.useCallback(
    (value: string, event?: ComboBoxInputEvent) => {
      if (event !== 'select-clear') {
        propsOnInputChange?.(value)
        propsOnChange?.(value, null as unknown as ComboboxEvent)
      }
    },
    [propsOnChange, propsOnInputChange]
  )

  const options = React.useMemo(
    () => propsOptions.map((x) => toOption(x)),
    [propsOptions]
  )

  // переопределенный formatOptionLabel, который работает со значением inputValue, измененным через клавиатуру
  const formatOptionLabel = React.useCallback(
    (label: string) => {
      if (propsFormatOptionLabel) {
        return propsFormatOptionLabel(label, propsInputValue)
      }

      if (!propsInputValue) {
        return label
      }

      const formattedInputValue = propsInputValue.toLocaleLowerCase()

      return selectionFormat === 'typed'
        ? typed(label, formattedInputValue)
        : suggested(label, formattedInputValue)
    },
    [selectionFormat, propsInputValue, propsFormatOptionLabel]
  )

  const opened = React.useMemo(() => {
    if (propsOpened !== undefined) {
      return propsOpened
    }

    return inputValue.length ? undefined : false
  }, [inputValue, propsOpened])

  // на дает переопределить multiple
  //@ts-ignore
  return {
    ...restComboBoxProps,

    isSearchable: true,
    multiple: false,

    options,
    inputValue,
    onChange,
    onInputChange,
    filterOption,
    formatOptionLabel,
    opened,
    showArrow,
    showCheckMark,
    openOnClick,
    inputProps: {
      //@ts-ignore Компонент корректно принимает data-атрибуты
      [DATA_V_UIK_INPUT_TYPE]: 'autocomplete',
      ...restComboBoxProps?.inputProps,
    },
  }
}
