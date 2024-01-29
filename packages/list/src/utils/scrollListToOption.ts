/**
 * Функция для прокрутки листа вниз при смене активного элемента
 * @param list - ссылка на лист
 * @param element - текущий элемент (активный)
 * @param listPadding - величина на которую нужно опустить лист
 * @param groupBy - параметр отвечающий за прокрутку с группировкой (чтобы активный элемент оставался в области видимости)
 */

const SCROLLING = 4

export const scrollElement = (
  list: HTMLUListElement | HTMLElement | null,
  element: HTMLElement | null,
  listPadding: number,
  groupBy?: boolean
): void => {
  if (element && list) {
    if (list.scrollTop > element.offsetTop) {
      list.scrollTo(0, element.offsetTop - listPadding)
    }

    if (
      element.offsetTop + element.offsetHeight * (groupBy ? SCROLLING : 1) >
      list.scrollTop + list.clientHeight
    ) {
      list.scrollTo(
        0,
        element.offsetTop +
          element.offsetHeight * (groupBy ? SCROLLING : 1) -
          list.clientHeight +
          listPadding
      )
    }
  }
}
