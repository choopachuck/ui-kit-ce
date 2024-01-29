# CheckboxGroup

Компонент отображения группы полей чекбоксов

## API

| Свойство          | Тип                                                    | Описание                              |
| ----------------- | ------------------------------------------------------ | ------------------------------------- |
| `classes`         | `Classes`                                              | `JSS-классы для стилизации`           |
| `direction`       | `'horizontal' ⎮ 'vertical'`                            | `Расположение элементов`              |
| `value`           | `string[]`                                             | `Значение поля`                       |
| `onChange`        | `(event: React.ChangeEvent, value?: string[]) => void` | `Обработчик изменения значения`       |
| `label`           | `React.ReactNode`                                      | `Подпись над полем ввода`             |
| `labelProps`      | `InputLabelProps`                                      | `Свойства компонента InputLabel`      |
| `helperText`      | `React.ReactNode`                                      | `Подпись под полем ввода`             |
| `helperTextProps` | `InputHelperTextProps`                                 | `Свойства компонента InputHelperText` |
| `disabled`        | `boolean`                                              | `Флаг отключения поля`                |
| `error`           | `boolean`                                              | `Флаг состояния ошибки`               |

## Пример использования

```javascript
import { CheckboxGroup } from '@v-uik/checkbox-group'
import { Checkbox } from '@v-uik/checkbox'
import { LabelControl } from '@v-uik/LabelControl'

return (
  <CheckboxGroup
    label="Выберите способ оплаты"
    value={value}
    direction="vertical"
    onChange={onChange}
  >
    <LabelControl
      disabled
      name="debt"
      label="Дебетовая карта"
      control={<Checkbox />}
    />
    <LabelControl
      name="credit"
      label="Кредитная карта"
      control={<Checkbox />}
    />
    <LabelControl name="cash" label="Наличные" control={<Checkbox />} />
  </CheckboxGroup>
)
```
