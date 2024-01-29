import React from 'react'

/**
 * Утилитарный хук для всяких переключалок
 */
export const useToggle = (defaultValue: boolean): [boolean, () => void] => {
  const [toggled, setToggle] = React.useState(defaultValue)
  const toggle = () => setToggle(!toggled)

  return [toggled, toggle]
}
