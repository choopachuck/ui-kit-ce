---
to: packages/<%= h.changeCase.paramCase(name) %>/README.MD
---

# <%= h.changeCase.pascal(name)%>

Описание компонента

## API

| Свойство  | Тип                  | Описание                    |
| --------- | -------------------- | --------------------------- |
| `classes` | `Classes`            | `JSS-классы для стилизации` |

## Пример использования

```javascript
import { <%= h.changeCase.pascal(name)%> } from '@v-uik/<%= h.changeCase.paramCase(name) %>'
```
