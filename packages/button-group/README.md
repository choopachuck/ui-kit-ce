# ButtonGroup

Компонент отображения группы кнопок

## API

| Свойство   | Тип                                                           | Описание                                                |
| ---------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| `classes`  | `Classes`                                                     | `JSS-классы для стилизации`                             |
| `type`     | `'radio' ⎮ 'multi'`                                           | `Тип выбора значений`                                   |
| `color`    | `'success' ⎮ 'monochrome' ⎮ 'error'`                          | `Цвет кнопок`                                           |
| `value`    | `string ⎮ string[]`                                           | `Выбранное значение (массив в случае type === 'multi')` |
| `onChange` | `(event: React.MouseEvent, value: string ⎮ string[]) => void` | `Обработчик изменения значения`                         |
| `disabled` | `boolean`                                                     | `Отключить группу`                                      |

## Пример использования

```javascript
import { ButtonGroup } from '@v-uik/button-group'
import { Button } from '@v-uik/button'
;<ButtonGroup type="multi" color="monochrome" value={value} onChange={onChange}>
  <Button name="debt">Дебетовая карта</Button>
  <Button name="credit">Кредитная карта</Button>
  <Button name="cash">Наличные</Button>
</ButtonGroup>
```
