const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

const folders = fs.readdirSync(path.resolve(__dirname, '../packages'))
const tscPath = path.resolve(__dirname, '../node_modules/.bin/tsc')

folders.forEach((packageName) => {
  if (packageName === 'next-js-provider') {
    return
  }

  const entry = path.resolve(
    __dirname,
    `../packages/${packageName}/src/index.ts`
  )
  const out = path.resolve(
    __dirname,
    `../docs/showroom/config/monaco_typedefs/${packageName}.ts`
  )
  const root = path.resolve(__dirname, `..`)

  const output = execSync(
    `cd ${root} && ${tscPath} ${entry} --outFile ${out} --module AMD --moduleResolution Node --jsx react --esModuleInterop true --emitDeclarationOnly true --declaration true --target es2016`,
    { encoding: 'utf-8' }
  )

  if (output) {
    console.log('Output was:\n', output)
  }
})
