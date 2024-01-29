# getPathValue

Получаем значение поля в объекте по ключу или массиву ключей

## Пример использования

```javascript
import { getPathValue } from '@v-uik/utils'

const cases = {
  table: {
    someData: 1,
  },
  head: {
    cell: {
      cellData: 'it is cell object',
    },
    row: {
      rowData: 'it is row object',
    },
  },
}

getPathValue(cases, 'table') // { someData: 1 }.
getPathValue(cases, ['head', 'cell']) // { cellData: 'it is cell object' }.
getPathValue(cases, ['head', 'row', 'rowData']) // it is row object.
```
