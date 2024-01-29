# InputNumber

Компонент поля ввода числовых значений

## API

Включает в себя все свойства компонента Input.

| Свойство           | Тип                                                 | Описание                             |
| ------------------ | --------------------------------------------------- | ------------------------------------ |
| `value`            | `number`                                            | `Значение поля`                      |
| `precision`        | `number`                                            | `Число знаков после запятой`         |
| `decimalSeparator` | `string`                                            | `Разделитель десятичной части`       |
| `groupSeparator`   | `string`                                            | `Разделитель групп разрадов числа`   |
| `onChange`         | `(value: number, event: React.ChangeEvent) => void` | `Обработчик изменения значения поля` |

## Пример использования

```javascript
import { InputNumber } from '@v-uik/input-number'
;<InputNumber label="Итоговая сумма" value={257644.5} />
```
