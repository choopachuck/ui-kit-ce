# percentToValue

Конвертирует процент в значение между переданными границами.

## Пример использования

```javascript
import { percentToValue } from '@v-uik/utils'

const range = {
  min: 0,
  max: 50,
}

percentToValue(10, range) // 5
percentToValue(50, range) // 25
percentToValue(100, range) // 50
```
