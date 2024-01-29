const fs = require('fs')
const { getCompTokens } = require('./comp')
const { getRefTokens } = require('./ref')
const { getSysTokens } = require('./sys')

module.exports = {
  run: (path = './theme-tokens.json') => {
    const comp = getCompTokens()
    const ref = getRefTokens()
    const sys = getSysTokens()
    const tokens = {
      comp,
      ref,
      sys,
    }

    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
    fs.writeFileSync(path, JSON.stringify(tokens))
  },
}
