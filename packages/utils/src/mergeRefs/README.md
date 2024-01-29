# mergeRefs

Позволяет объединить несколько `ref`.

## Пример использования

```javascript
import { useRef } from 'react'
import { mergeRefs } from '@v-uik/utils'

const firstRef = useRef(null)
const secondRef = useRef(null)

;<Component ref={mergeRefs([firstRef, secondRef])} />
```
