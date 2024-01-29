const fs = require('fs')
const ts = require('typescript')
const path = require('path')
const { createParseTokenAssignment, findChildrenByKind } = require('./utils')

const readSysFile = (path, fileName) => {
  const rootNode = ts.createSourceFile(
    path,
    fs.readFileSync(path, 'utf8'), // sourceText
    ts.ScriptTarget.Latest // langugeVersion
  )

  const parseTokenAssignment = createParseTokenAssignment(rootNode)

  const makeToken = (writeToObj, tokenAssignment, prefix) => {
    const tokenName = findChildrenByKind(
      tokenAssignment,
      ts.SyntaxKind.Identifier
    )[0].escapedText

    let tokenValueAssignment

    tokenAssignment.forEachChild((x) => {
      if (x.kind === ts.SyntaxKind.Identifier) {
        return
      }

      tokenValueAssignment = x
    })

    writeToObj[tokenName] = {
      tokenName,
      tokenFullName: `${prefix}${tokenName}`,
      ...parseTokenAssignment(tokenValueAssignment),
    }
  }

  const firstSt = findChildrenByKind(rootNode, ts.SyntaxKind.FirstStatement)[0]
  const vdl = findChildrenByKind(
    firstSt,
    ts.SyntaxKind.VariableDeclarationList
  )[0]
  const vd = findChildrenByKind(vdl, ts.SyntaxKind.VariableDeclaration)[0]
  const func = findChildrenByKind(vd, ts.SyntaxKind.ArrowFunction)[0]
  const pExp = findChildrenByKind(
    func,
    ts.SyntaxKind.ParenthesizedExpression
  )[0]
  const objExp = findChildrenByKind(
    pExp,
    ts.SyntaxKind.ObjectLiteralExpression
  )[0]

  const res = {}

  objExp.forEachChild((tokenOrObj) => {
    const objectInside = findChildrenByKind(
      tokenOrObj,
      ts.SyntaxKind.ObjectLiteralExpression
    )[0]

    if (!objectInside) {
      makeToken(res, tokenOrObj, `sys.${fileName}.`)
      return
    }

    const objKey = findChildrenByKind(tokenOrObj, ts.SyntaxKind.Identifier)[0]
      .escapedText

    const tokensObj = {}

    objectInside.forEachChild((token) => {
      makeToken(tokensObj, token, `sys.${fileName}.${objKey}.`)
    })

    res[objKey] = tokensObj
  })
  return res
}

const getSysTokens = () => {
  const sysFolder = path.resolve(__dirname, '../../packages/theme/src/sys')
  return fs.readdirSync(sysFolder, { withFileTypes: true }).reduce((acc, x) => {
    if (x.isDirectory()) {
      acc[x.name] = readSysFile(`${sysFolder}/${x.name}/index.ts`, x.name)
    }

    return acc
  }, {})
}

module.exports = {
  getSysTokens,
}
