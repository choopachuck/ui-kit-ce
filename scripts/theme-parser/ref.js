const fs = require('fs')
const ts = require('typescript')
const path = require('path')

const readRefFile = (path, fileName) => {
  const rootNode = ts.createSourceFile(
    path,
    fs.readFileSync(path, 'utf8'), // sourceText
    ts.ScriptTarget.Latest // langugeVersion
  )

  const findChildrenByKind = (n, kind) => {
    const res = []
    n.forEachChild((x) => {
      if (x.kind === kind) {
        res.push(x)
      }
    })
    return res
  }

  const expAt = findChildrenByKind(rootNode, ts.SyntaxKind.ExportAssignment)[0]
  const objAt = findChildrenByKind(
    expAt,
    ts.SyntaxKind.ObjectLiteralExpression
  )[0]

  const makeToken = (writeToObj, tokenAssignement, prefix) => {
    writeToObj[tokenAssignement.name.text] = {
      tokenName: tokenAssignement.name.text,
      tokenFullName: `${prefix}${tokenAssignement.name.text}`,
      kind: 'StringLiteral',
      value: tokenAssignement.initializer.text,
    }
  }

  const res = {}
  objAt.forEachChild((x) => {
    const objectInside = findChildrenByKind(
      x,
      ts.SyntaxKind.ObjectLiteralExpression
    )[0]

    if (!objectInside) {
      makeToken(res, x, `ref.${fileName}.`)
      return
    }

    const tokensObj = {}

    objectInside.forEachChild((token) => {
      makeToken(tokensObj, token, `ref.${fileName}.${x.name.text}.`)
    })

    res[x.name.text] = tokensObj
  })

  return res
}

const getRefTokens = () => {
  const refFolder = path.resolve(__dirname, '../../packages/theme/src/ref')
  return fs.readdirSync(refFolder, { withFileTypes: true }).reduce((acc, x) => {
    if (x.isDirectory()) {
      acc[x.name] = readRefFile(`${refFolder}/${x.name}/index.ts`, x.name)
    }

    return acc
  }, {})
}

module.exports = {
  getRefTokens,
}
