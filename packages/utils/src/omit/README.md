# omit

Исключает из объекта переданное поле или набор полей.

## Пример использования

```javascript
import { omit } from '@v-uik/utils'

const target = { a: 1, b: 2, c: 3 }
const paths = ['a', 'c']

omit(target, paths) // { b: 2 }
```
