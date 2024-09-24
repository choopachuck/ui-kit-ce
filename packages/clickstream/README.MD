# ClickStreamProvider

Компонент-обертка для сбора пользовательских действий в приложении

## API

| Свойство               | Тип                                                                                    | Описание                                                                                                                                                                                                                                                                                                      |
|------------------------|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `onInit`               | `((data: ClickStreamBaseData, meta: ClickStreamEventMeta) => void)`                 | Функция обратного вызова, которая срабатывает при первой инициализации провайдера                                                                                                                                                                                                                                 |
| `onSendEvent`          | `((batch: ClickStreamEventBatch<TData>, meta: ClickStreamEventMeta) => void)` | Функция обратного вызова, которая срабатывает при отправке очереди событий. После отправки очереди событий, текущая очередь очищается                                                                                                                                                                          |
| `onBatch`              | `((event: Event, data: TData, batch: ClickStreamEventBatch<TData>) => void)`  | Функция обратного вызова, которая срабатывает при добавлении нового события в очередь событий                                                                                                                                                                                                                 |
| `disableAutoSendEvent` | `boolean`                                                                              | Флаг для отключения у всего приложения автоматической отправки событий через `ClickStreamProvider`                                                                                                                                                                                                            |
| `batchSize`            | `number`                                                                               | Максимальный размер очереди событий                                                                                                                                                                                                                                                                           |
| `inactivityTime`       | `number`                                                                               | Разрешенное время бездействия пользователя в миллисекундах. Если пользователь совершил количество действий меньше, чем указано в свойстве `batchSize`, то по истечению указанного времени `ClickStreamProvider` автоматически запустит функцию обратного вызова `onSendEvent` с накопившейся очередью событий |
| `formatEventData`      | `((event: Event, eventType: string) => TData)`                                      | Функция для получения отформатированных данных для событий `ClickStreamProvider`                                                                                                                                                                                                                              |

## Пример использования

```jsx
import * as React from 'react'
import { Button } from '@v-uik/base'
import { ClickStreamProvider, ClickStreamEventBatch } from '@v-uik/clickstream'

const Component: React.FC = () => {
  const handleSendEvent = (batch: ClickStreamEventBatch) => {
    console.log(batch)
  }

  return (
    <ClickStreamProvider onSendEvent={handleSendEvent}>
      <Button>Hello ClickStream!</Button>
    <ClickStreamProvider>
  )
}
```
