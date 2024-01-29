import { isObject } from '../isObject'
import { isArray } from '../isArray'

export function merge<A, B>(target: A, source: B): A & B
export function merge<A, B, C>(target: A, source1: B, source2: C): A & B & C
export function merge<A, B, C, D>(
  target: A,
  source1: B,
  source2: C,
  source3: D
): A & B & C & D
/* eslint-disable */
export function merge(target: any, ...args: any[]): any {
  // Если target не является объектом -
  // вернуть target без выполнения слияния.
  if (!isObject(target) && !isArray(target)) {
    return target
  }

  return args.reduce((result, arg) => {
    if (isObject(arg) || isArray(arg)) {
      Object.keys(arg).forEach((key) => {
        // Если arg[key] является примитивом -
        // присвоить значение в target as is.
        if (!isObject(arg[key]) && !isArray(arg[key])) {
          result[key] = arg[key]

          return
        }

        // Если значения полей не совпадают по типу -
        // присвоить значение в target с рекурсивным слиянием.
        if (typeof arg[key] !== typeof result[key]) {
          result[key] = merge(isArray(arg[key]) ? [] : {}, arg[key])

          return
        }

        // Если значения полей совпадают по типу
        // продолжить слияние рекурсивно.
        result[key] = merge(isArray(arg[key]) ? [] : {}, result[key], arg[key])
      })
    }

    return result
  }, target)
}
/* eslint-enable */
