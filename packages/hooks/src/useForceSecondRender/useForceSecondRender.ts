import React from 'react'

/**
 * Триггерит второй цикл рендера после по условию.
 * Нужно, например чтобы dropdown получил обновленный ref в anchor.
 */
export const useForceSecondRender = (trigger?: boolean): void => {
  const [, setState] = React.useState({})

  React.useEffect(() => {
    if (trigger) {
      setState({})
    }
  }, [])
}
