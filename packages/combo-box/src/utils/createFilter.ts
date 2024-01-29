export type FilterOption<Option> = {
  label: string
  value: string
  option: Option
}

type Config<Option> = {
  /**
   * Игнорирование регистра
   */
  ignoreCase?: boolean
  /**
   * Строка по которой идет поиск
   * @default option.label и option.value
   */
  stringify?: (option: FilterOption<Option>) => string
  /**
   * обрезать пробелы и отступы
   */
  trim?: boolean
  /**
   * искать вхождения по всей строке или по началу строки
   */
  matchFrom?: 'any' | 'start'
}

const trimString = (str: string) => str.replace(/^\s+|\s+$/g, '')
const defaultStringify = <Option>(option: FilterOption<Option>) =>
  `${option.label} ${option.value}`

export const createFilter =
  <Option>(config?: Config<Option>) =>
  (option: FilterOption<Option>, rawInput: string): boolean => {
    // чтобы возможность создавать опции всегда присутствовала, в не зависимости как мы конфигурируем поиск
    if ((option.option as { __isCreating__?: unknown }).__isCreating__) {
      return true
    }
    const { ignoreCase, stringify, trim, matchFrom } = {
      ignoreCase: true,
      stringify: defaultStringify,
      trim: true,
      matchFrom: 'any',
      ...config,
    }
    let input = trim ? trimString(rawInput) : rawInput

    let candidate = trim ? trimString(stringify(option)) : stringify(option)

    if (ignoreCase) {
      input = input.toLowerCase()
      candidate = candidate.toLowerCase()
    }

    return matchFrom === 'start'
      ? candidate.substr(0, input.length) === input
      : candidate.indexOf(input) > -1
  }
