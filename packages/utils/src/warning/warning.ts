const isProduction = process.env.NODE_ENV === 'production'
const isTesting = process.env.TESTING === 'true'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-empty-function
const noop = () => {}

/**
 * Вывод ошибки в консоль
 * @param valid - условие вывода
 * @param message - сообщение для отображения
 */
const printError = (valid: boolean, message: string): void => {
  // Support uglify
  if (!isProduction && !valid && console !== undefined && !isTesting) {
    console.error(`Warning: ${message}`)
  }
}

export const warning = !isProduction
  ? (valid: boolean, component: string, message?: string): void => {
      printError(valid, `[@v-uik: ${component}] ${message ?? ''}`)
    }
  : noop
