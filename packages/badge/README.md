# Badge

Badge генерирует маленький значок в углу своего дочернего элемента.

## API

| Свойство           | Тип               | Описание                                           |
| ------------------ | ----------------- | -------------------------------------------------- |
| `classes`          | `Classes`         | `JSS-классы для стилизации`                        |
| `variant`          | `BadgeType`       | `Тип значка, по умолчанию PRIMARY`                 |
| `color`            | `BadgeColor`      | `Цветовая схема бейджа, по умолчанию MONOCHROME`   |
| `horisontalOffset` | `string / number` | `Смещение положения бейджа по горизонтали`         |
| `verticalOffset`   | `string / number` | `Смещение положения бейджа по вертикали`           |
| `anchorOrigin`     | `AnchorOrigin`    | `Положение бейджа относительно дочернего элемента` |
| `badgeContent`     | `number / string` | `Значение элемента`                                |
| `max`              | `number`          | `Максимально отображаемое значение`                |

## Пример использования

```javascript
import { Badge, BadgeType, BadgeColor } from '@v-uik/badge'
;<Badge
  variant={BadgeType.LABEL}
  color={BadgeColor.WARNING}
  badgeContent={20}
  max={99}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
>
  //Your content
</Badge>
```
