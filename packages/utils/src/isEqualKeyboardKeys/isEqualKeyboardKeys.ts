import { KeyboardEventKey } from './interfaces'

/**
 * Сравнивает два значения KeyboardEvent.key с учетом специальных
 * ключей для IE/Edge.
 *
 * Разрешено использовать специальные ключи для IE/Edge в обоих аргументах.
 * Функция корректно выполнит все проверки.
 *
 * @example
 * isEqualKeyboardKeys('Esc', 'Escape') // true
 */
export function isEqualKeyboardKeys(
  key1: KeyboardEventKey,
  key2: KeyboardEventKey
): boolean {
  // IE/Edge specific keys
  const ieKeys: Record<string, string> = {
    Esc: 'Escape',
    Up: 'ArrowUp',
    Left: 'ArrowLeft',
    Down: 'ArrowDown',
    Right: 'ArrowRight',
  }

  const temp1 = ieKeys[key1] ?? key1
  const temp2 = ieKeys[key2] ?? key2

  return temp1 === temp2
}
