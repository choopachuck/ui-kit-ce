const { globSync } = require('glob')
const fs = require('fs')
const path = require('path')
let ejs = require('ejs')

const ignore = [
  'LinkWithComponent.tsx',
  'PopperExample.tsx',
  'Canvas.tsx',
  'TextareaAutosize.tsx',
  'Playground.tsx',
]

const files = globSync('../../packages/*/examples/*.tsx')

const importDefs = []
const componentDefs = []

var copyRecursiveSync = function (src, dest, allowFunc) {
  var exists = fs.existsSync(src)
  var stats = exists && fs.statSync(src)
  var isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(function (childItemName) {
      if (!allowFunc(childItemName)) {
        return
      }
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
        allowFunc
      )
    })
  } else {
    if (!allowFunc(src)) {
      return
    }

    fs.copyFileSync(src, dest)
  }
}

const copiedPackages = {}

const dest = path.resolve(__dirname, '../examples')

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true, force: true })
}

fs.mkdirSync(dest)

const allow = (name) =>
  !name.toLowerCase().includes('classes') &&
  !name.toLowerCase().includes('dummy') &&
  !name.startsWith('Docs')

files.filter(allow).forEach((filename, idx) => {
  const ignored = ignore.find((s) => {
    return filename.includes(s)
  })

  if (ignored) {
    return
  }

  const filetext = fs.readFileSync(filename, 'utf8')
  const m = filetext.match(/(?<=export|function).+?(?=(<|=|\:|\())/)
  if (!m || !m.length) {
    console.log('error ', filename)
    return
  }

  const filenames = filename.split('/')
  const folderName = '../' + filenames.slice(0, -1).join('/')
  const packageNames = folderName.split('/')
  const packageName = packageNames[packageNames.length - 2]
  const file = filenames[filenames.length - 1].replace('.tsx', '')

  if (!copiedPackages[packageName]) {
    copiedPackages[packageName] = true
    const targetFolder = path.resolve(__dirname, `../examples/${packageName}`)

    if (fs.existsSync(targetFolder)) {
      fs.rmSync(targetFolder, { recursive: true, force: true })
    }

    copyRecursiveSync(path.resolve(__dirname, folderName), targetFolder, allow)
  }

  const variable = m[0]
    .replaceAll(' ', '')
    .replace('function', '')
    .replace('const', '')

  const importDef = { variable, idx, path: `./${packageName}/${file}` }
  const componentDef = { idx }
  importDefs.push(importDef)
  componentDefs.push(componentDef)
})

const template = fs.readFileSync('./app/App.tsx.ejs', 'utf8')

const appFileString = ejs.render(template, { importDefs, componentDefs })

fs.writeFileSync('./examples/App.tsx', appFileString)
