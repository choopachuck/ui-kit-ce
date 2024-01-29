# merge

Рекурсивное объединение объектов.

## Пример использования

```javascript
import { merge } from '@v-uik/utils'

const target = { name: 'Jon' }
const source = { surname: 'Doe' }

merge({}, target, source) // { name: 'Jon', surname: 'Doe' }
```
