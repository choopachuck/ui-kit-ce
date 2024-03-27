import { ThemeOptions } from './interface'

/**
 * Декларация глобальной переменной для задания дефолтной темы без использования ThemeProvider на клиенте
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace globalThis {
    // eslint-disable-next-line no-var
    var DEFAULT_UIK_THEME: ThemeOptions
  }
}

export {}
