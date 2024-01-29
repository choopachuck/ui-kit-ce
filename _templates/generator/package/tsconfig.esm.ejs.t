---
to: packages/<%= h.changeCase.paramCase(name) %>/tsconfig.esm.json
---

{
  "extends": "../../tsconfig.esm.json",
  "include": ["./src/index.ts"]
}
