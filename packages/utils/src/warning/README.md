# warning

Выводит ошибку в консоль в development режиме

## Пример использования

```javascript
import { warning } from '@v-uik/utils'

warning(
  false,
  'ButtonGroup',
  'Вы забыли передать свойство `name` компоненту Button. Это свойство необходимо для использования внутри ButtonGroup'
)
```
