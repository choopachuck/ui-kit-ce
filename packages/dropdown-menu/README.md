# DropdownMenu

Компонент выпадающего меню

## API

| Свойство        | Тип             | Описание                                                  |
| --------------- | --------------- | --------------------------------------------------------- |
| `classes`       | `Classes`       | `JSS-классы для стилизации`                               |
| `dropdownProps` | `DropdownProps` | `свойстра компнента Dropdown (placement, content и т.д.)` |

## Пример использования

```javascript
import { DropdownMenu, DropdownMenuItem } from '@v-uik/dropdown-menu'
;<DropdownMenu
  dropdownProps={{
    placement: 'right-start',
    content: (
      <>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
        <DropdownMenuItem critical>Option 3</DropdownMenuItem>
      </>
    ), //Your menu content
  }}
>
  //Your main content
</DropdownMenu>
```

# DropdownMenuItem

Внутренний компонент выпадающего меню

## API

| Свойство        | Тип             | Описание                                                   |
| --------------- | --------------- | ---------------------------------------------------------- |
| `classes`       | `Classes`       | `JSS-классы для стилизации`                                |
| `disabled`      | `boolean`       | `Элемент отключен`                                         |
| `arrow`         | `boolean`       | `Стрелка в правой части элемента`                          |
| `critical`      | `boolean`       | `Выделение важного элемента`                               |
| `size`          | `ElementSize`   | `Размер элемента`                                          |
| `dropdownProps` | `DropdownProps` | `Свойстра компонента Dropdown (placement, content и т.д.)` |

## Пример использования

```javascript
import { DropdownMenuItem } from '@v-uik/dropdown-menu'
;<DropdownMenuItem
  arrow
  critical
  size={ElementSize.sm}
  dropdownProps={{
    placement: 'right-start',
    content: <></>, //Your menu content,
  }}
>
  //Your main content
</DropdownMenuItem>
```
