'use client'

import * as React from 'react'

import {
  PAGINATION_OVERFLOW_PAGES,
  PAGINATION_FIRST_PAGE_NUMBER,
  PaginationAppearance,
} from './constants'
import { useValue } from '@v-uik/hooks'

export type PaginationItemValue = number | typeof PAGINATION_OVERFLOW_PAGES

export type PaginationAppearanceType =
  typeof PaginationAppearance[keyof typeof PaginationAppearance]

export type PaginationItem = {
  /**
   * Номер страницы или значение усечения
   */
  value: PaginationItemValue
  /**
   * Тип элемента
   */
  appearance: PaginationAppearanceType
  /**
   * Флаг активности элемента
   */
  isSelected: boolean
}

export type UsePaginationProps = {
  /**
   * Общее количество страниц
   */
  totalPageCount?: number
  /**
   * Количество страниц, которое всегда будет отображаться слева и справа от текущей страницы
   */
  nearPageCount?: number
  /**
   * Количество страниц, которое всегда будет отображаться в начале и в конце пагинации
   */
  boundaryPageCount?: number
  /**
   * Номер текущей страницы
   */
  currentPage?: number
  /**
   * Номер стартовой страницы по умолчанию
   */
  defaultPage?: number
  /**
   * Функция обратного вызова, которая отрабатывает при изменении страницы <br/> `pageNumber` - номер страницы
   *
   * @param pageNumber - номер страницы
   */
  onPageChange?: (pageNumber: number) => void
}

export type UsePaginationReturnProps = {
  /**
   * Номер текущей страницы
   */
  currentPage: number
  /**
   * Массив с элементами пагинации
   */
  items: PaginationItem[]
  /**
   * Является ли активный элемент началом пагинации
   */
  isStart: boolean
  /**
   * Является ли активный элемент концом пагинации
   */
  isEnd: boolean
  /**
   * Обработчик изменения страницы <br/> `pageNumber` - номер страницы
   *
   * @param pageNumber - номер страницы
   */
  setCurrentPage: (pageNumber: number) => void
  /**
   * Обработчик перехода на предыдущую страницу
   */
  handlePreviousClick: () => void
  /**
   * Обработчик перехода на следующую страницу
   */
  handleNextClick: () => void
  /**
   * Обработчик перехода на первую страницу
   */
  handleFirstClick: () => void
  /**
   * Обработчик перехода на последнюю страницу
   */
  handleLastClick: () => void
}

/**
 * Функция для получения элементов пагинации
 */
