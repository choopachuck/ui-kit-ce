import { Jss as _Jss } from 'jss'

/**
 * Объявление модуля JSS связано с тем, что требуется обращение к его свойству id без ошибки typescript.
 */
declare module 'jss' {
  interface Jss extends _Jss {
    id: number
  }
}
