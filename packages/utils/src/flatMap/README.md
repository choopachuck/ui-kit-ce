# flatMap, flatMapDepth, flatMapDeep

Обрабатывает каждое значение массива переданной функцией-итератором, и затем выравнивает массив.

## Пример использования

```javascript
import { flatMap, flatMapDepth, flatMapDeep } from '@v-uik/utils'

const duplicate = (n) => [[[n, n]]]

const array = [1, 2]

flatMap(array, duplicate) // [[[1, 1]], [[2, 2]]]
flatMapDepth(array, duplicate, 2) // [[1, 1], [2, 2]]
flatMapDeep(array, duplicate) // [1, 1, 2, 2]
```