const processItems = ({
  boundaryPageCount: boundaryPageCountProp,
  currentPage,
  nearPageCount: nearPageCountProp,
  totalPageCount,
}: Required<
  Pick<
    UsePaginationProps,
    'boundaryPageCount' | 'currentPage' | 'nearPageCount' | 'totalPageCount'
  >
>): Pick<UsePaginationReturnProps, 'isStart' | 'isEnd' | 'items'> => {
  if (!totalPageCount) {
    return {
      items: [],
      isStart: false,
      isEnd: false,
    }
  }
  let boundaryPageCount = boundaryPageCountProp
  let nearPageCount = nearPageCountProp

  /**
   * Количество элементов слева и справа от текущей страницы и количество элементов в конце и в начале пагинации
   */
  const approximateItemsCount = calculateApproximateItemsCount({
    boundaryPageCount,
    nearPageCount,
  })

  /**
   * Проверка на то, что количество элементов слева и справа от текущей страницы и количество элементов в конце и в начале пагинации
   * превышает общее количество страниц
   */
  const isOverflow = approximateItemsCount >= totalPageCount

  if (isOverflow) {
    boundaryPageCount = 0
    nearPageCount = totalPageCount - 1
  }

  /**
   * Элементы пагинации
   */
  const items: PaginationItem[] = Array.from({ length: totalPageCount }).map(
    (_, i) => {
      const value = i + 1

      return {
        isSelected: value === currentPage,
        appearance: PaginationAppearance.item,
        value,
      }
    }
  )

  /**
   * Левый блок пагинации
   */
  let leftItems: PaginationItem[] = []
  /**
   * Средний блок пагинации
   */
  let middleItems: PaginationItem[] = []
  /**
   * Правый блок пагинации
   */
  let rightItems: PaginationItem[] = []

  /**
   * Элементы в левом блоке, которые всегда отображаются в пагинации
   */
  const farLeftItems = boundaryPageCount
    ? items.slice(PAGINATION_FIRST_PAGE_NUMBER - 1, boundaryPageCount)
    : []

  /**
   * Элементы в правом блоке, которые всегда отображаются в пагинации
   */
  const farRightItems = boundaryPageCount
    ? items.slice(boundaryPageCount * -1)
    : []

  /**
   * Последний элемент левого блока
   *
   * К номеру первой страницы прибавляется количество элементов слева и
   * справа от текущей страницы и прибавляется количество крайних левых элементов блока,
   * которые всегда отображаются в пагинации)
   */
  const leftLastItem =
    PAGINATION_FIRST_PAGE_NUMBER + nearPageCount + farLeftItems.length
  /**
   * Первый элемент правого блока
   *
   * (Из общего количества элементов вычитается количество элементов слева и
   * справа от текущей страницы и вычитается количество крайних правых элементов блока,
   * которые всегда отображаются в пагинации)
   */
  const rightFirstItem = totalPageCount - nearPageCount - farRightItems.length

  /**
   * Первый элемент среднего блока
   *
   * (Следующий элемент после последнего элемента левого блока)
   */
  const middleFirstItem = leftLastItem + 1
  /**
   * Последний элемент среднего блока
   *
   * (Предыдущий элемент после последнего элемента правого блока)
   */
  const middleLastItem = rightFirstItem - 1

  if (currentPage <= leftLastItem) {
    /**
     * -----------------------------------------------------------------------------
     * -- Условие для текущей страницы, которая находится в левом блоке пагинации --
     * -----------------------------------------------------------------------------
     */

    /**
     * В левом блоке содержатся элементы с первой страницы по последний элемент левого блока, с
     * учетом количества элементов справа от текущей страницы и элемента с троеточием
     *
     * Если выполняется условие `isOverflow`, значит все элементы пагинации помещаются в левый блок
     */
    leftItems = items.slice(
      PAGINATION_FIRST_PAGE_NUMBER - 1,
      leftLastItem + nearPageCount + 1
    )

    if (!isOverflow) {
      /**
       * В среднем блоке содержатся элемент с троеточием и элементы правого блока, которые всегда
       * отображаются в пагинации
       */
      middleItems = [
        {
          isSelected: false,
          appearance: PaginationAppearance.overflowEnd,
          value: PAGINATION_OVERFLOW_PAGES,
        },
        ...farRightItems,
      ]
    }
  } else if (currentPage >= middleFirstItem && currentPage <= middleLastItem) {
    /**
     * -------------------------------------------------------------------------------
     * -- Условие для текущей страницы, которая находится в среднем блоке пагинации --
     * -------------------------------------------------------------------------------
     */

    /**
     * В левом блоке содержатся элементы правого блока, которые всегда отображаются в пагинации
     * и элемент с троеточием
     */
    leftItems = [
      ...farLeftItems,
      {
        isSelected: false,
        appearance: PaginationAppearance.overflowStart,
        value: PAGINATION_OVERFLOW_PAGES,
      },
    ]
    /**
     * В среднем блоке содержатся следующие элементы:
     * - элементы слева от текущей в количестве `nearPageCount`
     * - текущая страница
     * - элементы справа от текущей в количестве `nearPageCount`
     */
    middleItems = items.slice(
      currentPage - nearPageCount - 1,
      currentPage + nearPageCount
    )
    /**
     * В правом блоке содержатся элемент с троеточием и элементы правого блока, которые всегда
     * отображаются в пагинации
     */
    rightItems = [
      {
        isSelected: false,
        appearance: PaginationAppearance.overflowEnd,
        value: PAGINATION_OVERFLOW_PAGES,
      },
      ...farRightItems,
    ]
  } else if (currentPage >= rightFirstItem) {
    /**
     * -------------------------------------------------------------------------------
     * -- Условие для текущей страницы, которая находится в правом блоке пагинации --
     * -------------------------------------------------------------------------------
     */

    /**
     * В среднем блоке содержатся элементы правого блока, которые всегда отображаются в пагинации
     * и элемент с троеточием
     */
    middleItems = [
      ...farLeftItems,
      {
        isSelected: false,
        appearance: PaginationAppearance.overflowStart,
        value: PAGINATION_OVERFLOW_PAGES,
      },
    ]
    /**
     * В правом блоке содержатся элементы с первого элемента правого блока по последний элемент пагинации, с
     * учетом количества элементов слева от текущей страницы и элемента с троеточием
     */
    rightItems = items.slice(rightFirstItem - nearPageCount - 2, totalPageCount)
  }

  /**
   * Результирующий массив склеивает левый, средний и правый блоки пагинации
   */
  const resultItems = [...leftItems, ...middleItems, ...rightItems]

  return {
    items: resultItems,
    isStart: resultItems[0].value === currentPage,
    isEnd: resultItems[resultItems.length - 1].value === currentPage,
  }
}

