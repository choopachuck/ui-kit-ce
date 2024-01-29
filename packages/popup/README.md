# Popup

Компонент Popup позволяет рендерить контент поверх других элементов
и позиционировать его относительно какого либо элемента, переданного
в свойство `anchor`. Компонент реализован с помощью сторонней библиотеки
[Popper.js](https://github.com/popperjs/popper-core)

## API

| Свойство        | Тип                                                                   | Описание                                                                            |
| --------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `anchor`        | `(() => HTMLElement ⎮ VirtualElement) ⎮ HTMLElement ⎮ VirtualElement` | `Элемент или функция его возвращаюшая, относительно которого позиционируется Popup` |
| `placement`     | `Placement`                                                           | `Направление расположения Popup`                                                    |
| `container`     | `'() => HTMLElement ⎮ HTMLElement`                                    | `Элемент или функция его возвращаюшая, в который рендерится Popup`                  |
| `disablePortal` | `boolean`                                                             | `Флаг отмены рендера в контейнер (рендер в текущем родителе)`                       |
| `keepMounted`   | `boolean`                                                             | `Флаг отмены удаления компонента из DOM при закрытии`                               |
| `open`          | `boolean`                                                             | `Флаг показа Popup`                                                                 |
| `modifiers`     | `Array<Modifier<string, Options>>`                                    | `Модификаторы экземпляра popper.js`                                                 |
| `popperOptions` | `Options`                                                             | `Свойства экземпляра popper.js`                                                     |
| `popperRef`     | `React.Ref<Instance>`                                                 | `Ссылка на экземпляр popper.js`                                                     |
| `children`      | `React.ReactNode`                                                     | `Содержмое Popup`                                                                   |

## Пример использования

```javascript
import { Popup } from '@v-uik/popup'

export default () => (
  <Popup open={true} anchor={document.querySelector('#id')}>
    <div>Content</div>
  </Popup>
)
```
