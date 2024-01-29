# RadioGroup

Компонент отображения группы полей радио

## API

| Свойство          | Тип                                  | Описание                              |
| ----------------- | ------------------------------------ | ------------------------------------- |
| `classes`         | `Classes`                            | `JSS-классы для стилизации`           |
| `direction`       | `'horizontal' ⎮ 'vertical'`          | `Расположение элементов`              |
| `value`           | `string ⎮ number`                    | `Значение поля`                       |
| `onChange`        | `(event: React.ChangeEvent) => void` | `Обработчик изменения значения`       |
| `label`           | `React.ReactNode`                    | `Подпись над полем ввода`             |
| `labelProps`      | `InputLabelProps`                    | `Свойства компонента InputLabel`      |
| `helperText`      | `React.ReactNode`                    | `Подпись под полем ввода`             |
| `helperTextProps` | `InputHelperTextProps`               | `Свойства компонента InputHelperText` |
| `disabled`        | `boolean`                            | `Флаг отключения поля`                |
| `error`           | `boolean`                            | `Флаг состояния ошибки`               |
| `name`            | `string`                             | `Имя группы элементов`                |

## Пример использования

```javascript
import { RadioGroup } from '@v-uik/radio-group'
import { Radio } from '@v-uik/radio'
import { LabelControl } '@v-uik/label-control'

return (
  <RadioGroup
    label="Выберите способ оплаты"
    value={value}
    direction="vertical"
    name="group"
    onChange={onChange}
  >
    <LabelControl label="Дебетовая карта" disabled value="debt" control={<Radio />} />
    <LabelControl label="Кредитная карта" value="credit" control={<Radio />} />
    <LabelControl label="Наличные" value="cash" control={<Radio />} />
  </RadioGroup>
)
```
