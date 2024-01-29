import * as React from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): readonly [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)

      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  }, [storedValue, key])

  return [storedValue, setValue] as const
}
