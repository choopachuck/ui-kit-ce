# hasElementType

Вычисляет соответствие элемента переданному типу.

## Пример использования

```javascript
import { Button } from '@v-uik/button'
import { hasElementType } from '@v-uik/utils'

const getOnlyButtons = (children) => {
  return React.Children.toArray(children).filter((child) =>
    hasElementType(child, Button)
  )
}

export const ButtonGroup = (props) => {
  return <div className={props.className}>{getOnlyButtons(props.children)}</div>
}
```
