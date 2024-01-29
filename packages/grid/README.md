# Grid, GridItem

Cетка, состоящая из 16 колонок, основана на flex и работает с использованием media query.

## Queries

| xs        | sm         | md         | lg         | xl       | xxl         |
| --------- | ---------- | ---------- | ---------- | -------- | ----------- |
| `< 640px` | `< 1056px` | `< 1440px` | `< 1600px` | `< 1920` | `>= 1920px` |

## Пример использования

```javascript
import { Grid, GridItem } from '@v-uik/grid'
;<Grid>
  <GridItem xs={16} md={8}>
    // Your content
  </GridItem>
</Grid>
```
