/**
 * @prop nom - именительный падеж ед. числа - пример: 1 программист
 * @prop gen - родительный падеж ед. числа - пример: 2 программиста
 * @prop plu - родительный падеж мн. числа - пример: 10 программистов
 */
export interface Cases {
  nom: string
  gen: string
  plu: string
}

/**
 * Возвращает окончание для числа в верном падеже.
 *
 * @example
 * const cases = {
 *    nom: 'программист',
 *    gen: 'программиста',
 *    plu: 'программистов'
 * }
 *
 * getPlural(1, cases); // программист
 * getPlural(3, cases); // программиста
 * getPlural(12, cases); // программистов
 *
 * @param {number} count - Число, для которого нужен падеж.
 * @param {Cases} cases - Окончания.
 * @returns {string}
 */
export function getPlural(count: number, cases: Cases): string {
  const { nom, gen, plu } = cases

  const lastC = Number(String(count).slice(-1))
  const last2C = Number(String(count).slice(-2))

  if (last2C > 10 && last2C < 15) {
    return plu
  }
  if (lastC > 1 && lastC < 5) {
    return gen
  }
  if (lastC === 1) {
    return nom
  }

  return plu
}
