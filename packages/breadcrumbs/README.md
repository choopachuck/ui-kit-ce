# Breadcrumbs

Компонент <Breadcrumbs> используется для навигации

## API

| Свойство              | Тип      | Описание                                                                                                                                                  |
| --------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxItems`            | `number` | `Максимальное число цепочек навигации («хлебных крошек»). Если шагов больше максимального количества, то будут список будет сжат разделителем посередине` |
| `itemsAfterCollapse`  | `number` | `Если шагов больше максимального количества, количество шагов после разделителя.`                                                                         |
| `itemsBeforeCollapse` | `number` | `Если шагов больше максимального количества, количество шагов до разделителя.`                                                                            |

## Пример использования

```javascript
import { Breadcrumbs } from '@v-uik/breadcrumbs'
;<Breadcrumbs aria-label="breadcrumb">
  <Link color="inherit" href="https://platformv.sbertech.ru/about">
    Breadcrumb
  </Link>
  <Link
    color="inherit"
    href="https://platformv.sbertech.ru/products/instrumenty-razrabotchika/ui-kits"
  >
    <Icon style={iconStyle} />
    Breadcrumb
  </Link>
  <Link color="inherit" href="https://platformv.sbertech.ru/products">
    <Icon style={iconStyle} />
    Breadcrumb
  </Link>
  <span style={breadcrumb}>Breadcrumb</span>
</Breadcrumbs>
```
