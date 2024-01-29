export type ClassesObject = Record<string, string | undefined>

// Имена свойств T с типами, которые включают undefined
export type OptionalPropertyNames<T> = {
  [K in keyof T]: undefined extends T[K] ? K : never
}[keyof T]

// Общие свойства из L и R, в которых undefined из R[K] заменяется на тип из L[K]
export type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>
}

// Вспомогательный тип для более красивого представления объединений типов
export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export type Spread<L, R> = Id<
  // Свойства в L которые отсутствуют в R
  Pick<L, Exclude<keyof L, keyof R>> &
    // Свойства в R с типами, не включающими undefined
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    // Свойства в R с типами, включающими undefined, и отсутствующими в L
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    // Свойства в R c типами включающими undefined, которые присутствуют в L
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>

/**
 * Утилита для удобного объединения классов из пропсы classes и классов
 * @param classes1 набор классов
 * @param classes2 набор классов
 * @param mergeCallback функция для мерджа классов
 */
export const mergeClasses = <
  T extends ClassesObject,
  U extends ClassesObject,
  C extends unknown
>({
  classes1,
  classes2,
  mergeCallback,
}: {
  classes1: T
  classes2?: U
  mergeCallback: (...classes: C[]) => string
}): Spread<T, U> => {
  if (!classes2) {
    return classes1 as unknown as Spread<T, U>
  }

  const result = {
    ...classes1,
  } as unknown as Spread<T, U>

  Object.keys(classes2).forEach((classKey) => {
    // @ts-ignore вернуться позже
    result[classKey] = mergeCallback(result[classKey], classes2[classKey])
  })

  return result
}
