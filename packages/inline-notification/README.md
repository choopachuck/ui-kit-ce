# InlineNotification

InlineNotification - компонент для отображения сообщений пользователю внутри основного контента.

## API

| Свойство        | Тип                                                            | Описание                                  |
| --------------- | -------------------------------------------------------------- | ----------------------------------------- |
| `classes`       | `InlineNotificationClasses`                                    | CSS классы компонента                     |
| `title`         | `ReactNode`                                                    | заголовок                                 |
| `actions`       | `ReactNode`                                                    | действия                                  |
| `kind`          | `"filled"` `"outlined"`                                        | отображение компонента                    |
| `status`        | `"neutral"` `"error"` `"warning"` `"success"` `"info"`         | статус компонента                         |
| `icon`          | `ReactNode` `boolean`                                          | отображать иконку, либо элемент с иконкой |
| `onClose`       | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | функция нажатия по кнопке закрытия        |
| `showIndicator` | `boolean`                                                      | отображать вертикальную линию             |
| `direction`     | `"horizontal"` `"vertical"`                                    | направление размещения элементов          |
| `as`            | `React.ElementType`                                            | HTML-тег, отображаемый компонентом.       |

## Пример использования

```javascript
import React from 'react'
import { InlineNotification } from '@v-uik/inline-notification'

const Component = () => {
  return <InlineNotification>InlineNotification</InlineNotification>
}
```
