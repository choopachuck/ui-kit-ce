# Checkbox

Компонент поля чекбокс

## API

| Свойство        | Тип                                  | Описание                         |
| --------------- | ------------------------------------ | -------------------------------- |
| `classes`       | `Classes`                            | `JSS-классы для стилизации`      |
| `checked`       | `boolean`                            | `Флаг значения поля`             |
| `disabled`      | `boolean`                            | `Флаг отключения поля`           |
| `indeterminate` | `boolean`                            | `Флаг неопределенного состояния` |
| `name`          | `string`                             | `Аттрибут тэга input`            |
| `onChange`      | `(event: React.ChangeEvent) => void` | `Обработчик изменения состояния` |
| `inputProps`    | `React.InputHTMLAttributes`          | `Аттриубты элемента input`       |

## Пример использования

```javascript
import { Checkbox } from '@v-uik/checkbox'
import { LabelControl } from '@v-uik/label-control'

return (
  <LabelControl
    label="Checkbox text"
    checked={checked}
    onChange={handleChange}
  />
)
```
