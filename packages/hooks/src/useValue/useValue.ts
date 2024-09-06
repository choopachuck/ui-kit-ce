import React from 'react'

export function useValue<T, V>(
  valueProp: V,
  options: {
    fallbackValue?: T
    formatValueFromProp?: (value: V) => T
    useInnerState?: boolean
  }
): [T, React.Dispatch<React.SetStateAction<T>>]
export function useValue<T>(
  valueProp: T | undefined,
  options: { fallbackValue?: T }
): [T, React.Dispatch<React.SetStateAction<T>>]
export function useValue<T>(
  valueProp: T
): [T, React.Dispatch<React.SetStateAction<T>>]

export function useValue<T>(
  valueProp?: T,
  options?: {
    fallbackValue?: T
    formatValueFromProp?: (v: unknown) => T
    useInnerState?: boolean
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [stateValue, setStateValue] = React.useState<T>(
    options?.formatValueFromProp?.(valueProp) ?? (valueProp as T)
  )
  const prevRef = React.useRef<T>()

  const isFirstRenderRef = React.useRef(true)

  React.useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false

      return
    }

    prevRef.current = valueProp
  }, [valueProp])

  React.useLayoutEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false

      return
    }

    if (options?.useInnerState && valueProp) {
      setStateValue(options?.formatValueFromProp?.(valueProp) ?? valueProp)
    }
  }, [options?.useInnerState])

  const finalValue = React.useMemo(() => {
    const formattedValueFromProp =
      options?.formatValueFromProp?.(valueProp) ?? valueProp

    return (((prevRef.current === undefined && valueProp === undefined) ||
    options?.useInnerState
      ? stateValue
      : formattedValueFromProp) ?? options?.fallbackValue) as T
  }, [
    valueProp,
    options?.fallbackValue,
    options?.formatValueFromProp,
    options?.useInnerState,
    stateValue,
  ])

  return [finalValue, setStateValue]
}
