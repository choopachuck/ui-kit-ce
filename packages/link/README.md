# Link

Компонент Link используется для обозначения ссылок

## API

| Свойство    | Тип       | Описание                              |
| ----------- | --------- | ------------------------------------- |
| `href`      | `string`  | `Адрес ссылки, обязательное свойство` |
| `target`    | `string`  | `Свойство target HTML-элемента <a>`   |
| `title`     | `string`  | `Заголовок ссылки`                    |
| `disabled`  | `boolean` | `Блолирование действий со ссылкой`    |
| `underline` | `boolean` | `Подчеркивание ссылки`                |

## Пример использования

```javascript
import { Link } from '@v-uik/link'
;<Link
  href="https://platformv.sbertech.ru/products/instrumenty-razrabotchika/ui-kits"
  disabled
  underline
  title="disabled link"
>
  //Your content
</Link>
```
