const fs = require('fs')
const ts = require('typescript')
const path = require('path')
const {
  createParseTokenAssignment,
  findChildrenByKind,
  createLogChildren,
} = require('./utils')

const readCompFile = (path) => {
  const rootNode = ts.createSourceFile(
    path,
    fs.readFileSync(path, 'utf8'), // sourceText
    ts.ScriptTarget.Latest // langugeVersion
  )

  const parseTokenAssignment = createParseTokenAssignment(rootNode)

  const firstSt = findChildrenByKind(rootNode, ts.SyntaxKind.FirstStatement)

  const res = {}
  firstSt.forEach((st) => {
    const vdl = findChildrenByKind(st, ts.SyntaxKind.VariableDeclarationList)[0]
    const vd = findChildrenByKind(vdl, ts.SyntaxKind.VariableDeclaration)[0]
    const funcName = findChildrenByKind(vd, ts.SyntaxKind.Identifier)[0]
      .escapedText
    const compName =
      funcName.replace('create', '')[0].toLowerCase() +
      funcName.replace('create', '').slice(1)
    const func = findChildrenByKind(vd, ts.SyntaxKind.ArrowFunction)[0]
    const pExp = findChildrenByKind(
      func,
      ts.SyntaxKind.ParenthesizedExpression
    )[0]
    const objExp = findChildrenByKind(
      pExp,
      ts.SyntaxKind.ObjectLiteralExpression
    )[0]

    const compTokens = {}

    objExp.forEachChild((tokenAssignment) => {
      const tokenName = findChildrenByKind(
        tokenAssignment,
        ts.SyntaxKind.Identifier
      )[0].escapedText
      const tokenFullName = `comp.${compName}.${tokenName}`

      let tokenValueAssignment

      tokenAssignment.forEachChild((x) => {
        if (x.kind === ts.SyntaxKind.Identifier) {
          return
        }

        tokenValueAssignment = x
      })

      compTokens[tokenName] = {
        compName,
        tokenName,
        tokenFullName,
        ...parseTokenAssignment(tokenValueAssignment),
      }
    })

    res[compName] = compTokens
  })

  return res
}

const getCompTokens = () => {
  const compFolder = path.resolve(__dirname, '../../packages/theme/src/comp')
  return fs
    .readdirSync(compFolder, { withFileTypes: true })
    .reduce((acc, x) => {
      if (!x.isDirectory() && !x.name.includes('index')) {
        acc = {
          ...acc,
          ...readCompFile(`${compFolder}/${x.name}`),
        }
      }

      return acc
    }, {})
}

module.exports = {
  getCompTokens,
}
