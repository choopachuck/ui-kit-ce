import { isEqualKeyboardKeys } from '../isEqualKeyboardKeys'
import type { KeyboardEventKey } from '../isEqualKeyboardKeys'

/**
 * Проверяет, что аргумент keys содержит KeyboardEvent.key с учетом
 * специальных ключей для IE/Edge.
 *
 * Разрешено использовать специальные ключи для IE/Edge в обоих аргументах.
 * Функция корректно выполнит все проверки.
 *
 * @example
 * includesKeyboardKeys(['Right', 'Left'], 'Left') // true
 */
export function includesKeyboardKey(
  keys: KeyboardEventKey[],
  key: KeyboardEventKey
): boolean {
  return keys.some((keyboardKey) => isEqualKeyboardKeys(keyboardKey, key))
}
