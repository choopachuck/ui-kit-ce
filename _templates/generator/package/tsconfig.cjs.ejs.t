---
to: packages/<%= h.changeCase.paramCase(name) %>/tsconfig.cjs.json
---

{
  "extends": "../../tsconfig.cjs.json",
  "include": ["./src/index.ts"]
}
