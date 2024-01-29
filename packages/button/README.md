# Button

Компонент отображения кнопки

## API

| Свойство    | Тип                                  | Описание                                    |
| ----------- | ------------------------------------ | ------------------------------------------- |
| `classes`   | `Classes`                            | `JSS-классы для стилизации`                 |
| `variant`   | `'primary' ⎮ 'ghost' ⎮ 'outlined'`   | `Тип кнопки`                                |
| `color`     | `'success' ⎮ 'monochrome' ⎮ 'error'` | `Цвет кнопки`                               |
| `size`      | `'sm' ⎮ 'md' ⎮ 'lg'`                 | `Размер кнопки`                             |
| `fullWidth` | `boolean`                            | `Растянуть кнопку во всю ширину контейнера` |

## Пример использования

```javascript
import { Button } from '@v-uik/button'
;<Button variant="outlined" color="monochrome">
  Кнопка
</Button>
```
