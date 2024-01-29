import * as React from 'react'
import { DateLibAdapterContext } from '../DateLibAdapterProvider'
import type { CustomUtils } from '../utils/customDateLibAdapter'

/**
 * Хук для получения адаптера для работы с датами.
 */
export const useDateLibAdapter = <TDate = unknown>(): CustomUtils<TDate> => {
  const adapter = React.useContext(DateLibAdapterContext)

  if (!adapter) {
    throw new Error(
      [
        'Не найден контекст адаптера библиотеки по работе с датами.',
        'Похоже вы забыли обернуть компонент в DateLibAdapterProvider',
      ].join('\n')
    )
  }

  return adapter as CustomUtils<TDate>
}
