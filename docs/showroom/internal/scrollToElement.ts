/**
 * Прокручивает текущий контейнер родителя элемента, так, чтобы этот элемент,
 * на котором был вызван scrollIntoView() был видим пользователю.
 */
export const scrollToElement = (
  element: Element,
  block = 'start' as const
): void => {
  element.scrollIntoView({
    behavior: 'smooth',
    block,
    inline: 'nearest',
  })
}
