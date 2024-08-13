let isProduction = false
let isTesting = false

try {
  isProduction = process.env.NODE_ENV === 'production'
  isTesting = process.env.TESTING === 'true'
  // eslint-disable-next-line no-empty
} catch (_e) {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-empty-function
const noop = () => {}

/**
 * Вывод ошибки в консоль
 * @param valid - условие вывода
 * @param message - сообщение для отображения
 */
export const printError = (valid: boolean, message: string): void => {
  // Support uglify
  if (!isProduction && !valid && console !== undefined && !isTesting) {
    console.error(`Warning: ${message}`)
  }
}

export const warning = !isProduction
  ? (
      valid: boolean,
      component: string,
      message?: string,
      lib = '@v-uik'
    ): void => {
      printError(valid, `[${lib}: ${component}] ${message ?? ''}`)
    }
  : noop
