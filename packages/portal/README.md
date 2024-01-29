# Portal

Компонент Portal позволяет рендерить контент в любую
часть DOM-дерева

## API

| Свойство    | Тип                                | Описание                                                              |
| ----------- | ---------------------------------- | --------------------------------------------------------------------- |
| `container` | `'() => HTMLElement ⎮ HTMLElement` | `Элемент или функция его возвращаюшая, в который рендерится children` |
| `children`  | `React.ReactNode`                  | `Содержмое компонента`                                                |

## Пример использования

```javascript
import { Portal } from '@v-uik/portal'

export default () => (
  <Portal container={document.querySelector('#id')}>
    <div>Content</div>
  </Portal>
)
```
