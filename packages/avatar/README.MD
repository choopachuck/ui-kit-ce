# Avatar

Компонент для визуального представления пользователя в интерфейсе.

## API

| Свойство      | Тип                                         | Описание                                                                                                       |
|---------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `classes`     | `AvatarClasses`                             | CSS классы компонента                                                                                          |
| `size`        | `number` `"xs"` `"sm"` `"md"` `"lg"` `"xl"` | Размер аватара                                                                                                 |
| `kind`        | `"circle"` `"rounded"` `"square"`           | Тип скругления аватара                                                                                         |
| `src`         | `string`                                    | Путь до изображения                                                                                            |
| `alt`         | `string`                                    | Подпись для изображения                                                                                        |
| `imgProps`    | `JSX.IntrinsicElements['img']`              | HTML свойства для элемента `img`                                                                               |
| `fallback`    | `React.ReactNode`                           | Заглушка, которая будет отображаться, если изображение не загрузилось или отсутствует `alt`, `icon` и `children` |
| `icon`        | `React.ReactNode`                           | `svg` иконка                                                                                                   |
| `withBorder`  | `boolean`                                   | Флаг отображения обводки вокруг аватара                                                                        |
| `withShadow`  | `boolean`                                   | Флаг отображения тени вокруг аватара                                                                           |

## Пример использования

```javascript
import React from 'react'
import { Avatar } from '@v-uik/avatar'
import image from './assets/image.png'

const Component = () => {
  return (
    <Avatar src={image} alt="User Name"/>
  )
}
```

## AvatarGroup

Компонент для группирования аватаров. Он отображает переданные аватары в виде стека и добавляет для каждого аватара обводку

| Свойство     | Тип                                                                  | Описание                                                                                                  |
|--------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `items`      | `AvatarProps[]`                                                      |  Свойства для аватаров в группе                                                                                    |
| `kind`       | `circle` `rounded` `square`                                          | Тип скругления аватара                                                                                    |
| `withBorder` | `boolean`                                                            | Флаг отображения обводки вокруг аватара                                                                   |
| `withShadow` | `boolean`                                                            | Флаг отображения тени вокруг аватара                                                                      |
| `classes`    | `AvatarGroupClasses`                                                 | CSS классы компонента                                                                                     |
| `gap`        | `number`                                                             | Пользовательский отступ между аватарами                                                                   |
| `size`       | `xs` `sm` `md`                                                       | Размер группы аватаров                                                                                    |
| `max`        | `number`                                                             | Максимальное количество аватаров в группе                                                                 |
| `showExtra`  | `boolean`                                                            | Показывать дополнительный контент справа от аватаров при пустом значении `max`                            |
| `components` | `Partial<AvatarGroupComponents>`                                     | Свойство для переопределения элементов AvatarGroup                                                        |
| `coloring`   | `none` `static` `random`                                             | Свойство для автоматического окрашивания аватаров, у которых не указан `color`                            |
| `getPalette` | `((coloring: "none" \| "static" \| "random") => AvatarGroupPalette)` | Функция для генерации массива с пользовательской палитрой при `coloring="static"` или `coloring="random"` |

## Пример использования

```javascript
import React from 'react'
import { AvatarGroup, Avatar } from '@v-uik/avatar'
import image from './assets/image.png'

const Component = () => {
  return (
    <AvatarGroup
      items={[
        { children: 'UN' },
        { children: 'UN' },
        { children: 'UN' },
        { children: 'UN' },
        { children: 'UN' },
      ]}
    />
  )
}
```