/**
 * Функция для расчета количества элементов слева и справа от текущей страницы и количество элементов в конце и в начале пагинации
 */
const calculateApproximateItemsCount = ({
  boundaryPageCount,
  nearPageCount,
}: Required<
  Pick<UsePaginationProps, 'boundaryPageCount' | 'nearPageCount'>
>): number => {
  return boundaryPageCount * 2 + nearPageCount * 2 + 1
}

/**
 * Функция для проверки, что переданный элемент пагинации является скрытым элементом
 */
export const isPaginationItemOverflow = (
  pageNumber?: PaginationItemValue
): boolean => pageNumber === PAGINATION_OVERFLOW_PAGES

export const usePagination = (
  props?: UsePaginationProps
): UsePaginationReturnProps => {
  const {
    currentPage: currentPageProp,
    boundaryPageCount = 1,
    nearPageCount = 1,
    totalPageCount = 1,
    defaultPage,
    onPageChange,
  } = { ...props }
  const fallbackValue = defaultPage || PAGINATION_FIRST_PAGE_NUMBER
  const [currentPage, _setCurrentPage] = useValue(currentPageProp, {
    fallbackValue,
  })

  const setCurrentPage = React.useCallback(
    (pageNumber: number) => {
      const newPageNumber = Math.min(
        totalPageCount,
        Math.max(PAGINATION_FIRST_PAGE_NUMBER, pageNumber)
      )

      _setCurrentPage(newPageNumber)

      onPageChange?.(newPageNumber)
    },
    [totalPageCount, onPageChange]
  )

  const handlePreviousClick = React.useCallback(() => {
    setCurrentPage(currentPage - 1)
  }, [setCurrentPage, currentPage])

  const handleNextClick = React.useCallback(() => {
    setCurrentPage(currentPage + 1)
  }, [setCurrentPage, currentPage])

  const handleFirstClick = React.useCallback(() => {
    setCurrentPage(PAGINATION_FIRST_PAGE_NUMBER)
  }, [setCurrentPage])

  const handleLastClick = React.useCallback(() => {
    setCurrentPage(totalPageCount)
  }, [setCurrentPage, totalPageCount])

  const { items, isStart, isEnd } = React.useMemo(
    () =>
      processItems({
        currentPage,
        boundaryPageCount,
        nearPageCount,
        totalPageCount,
      }),
    [currentPage, boundaryPageCount, nearPageCount, totalPageCount]
  )

  return {
    items,
    isStart,
    isEnd,
    setCurrentPage,
    handlePreviousClick,
    handleNextClick,
    handleFirstClick,
    handleLastClick,
    currentPage,
  }
}
