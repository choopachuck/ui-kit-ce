# getRawType

Вычисляет тип значения, используя подход с применением метода `Object.prototype.toSring`.

## Пример использования

```javascript
import { getRawType, RawTypes } from '@v-uik/utils';

getRawType({}); // RawTypes.OBJECT -> 'object'
getRawType([]); // RawTypes.ARRAY -> 'array'
getRawType(1); // RawTypes.NUMBER -> 'number'
...
```
