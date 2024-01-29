const path = require('path')
const { run } = require('.')
const rootPath = path.resolve(__dirname, '../../docs/showroom')

run(path.resolve(rootPath, './theme-tokens.json'))
