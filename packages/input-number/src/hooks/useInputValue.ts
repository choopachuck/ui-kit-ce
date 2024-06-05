import React from 'react'

type ValueType = string | number | null | undefined

// useValue из v-uik/hooks не используется намеренно, т.к. в InputValue своя логика работы
export function useInputValue(
  valueProp: ValueType,
  formatValueFromProp: (value: ValueType) => string,
  toString: (value: string) => string | null
): [string, React.Dispatch<React.SetStateAction<string>>, () => void] {
  const [stateValue, setStateValue] = React.useState<string>(
    formatValueFromProp(valueProp)
  )
  const prevRef = React.useRef<ValueType>()
  React.useEffect(() => {
    prevRef.current = valueProp
  }, [valueProp])

  const formattedValueFromProp = formatValueFromProp(valueProp)

  const finalValue = React.useMemo(() => {
    if (
      (prevRef.current === undefined && valueProp === undefined) ||
      formatValueFromProp(toString(stateValue)) === formattedValueFromProp
    ) {
      return stateValue
    }

    return formattedValueFromProp
  }, [
    formattedValueFromProp,
    stateValue,
    toString,
    formatValueFromProp,
    valueProp,
  ])

  const onInputBlur = React.useCallback(() => {
    // format final value, when user leaves input
    setStateValue(formatValueFromProp(toString(stateValue)))
  }, [formatValueFromProp, toString, stateValue])

  return [finalValue, setStateValue, onInputBlur]
}
