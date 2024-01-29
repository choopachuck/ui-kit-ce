import { Item } from './createList'

/**
 * Данный метод фильтрует нечисловые символы.
 * При этом происходит переназначение соседей и сдвиг каретки.
 */
export const filterPredicate = (item: Item): boolean => {
  if (/[^0-9]/.test(item.value)) {
    // item - это удаляемый элемент,
    // item.neighborLeft - левый сосед удаляемого элемента
    // item.neighborRight - правый сосед удаляемого элемента
    // Соседей нужно столкнуть между собой.
    if (item.neighborLeft) {
      item.neighborLeft.neighborRight = item.neighborRight
    }

    if (item.neighborRight) {
      item.neighborRight.neighborLeft = item.neighborLeft
    }

    if (item.hasCaret && item.neighborRight) {
      item.neighborRight.hasCaret = true
    }

    return false
  }

  return true
}
