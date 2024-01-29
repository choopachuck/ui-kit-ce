# Slider

Компонент выбора значения на числовой прямой

## API

| Свойство   | Тип                       | Описание                                    |
| ---------- | ------------------------- | ------------------------------------------- |
| `value`    | `number`                  | `Значение поля`                             |
| `ticks`    | `boolean ⎮ Ticks[]`       | `Визуальные отметки на числовой прямой`     |
| `min`      | `number`                  | `Минимальное значение поля`                 |
| `max`      | `number`                  | `Максимальное значение поля`                |
| `step`     | `number`                  | `Шаг выбора значенией поля`                 |
| `color`    | `string`                  | `Цвет текущей активной границы`             |
| `inverted` | `boolean`                 | `Инверсивное направление движения слайдера` |
| `onChange` | `(value: number) => void` | `Обработчик изменения значения поля`        |

## Пример использования

```javascript
import { Slider } from '@v-uik/slider'
;<Slider
  ticks={[
    { value: 0, label: '0' },
    { value: 130, label: '130' },
    { value: 200, label: '200' },
    { value: 400, label: '400' },
  ]}
  min={0}
  max={500}
  step={10}
  value={value}
  onChange={handleChange}
/>
```
