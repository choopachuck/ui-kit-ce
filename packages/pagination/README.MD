# Pagination

Описание компонента

## API

| Свойство                 | Тип                                 | Описание                                                                                              |
|--------------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------|
| `totalPageCount`         | `number`                            | Общее количество страниц                                                                              |
| `nearPageCount`          | `number`                            | Количество страниц, которое всегда будет отображаться слева и справа от текущей страницы              |
| `boundaryPageCount`      | `number`                            | Количество страниц, которое всегда будет отображаться в начале и в конце пагинации                    |
| `currentPage`            | `number`                            | Номер текущей страницы                                                                                |
| `defaultPage`            | `number`                            | Номер стартовой страницы по умолчанию                                                                 |
| `onPageChange`           | `((pageNumber: number) =&gt; void)` | Функция обратного вызова, которая отрабатывает при изменении страницы  `pageNumber`  - номер страницы |
| `classes`                | `PaginationClasses`                 | CSS классы компонента                                                                                 |
| `size`                   | `"sm"` `"md"` `"lg"`                | Размер элементов пагинации                                                                            |
| `disabled`               | `boolean`                           | Состояние блокировки элементов пагинации                                                              |
| `components`             | `PaginationComponents`              | Свойство для переопределения элементов `Pagination`                                                   |
| `showNavigationFirst`    | `boolean`                           | Флаг скрытия кнопки навигации к первой странице                                                       |
| `showNavigationLast`     | `boolean`                           | Флаг скрытия кнопки навигации к последней странице                                                    |
| `hideNavigationPrevious` | `boolean`                           | Флаг скрытия кнопки навигации к предыдущей странице                                                   |
| `hideNavigationNext`     | `boolean`                           | Флаг скрытия кнопки навигации к следующей странице                                                    |
| `firstButtonProps`     | `JSX.IntrinsicElements['button']`                           | Свойства для кнопки навигации к первой странице странице                                                    |
| `lastButtonProps`     | `JSX.IntrinsicElements['button']`                           | Свойства для кнопки навигации к последней странице странице                                                    |
| `previousButtonProps`     | `JSX.IntrinsicElements['button']`                           | Свойства для кнопки навигации к предыдущей странице странице                                                    |
| `nextButtonProps`     | `JSX.IntrinsicElements['button']`                           | Свойства для кнопки навигации к следующей странице странице                                                    |
| `getPaginationOverflowButtonProps`     | `(item: PaginationItem) => JSX.IntrinsicElements['button']`                           | Функция для получения свойства для каждого скрытого элемента                                                    |
| `getPaginationPageButtonProps`     | `(item: PaginationItem) => JSX.IntrinsicElements['button']`                           | Функция для получения свойства для каждого элемента страницы                                                    |

## Пример использования

```javascript
import { Pagination } from '@v-uik/pagination'

const Component = () => {
  return (
    <Pagination totalPageCount={10} />
  )
}
```
