# Select

Компонент представляет из себя раскрывающийся элемент выбора опций.

## API

| Свойство       | Тип                                                                    | Описание                                                       |
| -------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| `classes`      | `Classes`                                                              | `JSS-классы для стилизации`                                    |
| `viewport`     | `HTMLElement`                                                          | `Элемент, относительно которого позиционируется селект`        |
| `value`        | `string`                                                               | `Значение поля`                                                |
| `yAlign`       | `'top' ⎮ 'bottom' ⎮ 'center' ⎮ 'topOutside' ⎮ 'bottomOutside'`         | `Положение выпадающего меню по оси Y`                          |
| `xAlign`       | `'left' ⎮ 'right' ⎮ 'center' ⎮ 'leftOutside' ⎮ 'rightOutside'`         | `Положение выпадающего меню по оси X`                          |
| `options`      | `Option[]`                                                             | `Список опций поля`                                            |
| `limitByWidth` | `boolean`                                                              | `Флаг установки ширины выпадающего меню равной ширине селекта` |
| `onChange`     | `(value: string, event: React.MouseEvent ⎮ React.KeyboardEvent): void` | `Обработчик изменения значения`                                |

## Пример использования

```javascript
import { useState } from 'react'
import { Select } from '@v-uik/select'

const options = [
  { value: '', label: 'Выберите опцию' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

export default () => {
  const [value, setValue] = useState('')
  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return <Select value={value} options={options} onChange={handleChange} />
}
```
