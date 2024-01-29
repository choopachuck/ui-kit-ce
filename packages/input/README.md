# Input

Компонент поля ввода текста (обертка над InputBase, включающая в себя InputLabel, InputHelperText)

## API

включает в себя все свойства компонента InputBase (за исключенияем onFocusChange)

| Свойство          | Тип                    | Описание                              |
| ----------------- | ---------------------- | ------------------------------------- |
| `classes`         | `Classes`              | `JSS-классы для стилизации`           |
| `label`           | `React.ReactNode`      | `Подпись над полем ввода`             |
| `labelProps`      | `InputLabelProps`      | `Свойства компонента InputLabel`      |
| `helperText`      | `React.ReactNode`      | `Подпись под полем ввода`             |
| `helperTextProps` | `InputHelperTextProps` | `Свойства компонента InputHelperText` |

## Пример использования

```javascript
import { Input } from '@v-uik/input'
;<Input
  label="Навзвание поля"
  placeholder="Введите текст"
  helperText="Описание поля"
  size="lg"
  suffix={<Icon />}
  value={value}
  onChange={handleChange}
/>
```

# InputBase

Компонент поля ввода текста

## API

| Свойство        | Тип                                  | Описание                                            |
| --------------- | ------------------------------------ | --------------------------------------------------- |
| `classes`       | `Classes`                            | `JSS-классы для стилизации`                         |
| `inputProps`    | `React.InputHTMLAttributes`          | `Аттрибуты тэга input`                              |
| `inputRef`      | `React.Ref<HTMLInputElement>`        | `Ссылка на элемент input`                           |
| `fullWidth`     | `boolean`                            | `Растянуть компонент на всю ширину контейнера`      |
| `error`         | `boolean`                            | `Флаг состояния ошибки`                             |
| `size`          | `'sm' ⎮ 'md' ⎮ 'lg'`                 | `Размер поля`                                       |
| `prefix`        | `React.ReactNode`                    | `Вспомогательный элемент перед текстовым полем`     |
| `suffix`        | `React.ReactNode`                    | `Вспомогательный элемент после текстового поля`     |
| `disabled`      | `boolean`                            | `Флаг отключения поля`                              |
| `placeholder`   | `string`                             | `Плейсхолдер поля ввода`                            |
| `value`         | `string ⎮ number`                    | `Значение поля`                                     |
| `onChange`      | `(event: React.ChangeEvent) => void` | `Обработчик изменения значения поля`                |
| `showErrorIcon` | `boolean`                            | `Флаг показа стандартной иконки в состоянии ошибки` |
| `onFocusChange` | `(focused: boolean) => void`         | `Обработчик изменения состояния фокуса`             |

## Пример использования

```javascript
import { InputBase } from '@v-uik/input'
;<InputBase
  placeholder="Введите текст"
  size="lg"
  value={value}
  onChange={handleChange}
/>
```
