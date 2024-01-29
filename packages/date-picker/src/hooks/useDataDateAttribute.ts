import { CustomUtils } from '../utils/customDateLibAdapter'
import { useGeneratedId } from '@v-uik/hooks'
import * as React from 'react'
import { useDateLibAdapter } from './useDateLibAdapter'
import { useComponentIdContext } from '../utils/ComponentIdContext'

export type UseDataDateAttributeReturnType<TDate extends unknown> = {
  generateDataDateAttribute: (date: TDate) => string
  parseDataDateAttribute: (stringDate: string) => TDate | null
}

/**
 * Хук для генерации/парсинга значений атрибута
 * data-date=10.11.2022(<сгенерированный id>)
 * (кроме формата 10.11.2022 может быть формат месяца и года).
 * Данный атрибут нужен для навигации с помощью стрелок по календарю
 * @param format - формат, выбранный пользователем из adapter.formats
 * @param [id] - системный id компонента
 */
export const useDataDateAttribute = <TDate extends unknown>(
  format: keyof CustomUtils<TDate>['formats'],
  id?: string | undefined
): UseDataDateAttributeReturnType<TDate> => {
  const idFromContext = useComponentIdContext()
  const componentSystemId = useGeneratedId(id ?? idFromContext)
  const adapter = useDateLibAdapter<TDate>()

  /**
   * Функция генерирует строку даты по формату
   */
  const generateDataDateAttribute = React.useCallback(
    (date: TDate): string => {
      return `${adapter.format(date, format)}(${String(componentSystemId)})`
    },
    [adapter, componentSystemId, format]
  )

  /**
   * Функция парсит строку даты по формату
   */
  const parseDataDateAttribute = React.useCallback(
    (stringDate: string): TDate | null => {
      return adapter.parse(
        stringDate.replace(/\(.+\)/, ''),
        adapter.formats[format]
      )
    },
    [adapter, format]
  )

  return React.useMemo(
    () => ({
      generateDataDateAttribute,
      parseDataDateAttribute,
    }),
    [generateDataDateAttribute, parseDataDateAttribute]
  )
}
