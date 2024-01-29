# Tooltip

Tooltip — всплывающие подсказки, появляющиеся когда пользователь наводит курсор на элемент,
фокусируется на нем или нажимает на него.

## API

| Свойство        | Тип             | Описание                                                  |
| --------------- | --------------- | --------------------------------------------------------- |
| `classes`       | `Classes`       | `JSS-классы для стилизации`                               |
| `single`        | `boolean`       | `Компактное отображение содержимого в одну строку`        |
| `dropdownProps` | `DropdownProps` | `Свойство компнента Dropdown (placement, content и т.д.)` |

## Пример использования

```javascript
import { Tooltip } from '@v-uik/tooltip';

<Tooltip
    dropdownProps={{
        placement: 'right-start' as const,
        content: //Your tooltip content,
    }}
>
    //Your main content
</Tooltip>
```
