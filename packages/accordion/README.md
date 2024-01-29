# Accordion

Компонент аккордеон представляет собой вертикально сложенный список элементов.
Каждый элемент может быть «развёрнут» или «раскрыт», чтобы показать содержимое, связанное с этим элементом.

#AccordionItem

Элемент аккордеона

##API

| Свойство       | Тип                                 | Описание                             |
| -------------- | ----------------------------------- | ------------------------------------ |
| `disabled`     | `boolean`                           | `Флаг отключения элемента`           |
| `header`       | `React.ReactNode`                   | `Заголовок элемента`                 |
| `isOpen`       | `boolean`                           | `Состояние элемента (открыт/закрыт)` |
| `headerProps`  | `React.ButtonHTMLAttributes`        | `Свойства компонента header`         |
| `contentProps` | `React.HTMLAttributes`              | `Свойства компонента content`        |
| `onClick`      | `(event: React.MouseEvent) => void` | `Обработчик клика по элементу`       |

## Пример использования

```javascript
import { Accrodion, AccordionItem } from '@v-uik/accordion'

export default () => (
  <Accrodion>
    <AccordionItem header="Новости">Новости за прошедшую неделю</AccordionItem>
    <AccordionItem header="Контакты">Контакты новостного портала</AccordionItem>
  </Accrodion>
)
```
