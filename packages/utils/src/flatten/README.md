# flatten, flattenDepth, flattenDeep

Выравнивает массив на указанную глубину

## Пример использования

```javascript
import { flatten, flattenDepth, flattenDeep } from '@v-uik/utils'

const array = [1, [2, [3, [4, 5]]]]

flatten(array) // [1, 2, [3, [4, 5]]]
flattenDepth(array, 2) // [1, 2, 3, [4, 5]]
flattenDeep(array) // [1, 2, 3, 4, 5]
```
