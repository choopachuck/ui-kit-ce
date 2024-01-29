# Textarea

Компонент ввода многострочного текста

## API

| Свойство          | Тип                                  | Описание                                       |
| ----------------- | ------------------------------------ | ---------------------------------------------- |
| `classes`         | `Classes`                            | `JSS-классы для стилизации`                    |
| `label`           | `React.ReactNode`                    | `Подпись над полем ввода`                      |
| `labelProps`      | `InputLabelProps`                    | `Свойства компонента InputLabel`               |
| `helperText`      | `React.ReactNode`                    | `Подпись под полем ввода`                      |
| `helperTextProps` | `InputHelperTextProps`               | `Свойства компонента InputHelperText`          |
| `textareaProps`   | `React.HTMLAttributes`               | `Аттрибуты тэга textarea`                      |
| `textareaRef`     | `React.Ref<HTMLTextAreaElement>`     | `Ссылка на элемент textarea`                   |
| `rows`            | `number`                             | `Количество строк`                             |
| `fullWidth`       | `boolean`                            | `Растянуть компонент на всю ширину контейнера` |
| `error`           | `boolean`                            | `Флаг состояния ошибки`                        |
| `disabled`        | `boolean`                            | `Флаг отключения поля`                         |
| `placeholder`     | `string`                             | `Плейсхолдер поля ввода`                       |
| `value`           | `string ⎮ number`                    | `Значение поля`                                |
| `onChange`        | `(event: React.ChangeEvent) => void` | `Обработчик изменения значения поля`           |

## Пример использования

```javascript
import { Textarea } from '@v-uik/textarea'
;<Textarea
  fullWidth
  label="Название поля"
  helperText="Описание поля"
  placeholder="Введите текст..."
  value={value}
  onChange={handleChange}
/>
```
