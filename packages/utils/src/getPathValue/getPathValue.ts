/**
 * Получаем вложенное поле в объекте по переданному массиву ключей (пути)
 *
 * @param record - объект из которого будем получать данные по пути
 * @param path{string | string[]} - путь, или путь через точку, или массив ключей (в последовательности вложенности)
 * @returns {any} - возвращает полученные по пути данные
 */

export function getPathValue<ValueType, ObjectType>(
  record: ObjectType,
  path: string[] | string
): ValueType | null {
  if (!path) {
    return record as unknown as ValueType
  }

  const pathList = Array.isArray(path) ? path : path.split('.')

  let current: ValueType | ObjectType = record

  for (let i = 0; i < pathList.length; i += 1) {
    if (!current) {
      return null
    }

    const prop = pathList[i]
    current = current[prop as keyof typeof current] as unknown as ValueType
  }

  return current as ValueType
}
