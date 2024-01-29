# Tabs

Компонент для отображения элементов, объединенных в секции

## API

| Свойство    | Тип                                | Описание                               |
| ----------- | ---------------------------------- | -------------------------------------- |
| `classes`   | `Classes`                          | `JSS-классы для стилизации`            |
| `type`      | `'default' ⎮ 'filled'`             | `Тип стилизации табов`                 |
| `direction` | `'horizontal' ⎮ 'vertical'`        | `Направление отображения табов`        |
| `value`     | `string ⎮ number`                  | `Текущее значение выбанного таба`      |
| `onChange`  | `(value: string ⎮ number) => void` | `Обработчик изменения выбранного таба` |

## Пример использования

```javascript
import { Tabs, Tab } from '@v-uik/tabs'
;<Tabs value={value} onChange={handleChange}>
  <Tab value="1" header="1 вкладка">
    Содержимое 1 вкладки
  </Tab>
  <Tab value="2" header="2 вкладка">
    Содержимое 2 вкладки
  </Tab>
  <Tab disabled value="3" header="3 вкладка">
    Содержимое 3 вкладки
  </Tab>
</Tabs>
```
