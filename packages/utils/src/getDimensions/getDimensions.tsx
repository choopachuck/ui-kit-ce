import * as React from 'react'
import * as ReactDOM from 'react-dom'

/**
 * Функция подсчета размеров элемента, до момента его отрисовки.
 * Используется, например, в компоненте Select,
 * для определения направления открытия.
 *
 * @param element - Элемент для отрисовки
 * @param cb - Коллбек, в который передаются размеры элемента
 */
export const getDimensions = (
  element: React.ReactElement,
  cb: (dimensions: Partial<DOMRect>) => void
): void => {
  // Контейнер в котором будет отрисован элемент.
  const containerEl = document.createElement('div')

  // Стили, визуально скрывающие контейнер
  containerEl.style.position = 'absolute' // Исключает элемент из потока
  containerEl.style.visibility = 'hidden' // Гарантирует скрытие элемента
  containerEl.style.overflow = 'hidden' // Исключает появление скролла
  containerEl.style.zIndex = '-9999' // Исключает перекрытие событий пользователя

  document.body.appendChild(containerEl)

  // Отрисовка и извлечение размеров элемента
  ReactDOM.render(element, containerEl, function () {
    const { width, height } = containerEl.children[0].getBoundingClientRect()
    document.body.removeChild(containerEl)
    ReactDOM.unmountComponentAtNode(containerEl)

    if (typeof cb === 'function') {
      cb({ width, height })
    }
  })
}
