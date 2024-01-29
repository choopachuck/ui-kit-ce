---
to: packages/<%= h.changeCase.paramCase(name) %>/src/index.ts
---

export * from './<%= h.changeCase.pascal(name) %>'
