# getPlural

Вычисляет окончание для переданного числа.

## Пример использования

```javascript
import { getPlural } from '@v-uik/utils'

const cases = {
  nom: 'программист',
  gen: 'программиста',
  plu: 'программистов',
}

const getSentence = (count) => {
  return `В нашей команде работает ${count} ${getPlural(count, cases)}.`
}

getSentence(1) // В нашей команде работает 1 программист.
getSentence(5) // В нашей команде работает 5 программистов.
getSentence(101) // В нашей команде работает 101 программист.
```
