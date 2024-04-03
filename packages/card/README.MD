# Card

Компонент Card для отображения контента и действий.

## API

| Свойство      | Тип                                              | Описание                                                         |
|---------------|--------------------------------------------------|------------------------------------------------------------------|
| `classes`     | `CardClasses`                                    | `JSS-классы для стилизации`                                      |
| `className`   | `string`                                         | `CSS-класс`                                                      |
| `header`      | `ReactNode`                                      | `Контент для header`                                             |
| `footer`      | `ReactNode`                                      | `Контент для footer`                                             |
| `subtitle`    | `ReactNode`                                      | `Контент для subtitle`                                           |
| `kind`        | `"container" \| "clickable" \|"selectable"`      | `Тип карточки`                                                   |
| `onClick`     | `ButtonAriaActionEventHandler<HTMLDivElement>`   | `обработчик onClick (доступен при kind='clickable')`             |
| `buttonProps` | `HTMLProps<HTMLDivElement>`                      | `Пропсы для контейнера  (доступны при kind='clickable')`         |
| `disabled`    | `boolean`                                        | `Флаг disabled`                                                  |
| `checked`     | `boolean`                                        | `Признак выбора (доступен при kind='selectable')`                |
| `name`        | `string`                                         | `name атрибут элемента input (доступен при kind='selectable')`   |
| `onChange`    | `(event: ChangeEvent<HTMLInputElement>) => void` | `Обработчик onChange для input (доступен при kind='selectable')` |
| `inputProps`  | `HTMLProps<HTMLInputElement>`                    | `Пропсы для элемента input (доступны при kind='selectable')`     |


## Пример использования

```javascript
import React from 'react'
import { Card } from '@v-uik/card'

const Component = () => {
  return (
   <Card 
    header="Header" 
    subtitle="Subtitle"
   >
    Content
   </Card>
  )
}
```

