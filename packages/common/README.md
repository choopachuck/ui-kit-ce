# @v-uik/common

Общие объекты, интерфейсы и т.п.

- [ElementSize](#elementsize)
- [Direction](#direction)

## ElementSize

Перечисляет размеры элементов.

- **sm** - маленький размер
- **md** - стандартный размер
- **lg** - большой размер

Пример использования:

```javascript
import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { ElementSize } from '@v-uik/common'

export const Component = (props) => {
  const className = clsx({
    small: props.size === ElementSize.SM,
    large: props.size === ElementSize.LG,
    medium: props.size === ElementSize.MD,
  })

  return <div {...props} className={className} />
}
```

## Direction

Направление (раскладка) элемента.

- **horizontal** - горизонтальная раскладка элемента, слева направо
- **vertical** - вертикальная раскладка элемента, сверху вниз

Пример использования:

```javascript
import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { Direction } from '@v-uik/common'

export const Component = (props) => {
  const className = clsx({
    horizontal: props.dir === Direction.horizontal,
    vertical: props.dir === Direction.vertical,
  })

  return <div {...props} className={className} />
}
```
