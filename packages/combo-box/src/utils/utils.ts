import { Accessors, MultiValue, Options, SingleValue } from '../interfaces'

export const valueTernary = <Option>(
  isMulti: boolean,
  multiValue: MultiValue<Option>,
  singleValue: SingleValue<Option>
): SingleValue<Option> | MultiValue<Option> => {
  return isMulti ? multiValue : singleValue
}

export const isArrayOfStrings = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) &&
    !!value.length &&
    value.every((item) => typeof item === 'string')
  )
}

export const formatValueToOption = <Option>(
  valueProp: string | string[] | Option | Options<Option> | undefined,
  options: Options<Option>,
  getOptionValue: (value: Option) => string
): Options<Option> => {
  if (valueProp === undefined || valueProp === null) {
    return []
  }

  if (isArrayOfStrings(valueProp)) {
    return valueProp
      .map((item) => {
        return options.find((option) => getOptionValue(option) === item) ?? null
      })
      .filter((option) => !!option) as Options<Option>
  }

  if (typeof valueProp === 'string' && valueProp.length > 0) {
    const findOption = options.find(
      (option) => getOptionValue(option) === valueProp
    )

    return findOption ? [findOption] : []
  }

  if (Array.isArray(valueProp)) {
    return valueProp
  }

  if (!Array.isArray(valueProp) && typeof valueProp !== 'string') {
    return [valueProp]
  }

  return []
}

export const cleanFullValue = <Option>(
  fullValue: MultiValue<Option> | SingleValue<Option> | undefined,
  newOption: Option,
  { getOptionValue }: Pick<Accessors<Option>, 'getOptionValue'>
): Options<Option> => {
  if (Array.isArray(fullValue)) {
    return fullValue.filter(
      (x) => getOptionValue(x) !== getOptionValue(newOption)
    )
  }

  return []
}

export const cleanValue = <Option>(
  value: SingleValue<Option> | MultiValue<Option> | undefined
): Options<Option> => {
  if (Array.isArray(value)) {
    return value.filter(Boolean) as Options<Option>
  }
  if (typeof value === 'object' && value !== null) {
    return [value] as Options<Option>
  }

  return []
}

export const isOption = <Option>(
  option: SingleValue<Option> | SingleValue<string>
): option is Option => {
  return typeof option !== 'string'
}

export const toOption = <Option>(
  option: SingleValue<Option> | SingleValue<string>
): Option => {
  if (isOption(option)) {
    return option
  } else {
    return {
      label: option,
      value: option,
    } as unknown as Option
  }
}

export const toString = <Option>(
  option: Option | string,
  getOptionLabel: (option: Option) => string
): string => {
  if (isOption(option)) {
    return getOptionLabel(option)
  } else {
    return option
  }
}

export function isCounter(limitTags?: number | null): boolean {
  return limitTags === 0 || limitTags === null
}
