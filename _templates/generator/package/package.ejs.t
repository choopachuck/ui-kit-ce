---
to: packages/<%= h.changeCase.paramCase(name) %>/package.json
---

{
  "name": "@v-uik/<%= h.changeCase.paramCase(name) %>",
  "version": "<%= version %>",
  "description": "",
  "sideEffects": false,
  "module": "dist/esm/index.js",
  "main": "dist/cjs/index.js",
  "typings": "dist/esm/index.d.ts",
  "files": [
    "/dist/",
    "package.json",
    "README.md"
  ],
  "scripts": {
    "build": "yarn build:cjs && yarn build:esm",
    "clean": "rm -rf node_modules dist",
    "build:cjs": "tsc -d --outDir ./dist/cjs --project tsconfig.cjs.json",
    "build:esm": "tsc -d --outDir ./dist/esm --project tsconfig.esm.json"
  },
  "license": "GitVerse-1.0",
  "author": "UFSUI",
  "peerDependencies": {
    "react": ">=16.8.0"
  },
  "dependencies": {
    "@v-uik/theme": "^<%= version %>"
  }
}
