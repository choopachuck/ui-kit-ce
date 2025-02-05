# Bar

Компонент Bar представляет собой панель для размещения в ней логотипа, названий, кнопок навигации или просто кнопок пользовательских действий и др.
Может быть горизонтальным и вертикальным. В вертикальном состоянии есть функция развёртывания меню.
Для удобства в этом же пакете расположены различные компоненты (BarButton, BarMenuItem и т.д.), которые Bar принимает в качестве children.

# BarItem

Стилизованный компонент-обертка для элементов бара

## API

| Свойство  | Тип               | Описание                                  |
| --------- | ----------------- | ----------------------------------------- |
| `classes` | `Classes`         | `JSS-классы для стилизации`               |
| `icon`    | `React.ReactNode` | `Иконка для отображения с левой стороны ` |

# BarMenuItem

Элемент меню (навигация и т.п.).

## API

Включает все свойства BarItem и представленные в таблице ниже:

| Свойство   | Тип       | Описание                      |
| ---------- | --------- | ----------------------------- |
| `classes`  | `Classes` | `JSS-классы для стилизации`   |
| `selected` | `boolean` | `Флаг выбранного пункта меню` |
| `disabled` | `boolean` | `Флаг отключения элемента`    |

# BarDate

Элемент для отображения текущей системной даты и времени.

## API

Включает все свойства BarItem и представленные в таблице ниже:

| Свойство  | Тип       | Описание                    |
| --------- | --------- | --------------------------- |
| `classes` | `Classes` | `JSS-классы для стилизации` |

# BarButton

Кнопка бара.

## API

Включает все свойства BarItem и представленные в таблице ниже:

| Свойство   | Тип       | Описание                    |
| ---------- | --------- | --------------------------- |
| `classes`  | `Classes` | `JSS-классы для стилизации` |
| `disabled` | `boolean` | `Флаг отключения кнопки`    |

# BarDropdown

Элемент выпадающего меню.

## API

Включает все свойства BarMenuItem и представленные в таблице ниже:

| Свойство        | Тип             | Описание                       |
| --------------- | --------------- | ------------------------------ |
| `classes`       | `Classes`       | `JSS-классы для стилизации`    |
| `dropdownProps` | `DropdownProps` | `Свойства компонента Dropdown` |

# BarDropdownItem

Элемент списка выпадающего меню.

## API

| Свойство        | Тип                         | Описание                                                                                                    |
| --------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `classes`       | `Classes`                   | `JSS-классы для стилизации`                                                                                 |
| `disabled`      | `boolean`                   | `Флаг отключения элемента`                                                                                  |
| `dropdownProps` | `DropdownProps`             | `Свойства компонента Dropdown (в случае указания этого поля, элемент также будет являться выпадающим меню)` |
| `menuRef`       | `React.Ref<HTMLDivElement>` | `Ссылка на элемент меню (в случае, когда элемент является выпадающим меню) `                                |

# BarSearch

Стилизованный компонент Input для поиска.

## API

| Свойство      | Тип                                  | Описание                      |
| ------------- | ------------------------------------ | ----------------------------- |
| `classes`     | `Classes`                            | `JSS-классы для стилизации`   |
| `placeholder` | `string`                             | `Содержимое плейсхолдер поля` |
| `value`       | `string`                             | `Значение поля`               |
| `onChange`    | `(event: React.ChangeEvent) => void` | `Обработчик изменения поля`   |
| `leftIcon`    | `React.ReactNode`                    | `Иконка слева`                |
| `rightIcon`   | `React.ReactNode`                    | `Иконка справа`               |
| `inputProps`  | `InputProps`                         | `Свойства компонента Input`   |

# BarSelect

Стилизованный компонент Select.

## API

| Свойство      | Тип                       | Описание                     |
| ------------- | ------------------------- | ---------------------------- |
| `classes`     | `Classes`                 | `JSS-классы для стилизации`  |
| `options`     | `SelectProps['options']`  | `Опции для выбора`           |
| `value`       | `SelectProps['value']`    | `Значение поля`              |
| `onChange`    | `SelectProps['onChange']` | `Обработчик изменения поля`  |
| `selectProps` | `SelectProps`             | `Свойства компонента Select` |

## Пример использования

```javascript
import { Bar, BarButton, BarMenuItem } from '@v-uik/bar'

export default () => (
  <Bar>
    <BarMenuItem selected>Menu 1</BarMenuItem>
    <BarMenuItem>Menu 2</BarMenuItem>
    <BarMenuItem>Menu 3</BarMenuItem>

    <BarButton>Button</BarButton>
  </Bar>
)
```
