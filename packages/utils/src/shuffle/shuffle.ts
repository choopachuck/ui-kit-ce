/**
 * Сортировка массива в случайном порядке на основе алгоритма Тасования Фишера — Йетса (современный вариант).
 * Функция возвращает новый массив.
 *
 * @param array - Массив для сортировки
 *
 * @returns Массив, отсортированный в случайном порядке
 *
 * @see [Тасование Фишера — Йетса](https://ru.wikipedia.org/wiki/%D0%A2%D0%B0%D1%81%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%A4%D0%B8%D1%88%D0%B5%D1%80%D0%B0_%E2%80%94_%D0%99%D0%B5%D1%82%D1%81%D0%B0)
 */
export const shuffle = <TValue = unknown>(array: TValue[]): TValue[] => {
  const shuffledArray: TValue[] = [...array]
  let current = array.length

  while (current !== 0) {
    const elementIndex = Math.floor(Math.random() * current)
    current--
    ;[shuffledArray[current], shuffledArray[elementIndex]] = [
      shuffledArray[elementIndex],
      shuffledArray[current],
    ]
  }

  return shuffledArray
}
