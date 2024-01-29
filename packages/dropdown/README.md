# Dropdown

Компонент Dropdown является более функциональной оберткой Popup.
Компонент-потомок Dropdown становится триггером и ориентиром отображения Popup
по действию, переданному в свойство `action` (hover, click, contextMenu).
Содержимое Popup передается в свойство content.

## API

включает в себя все свойства компонента Popup (за исключенияем anchor)

| Свойство          | Тип                                                                            | Описание                                           |
| ----------------- | ------------------------------------------------------------------------------ | -------------------------------------------------- |
| `action`          | `'hover' ⎮ 'click' ⎮ 'contextMenu' ⎮ Array<'hover' ⎮ 'click' ⎮ 'contextMenu'>` | `Тип события срабатывания триггера`                |
| `content`         | `React.ReactNode`                                                              | `Содержимое дропдауна`                             |
| `mouseEnterDelay` | `number`                                                                       | `Задержка при открытии с hover (в миллисекундах)`  |
| `mouseLeaveDelay` | `number`                                                                       | `Задержка при закрытии с hover (в миллисекундах)`  |
| `onStateChange`   | `(open: boolean) => void`                                                      | `Обработчик изменения состояния открытия/закрытия` |
| `children`        | `React.ReactElement`                                                           | `HTML-элемент триггер`                             |

## Пример использования

```javascript
import { Dropdown } from '@v-uik/dropdown'

export default () => (
  <Dropdown action="hover" content={<div>Dropdown content</div>}>
    <button>dropdown trigger</button>
  </Dropdown>
)
```
