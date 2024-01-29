# Button

Компонент отображения поля ввода типа радио

## API

| Свойство     | Тип                                  | Описание                        |
| ------------ | ------------------------------------ | ------------------------------- |
| `classes`    | `Classes`                            | `JSS-классы для стилизации`     |
| `checked`    | `boolean`                            | `Значение поля`                 |
| `disabled`   | `boolean`                            | `Флаг отключения поля`          |
| `inputProps` | `React.InputHTMLAttributes`          | `Аттрибуты элемента input`      |
| `name`       | `string`                             | `Аттрибут name тэга input`      |
| `value`      | `string ⎮ number`                    | `Значение поля`                 |
| `onChange`   | `(event: React.ChangeEvent) => void` | `Обработчик изменения значения` |

## Пример использования

```javascript
import { Radio } from '@v-uik/radio'
;<Radio checked={value} onChange={onChange} />
```
