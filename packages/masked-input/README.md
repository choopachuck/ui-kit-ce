# Masked Input

Компонент ввода значения по маске

## API

Включает в себя все свойства компонента Input

| Свойство                   | Тип                                                 | Описание                                                      |
| -------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| `value`                    | `string`                                            | `Значение поля`                                               |
| `onChange`                 | `(value: string, event: React.ChangeEvent) => void` | `Обработчик изменения значения поля`                          |
| `mask`                     | `string`                                            | `Маска ввода`                                                 |
| `formatCharacters`         | `FormatCharacters`                                  | `Объект конфигурации символов маски`                          |
| `placeholderChar`          | `string`                                            | `Символ для замены незаполненного элемента маски`             |
| `placeholderString`        | `string`                                            | `Символы для заполнения пустых редактируемых позиций в маске` |
| `valueWithoutMask`         | `boolean`                                           | `Флаг исключения символов маски из значения`                  |
| `keepCharPositions`        | `boolean`                                           | `Флаг сохранения позиций символов при вводе/удалении`         |
| `keepCaretPositionOnFocus` | `boolean`                                           | `Флаг сохранения позиции каретки при потере фокуса`           |
| `maskAsPlaceholder`        | `boolean`                                           | `Флаг показа маски в качестве значения при пустом значении`   |
| `overtype`                 | `boolean`                                           | `Флаг замены символов при вводе`                              |
| `groupCharShifting`        | `boolean`                                           | `Флаг, который группирует символы с одинаковой маской`        |
| `autoSelectOnFocus`        | `boolean`                                           | `Выделить весь текст при фокусе`                              |

## Пример использования

```javascript
import { MaskedInput } from '@v-uik/masked-input'
;<MaskedInput
  mask="+7 (111) 111-11-11"
  placeholder="+7 (999) 123-45-67"
  value={value}
  onChange={handleChangeValue}
/>
```
