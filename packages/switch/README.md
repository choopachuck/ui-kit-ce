# Switch

Компонент-переключатель поля булевого значения

## API

| Свойство  | Тип               | Описание                    |
| --------- | ----------------- | --------------------------- |
| `classes` | `Classes`         | `JSS-классы для стилизации` |
| `checked` | `boolean`         | `Значение поля`             |
| `legend`  | `React.ReactNode` | `Подпись над элементом`     |
| `size`    | `'sm' ⎮ 'md'`     | `Размер элемента`           |

## Пример использования

```javascript
import { Switch } from '@v-uik/switch'
;<Switch checked={value} legend="Темная тема" onClick={handleClick} />
```
