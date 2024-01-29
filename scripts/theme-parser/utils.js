const ts = require('typescript')

const findChildrenByKind = (n, kind) => {
  const res = []
  n.forEachChild((x) => {
    if (x.kind === kind) {
      res.push(x)
    }
  })
  return res
}

const clearText = (v) =>
  v.replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
const getValueWithKind = (node, rootNode) => ({
  value: clearText(node.getFullText(rootNode)),
  kind: ts.SyntaxKind[node.kind],
})

const createParseTokenAssignment = (node) => (n) => {
  if (
    ts.SyntaxKind[n.kind] === 'FirstLiteralToken' ||
    ts.SyntaxKind[n.kind] === 'FirstLiteralToken' ||
    ts.SyntaxKind[n.kind] === 'TemplateExpression' ||
    ts.SyntaxKind[n.kind] === 'PrefixUnaryExpression'
  ) {
    return getValueWithKind(n, node)
  }

  if (ts.SyntaxKind[n.kind] === 'StringLiteral') {
    return { value: n.text, kind: 'StringLiteral' }
  }

  if (ts.SyntaxKind[n.kind] === 'PropertyAccessExpression') {
    return {
      value: clearText(n.getFullText(node)),
      kind: 'PropertyAccessExpression',
    }
  }

  if (ts.SyntaxKind[n.kind] === 'CallExpression') {
    const funcName = findChildrenByKind(n, ts.SyntaxKind.Identifier)[0]
      .escapedText

    const args = []
    n.forEachChild((x) => {
      if (x.kind === ts.SyntaxKind.Identifier) {
        return
      }

      args.push(getValueWithKind(x, node))
    })

    return {
      kind: 'CallExpression',
      value: {
        action: funcName,
        args,
      },
    }
  }

  if (ts.SyntaxKind[n.kind] === 'ConditionalExpression') {
    const [cond, _1, legacyValue, _2, value] = n.getChildren(node)

    return {
      value: {
        condition: getValueWithKind(cond, node),
        trueValue: createParseTokenAssignment(node)(legacyValue),
        falseValue: createParseTokenAssignment(node)(value),
      },
      kind: 'ConditionalExpression',
    }
  }

  createLogChildren(node)(n)

  throw new Error(
    `Unexpected kind of token value assignment: ${ts.SyntaxKind[n.kind]}`
  )
}

const createLogChildren = (rootNode) => (n) => {
  n.forEachChild((x) => {
    console.log(ts.SyntaxKind[x.kind])
    console.log(`${x.getFullText(rootNode).slice(0, 100)}\n\n`)
  })
}

module.exports = {
  createParseTokenAssignment,
  createLogChildren,
  findChildrenByKind,
}
