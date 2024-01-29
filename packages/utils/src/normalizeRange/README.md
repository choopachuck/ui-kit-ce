# normalizeRange

Объединяет переданыне границы с границами по умолчанию. В случае нарушения значений `min` и `max` - переворчаивает их.

## Пример использования

```javascript
import { normalizeRange } from '@v-uik/utils'

normalizeRange({ min: 10 }) // { min: 10, max: 100 }
normalizeRange({ max: 10 }) // { min: 0, max: 10 }
normalizeRange({ min: 10, max: 20 }) // { min: 10, max: 20 }
```
