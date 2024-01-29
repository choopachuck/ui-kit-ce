export interface Item {
  /**
   * Наличие каретки слева от символа.
   */
  hasCaret?: boolean
  /**
   * Значение элемента списка.
   */
  value: string
  /**
   * Ссылка на соседа слева, если нет соседа, значит элемент первый в списке.
   */
  neighborLeft?: Item | null
  /**
   * Ссылка на соседа справа, если нет соседа, значит элемент последний в списке.
   */
  neighborRight?: Item | null
}

const initialItem: Item = {
  value: '',
  hasCaret: false,
  neighborLeft: null,
  neighborRight: null,
}

/**
 *
 * @param items
 * @param caretPosition
 */
export const createList = (
  items: string[],
  caretPosition: number | null
): Item[] => {
  return items.reduce((data: Item[], value: string, index: number) => {
    const prevIndex: number = index - 1
    const hasCaret: boolean = caretPosition === index
    const previousItem: Item = data[prevIndex]

    const item: Item = {
      ...initialItem,
      hasCaret,
      value,
    }

    if (previousItem) {
      item.neighborLeft = previousItem
      previousItem.neighborRight = item
    }

    return data.push(item), data
  }, [])
}
