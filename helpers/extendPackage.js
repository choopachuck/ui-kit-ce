const { merge } = require('@v-uik/utils')

const fs = require('fs')

/**
 * Данная функция объединит корневой и пакетный package.json в один.
 * Например, общие зависимости для всех пакетов прописаны в корневом package.json,
 * а специфичные зависимости в каждом конкретном пакете.
 * В случае, если необходимо изменить общую зависимость для каждого пакета -
 * необходимо пройтись по каждому package.json и поменять зависимость руками.
 * Данная функция предлагает автоматизировать этот процесс путём объединения package.json.
 *
 * @param {string} target - расширяемый конфиг
 * @param {string|object} source - расширяющий конфиг. может быть как ссылкой на файл, так и объектом.
 */
function extendPackage(target, source) {
  if (!target || !source) {
    throw new Error('Both arguments are required')
  }

  let sourceData = source
  let targetData = null

  if (!fs.existsSync(target)) {
    throw new Error(`Target: ${target} doesn't exist`)
  } else {
    try {
      targetData = JSON.parse(fs.readFileSync(target).toString())
    } catch (e) {
      throw e
    }
  }

  if (typeof source === 'string') {
    if (!fs.existsSync(source)) {
      throw new Error(`Source: ${source} doesn't exist`)
    }

    try {
      sourceData = JSON.parse(fs.readFileSync(source).toString())
    } catch (e) {
      throw e
    }
  }

  return merge({}, targetData, sourceData)
}

module.exports = extendPackage
