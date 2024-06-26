import { useValue } from '@v-uik/hooks'
import React from 'react'
import { ComboboxProps } from '../ComboBox'
import { defaultOptionItemElement } from '../config'
import { ComboboxEvent, ComboboxChangeReason } from '../interfaces'

type SingleProps<Option> = {
  /**
   * Текущее значение
   */
  value?: Option | null
  /**
   * Обработчик события выбора опции (тот же, что и у combo box'a, но с новыми типами)
   */
  onChange?: (
    value: Option | null,
    event: ComboboxEvent,
    reason?: ComboboxChangeReason
  ) => void
}

type MultipleProps<Option> = {
  /**
   * Текущее значение
   */
  value?: Option[]
  /**
   * Обработчик события выбора опции (тот же, что и у combo box'a, но с новыми типами)
   */
  onChange?: (
    value: Option[],
    event: ComboboxEvent,
    reason?: ComboboxChangeReason
  ) => void
}

type TruncateProps<Option, IsMulti extends boolean> = IsMulti extends true
  ? MultipleProps<Option>
  : SingleProps<Option>

export type StateManagerComboboxProps<
  Option,
  ListElement extends React.ElementType,
  IsMulti extends boolean,
  ListItemElement extends React.ElementType = typeof defaultOptionItemElement
> = Omit<
  ComboboxProps<Option, ListElement, ListItemElement>,
  'multiple' | 'value' | 'onChange'
> &
  TruncateProps<Option, IsMulti> & {
    /**
     * Включить мультивыбор
     */
    multiple?: IsMulti
  }

/**
 * Хук используется для вынесения некоторых состояний combo box'a на уровень выше, с последующим прокидыванием в него
 */
export function useStateManager<
  Option,
  ListElement extends React.ElementType,
  IsMulti extends boolean,
  T extends StateManagerComboboxProps<
    Option,
    ListElement,
    IsMulti,
    ListItemElement
  >,
  ListItemElement extends React.ElementType = typeof defaultOptionItemElement
>({
  inputValue: propsInputValue,
  onInputChange: propsOnInputChange,
  onChange: propsOnChange,
  value: propsValue,
  ...restComboBoxProps
}: T): T {
  const [inputValue, setInputValue] = useValue(propsInputValue, {
    fallbackValue: '',
  })

  const onInputChange = React.useCallback(
    (value: string, ...rest) => {
      propsOnInputChange?.(value, ...rest)

      setInputValue(value)
    },
    [propsOnInputChange]
  )

  const [value, setValue] = useValue(propsValue, { fallbackValue: null })

  const onChange = React.useCallback(
    (value, event, reason) => {
      if (typeof propsOnChange === 'function') {
        propsOnChange?.(value, event, reason)
      }
      setValue(value)
    },
    [propsOnChange]
  )

  //@ts-ignore
  return {
    ...restComboBoxProps,
    inputValue,
    onInputChange,
    onChange,
    value,
  }
}
