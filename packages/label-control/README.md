# LabelControl

Компонент для отображения Radio, CheckBox и Switch совместно с заголовком

## API

| Свойство     | Тип                                     | Описание                                                                     |
| ------------ | --------------------------------------- | ---------------------------------------------------------------------------- |
| `classes`    | `Classes`                               | `JSS-классы для стилизации`                                                  |
| `checked`    | `boolean`                               | `Значение поля`                                                              |
| `size`       | `'sm' ⎮ 'md' ⎮ 'lg'`                    | `Размер заголовка и контролла`                                               |
| `control`    | `ReactElement`                          | `Контрол который будет выводится вместе с меткой Radio, CheckBox или Switch` |
| `disabled`   | `boolean`                               | `Элемент отключен`                                                           |
| `onChange`   | `ChangeEvent<HTMLInputElement>`         | `Обработчик, вызываемый при изменении состояния`                             |
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` | `Свойства элемента input`                                                    |
| `label`      | `ReactNode`                             | `Текст, который будет использоваться рядом с меткой`                         |

## Пример использования

```javascript
import { LabelControl } from '@v-uik/label-control'
```
