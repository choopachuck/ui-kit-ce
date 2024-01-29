# Labelled

Компонент для добавления подписи, описания или подсказки к любому вложенному в него компоненту. Включает в себя компоненты InputLabel и InputHelperText.

## API

| Свойство                    | Тип                       | Описание                                                         |
| --------------------------- | ------------------------- | ---------------------------------------------------------------- |
| `classes`                   | `Classes`                 | `JSS-классы для стилизации`                                      |
| `label`                     | `React.ReactNode`         | `Подпись над полем ввода`                                        |
| `labelProps`                | `InputLabelProps`         | `Свойства компонента InputLabel`                                 |
| `helperText`                | `React.ReactNode`         | `Подпись под полем ввода`                                        |
| `helperTextProps`           | `InputHelperTextProps`    | `Свойства компонента InputHelperText`                            |
| `description`               | `React.ReactNode`         | `Подпись под ярлыком`                                            |
| `required`                  | `boolean`                 | `Признак обязательности поля`                                    |
| `disabled`                  | `boolean`                 | `Применить стили для disabled состояния`                         |
| `error`                     | `boolean`                 | `Поле содержит ошибку`                                           |
| `keepHelperTextMinHeight`   | `boolean`                 | `Оставить минимальную высоту контейнера для helperText`          |
| `children`                  | `React.ReactNode`         | `Дочерний контент`                                               |

## Classes API

| Свойство                    | Тип                       | Описание                                                         |
| --------------------------- | ------------------------- | ---------------------------------------------------------------- |
| `description`               | `string`                  | `Стиль, применяемый к элементу Description`                      |
| `topLabels`                 | `string`                  | `Стиль, применяемый к контейнеру с Label и Description`          |
| `topLabelsWrapper`          | `string`                  | `Стиль, применяемый к контейнеру с Label, Description и Required`|
| `required`                  | `string`                  | `Стиль, применяемый к элементу Required`                         |
| `descriptionDisabled`       | `string`                  | `Стиль, применяемый к элементу Description с disabled='true'`    |

## Пример использования

```javascript
import * as React from 'react'
import { Labelled } from '@v-uik/labelled'
import { InputBase } from '@v-uik/input'

export default () => {
  return (
    <Labelled label="Login" description="Some description">
      <InputBase />
    </Labelled>
  )
}
```
