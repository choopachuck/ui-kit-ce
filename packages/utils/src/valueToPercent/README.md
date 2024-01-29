# valueToPercent

Конвертирует процент в значение между переданными границами.

## Пример использования

```javascript
import { valueToPercent } from '@v-uik/utils'

const range = {
  min: 0,
  max: 50,
}

valueToPercent(5, range) // 10
valueToPercent(25, range) // 50
valueToPercent(50, range) // 100
```
