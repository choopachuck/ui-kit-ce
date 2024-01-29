import React, { ReactNode } from 'react'
import { Accessors } from '../../interfaces'
import { cleanFullValue, cleanValue, valueTernary } from '../../utils'
import { getOptionValue as baseGetOptionValue } from '../../builtins'
import { getOptionLabel as baseGetOptionLabel } from '../../builtins'
import { ComboboxProps } from '../../ComboBox'
import { CreatableProps } from './types'
import { defaultOptionItemElement } from '../../config'

const compareOption = <Option>(
  inputValue: string,
  option: Option,
  accessors: Accessors<Option>
) => {
  const candidate = String(inputValue).toLowerCase()
  const optionValue = String(accessors.getOptionValue(option)).toLowerCase()
  const optionLabel = String(accessors.getOptionLabel(option)).toLowerCase()

  return optionValue === candidate || optionLabel === candidate
}

const builtins = {
  formatLabel: (inputValue: string) => `"${inputValue}"`,
  isValidNewOption: <Option>(
    inputValue: string,
    selectedOption: Option[],
    options: Option[],
    accessors: Accessors<Option>
  ) =>
    !(
      !inputValue ||
      selectedOption.some((option) =>
        compareOption(inputValue, option, accessors)
      ) ||
      options.some((option) => compareOption(inputValue, option, accessors))
    ),
  getNewOption: <Option>(inputValue: string, optionLabel: ReactNode): Option =>
    ({
      label: optionLabel,
      value: inputValue,
    } as unknown as Option),
}

export function useCreatable<
  Option,
  ListElement extends React.ElementType,
  IsMulti extends boolean,
  ListItem extends React.ElementType = typeof defaultOptionItemElement
>({
  newOptionPosition = 'last',
  formatLabel = builtins.formatLabel,
  isValidNewOption = builtins.isValidNewOption,
  getNewOption = builtins.getNewOption,
  onCreateOption,
  options: propsOptions = [],
  onChange: propsOnChange,
  value: propsValue,
  isSearchable = true,
  isCreatableDivided = true,
  ...restComboBoxProps
}: CreatableProps<Option, ListElement, IsMulti, ListItem>): ComboboxProps<
  Option,
  ListElement,
  ListItem
> {
  const {
    getOptionValue = baseGetOptionValue,
    getOptionLabel = baseGetOptionLabel,
    inputValue = '',
    multiple = false,
  } = restComboBoxProps

  // новая опция для массива опций
  const newOption = React.useMemo(() => {
    return isValidNewOption(inputValue, cleanValue(propsValue), propsOptions, {
      getOptionValue,
      getOptionLabel,
    })
      ? {
          ...getNewOption(inputValue, formatLabel(inputValue)),
          __isCreating__: true,
        }
      : undefined
  }, [
    formatLabel,
    inputValue,
    propsValue,
    propsOptions,
    isValidNewOption,
    getNewOption,
    getOptionValue,
    getOptionLabel,
  ])

  // новый массив опций
  const options = React.useMemo(() => {
    if (newOption) {
      return newOptionPosition === 'first'
        ? [newOption, ...propsOptions]
        : [...propsOptions, newOption]
    } else {
      return propsOptions
    }
  }, [newOption, newOptionPosition, propsOptions])

  // добавление новой опции
  const onChange = React.useCallback(
    (
      //TODO: уйдет, когда полностью перейдем на Options<Option>
      _newValue,
      event,
      fullValue
    ) => {
      const valueArray = Array.isArray(fullValue) ? fullValue : [fullValue]
      if (newOption && valueArray[valueArray.length - 1] === newOption) {
        if (onCreateOption) {
          onCreateOption(inputValue)
        } else {
          // новая опция без отформатированного label
          const newOption = {
            ...getNewOption(inputValue, inputValue),
            __isNew__: true,
          }
          propsOnChange?.(
            //@ts-ignore
            valueTernary(
              multiple,
              [
                ...cleanFullValue(fullValue, newOption, { getOptionValue }),
                newOption,
              ],
              newOption
            ),
            event
          )
        }

        return
      }

      propsOnChange?.(fullValue, event)
    },
    [
      inputValue,
      newOption,
      getNewOption,
      propsOnChange,
      onCreateOption,
      multiple,
      getOptionValue,
    ]
  )

  //@ts-ignore
  return {
    ...restComboBoxProps,
    //@ts-ignore
    value: propsValue,
    options,
    isSearchable,
    isCreatableDivided,
    onChange,
  }
}
