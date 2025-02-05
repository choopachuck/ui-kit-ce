import React from 'react'
import { Args } from '@storybook/csf'
import { EnumControls, EnumRadio } from '../../components'
import {
  RenderControlByTypeProps,
  ComputeFieldsProps,
  BaseControlFields,
  ControlStrictInputType,
} from './types'
import { InputNumber, LabelControl, Input, Textarea, Switch } from '@v-uik/base'

export const renderControlByType = ({
  strictInput: { label, name, type },
  onChange,
  value,
}: RenderControlByTypeProps): React.ReactNode => {
  const handleChange = (value: unknown) => {
    onChange(name, value)
  }

  switch (type?.name) {
    case 'enumRadio':
      return (
        <EnumRadio
          label={label}
          values={type.value as unknown as (string | number)[]}
          value={value as string | number}
          onChange={handleChange}
        />
      )
    case 'enum':
      return (
        <EnumControls
          label={label}
          values={type.value as (string | number)[]}
          value={value as string | number}
          onChange={handleChange}
        />
      )
    case 'number':
      return (
        <InputNumber
          fullWidth
          label={label}
          value={value as number}
          precision={0}
          size="sm"
          onChange={handleChange}
        />
      )
    case 'boolean':
      return (
        <LabelControl
          size="sm"
          checked={value as boolean}
          control={<Switch />}
          label={label}
          onChange={() => handleChange(!value)}
        />
      )
    case 'textarea':
      return (
        <Textarea
          fullWidth
          label={label}
          value={value as string}
          onChange={handleChange}
        />
      )
    default:
      return (
        <Input
          fullWidth
          label={label}
          value={value as string}
          size="sm"
          onChange={handleChange}
        />
      )
  }
}

export const computeInputs = <TComponentProps extends Args = Args>({
  overrideFields,
  storyFields,
}: ComputeFieldsProps<TComponentProps>): {
  strictInputs: BaseControlFields<TComponentProps, ControlStrictInputType>
  defaultValues: Partial<TComponentProps>
} => {
  const strictInputs = {} as BaseControlFields<
    TComponentProps,
    ControlStrictInputType
  >
  const defaultValues = {}

  overrideFields?.forEach(({ key, ...rest }) => {
    // @ts-ignore
    strictInputs[key] = {
      ...storyFields?.[key],
      ...rest,
      label:
        (rest?.name as string) || storyFields[key]?.name || (key as string),
      name: key,
    }
    //@ts-ignore
    defaultValues[key as string] = strictInputs?.[key]?.defaultValue as unknown
  })

  return { strictInputs, defaultValues }
}
