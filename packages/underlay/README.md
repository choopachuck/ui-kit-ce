# Underlay

Underlay — это компонент, поверх которого выстраиваются все остальные компоненты пользовательского интерфейса.
Компонент имеет набор цветов для бэкраунда и обводки: error, warning, success, info, neutral.Также вы можете использовать любой нужный для вас цвет.

## API

| Свойство  | Тип                                                    | Описание                           |
| --------- | ------------------------------------------------------ | ---------------------------------- | --- |
| `classes` | `UnderlayClasses`                                      | CSS классы компонента              |
| `kind`    | `"filled"` `"outlined"`                                | отображение компонента underlay    |
| `status`  | `"neutral"` `"error"` `"warning"` `"info"` `"success"` | статус компонента                  |
| `color`   | `React.CSSProperties['color']`                         | цвет underlay                      |
| `as`      | `React.ElementType`                                    | HTML-тег, отображаемый компонентом |     |

## Пример использования

```javascript
import React from 'react'
import { Underlay } from '@v-uik/underlay'

const Component = () => {
  return <Underlay>Underlay</Underlay>
}
```
