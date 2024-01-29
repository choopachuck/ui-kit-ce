const fs = require('fs')
const path = require('path')
const glob = require('glob')
const extend = require('./extendPackage')

const root = path.resolve(__dirname, '../')

/**
 * Возвращает путь до файла, с которым будет происходить слияние или объект.
 * @example
 * Object:
 * scripts: {
 *    clean: 'rm -rf node_modules dist package-lock.json'
 * }
 *
 * Path:
 * path.join(root, 'package-init.json');
 */
const getSource = () => {
  return {
    sideEffects: 'false',
    module: 'dist/esm/index.js',
    main: 'dist/cjs/index.js',
    typings: 'dist/esm/index.d.ts',
    scripts: {
      build: 'yarn build:cjs && yarn build:esm',
      'build:cjs': 'tsc -d --outDir ./dist/cjs --project tsconfig.cjs.json',
      'build:esm': 'tsc -d --outDir ./dist/esm --project tsconfig.esm.json',
    },
  }
}

// TODO: тесты
// TODO: подумать как лучше прокидывать путь/ объект
glob('packages/*/package.json', { root }, function (err, files) {
  const callback = (err) => {
    if (err) {
      throw err
    }
  }

  callback(err)

  files.forEach((file) => {
    const filePath = path.join(root, file)
    const extended = extend(filePath, getSource())
    const data = Buffer.from(JSON.stringify(extended, null, 2))

    fs.writeFile(filePath, data, callback)
  })
})
