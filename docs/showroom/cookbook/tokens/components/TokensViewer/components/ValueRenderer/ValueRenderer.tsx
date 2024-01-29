import * as React from 'react'
import { TokenT, TokenValue } from '../../../../types'
import { TokenViewContext } from '../../TokenViewContext'
import { TokensRouterContext } from '../../../../routing'
import { PropertyAccessExpression } from './PropertyAcessExpression'
import { StringLiteral } from './StringLiteral'
import { CallExpression } from './CallExpression'
import { ConditionalExpression } from './ConditionExpression'

type ValueRendererProps = {
  node: TokenT | TokenValue
  recursive?: boolean
  depth?: number
  deprecated?: boolean
}

export const ValueRenderer: React.FC<ValueRendererProps> = ({
  node,
  recursive = true,
  depth = 0,
  deprecated,
}) => {
  const { themeTokens, theme } = React.useContext(TokenViewContext)

  const router = React.useContext(TokensRouterContext)
  if (!router) {
    throw new Error('Tokens router must be defined!')
  }

  if (node.kind === 'PropertyAccessExpression') {
    return (
      <PropertyAccessExpression
        node={node}
        depth={depth}
        recursive={recursive}
        theme={theme}
        themeTokens={themeTokens}
        router={router}
        deprecated={deprecated}
      />
    )
  }

  if (
    node.kind === 'StringLiteral' ||
    node.kind === 'FirstLiteralToken' ||
    node.kind === 'PrefixUnaryExpression'
  ) {
    return <StringLiteral node={node} router={router} />
  }

  if (node.kind === 'CallExpression') {
    return (
      <CallExpression node={node} depth={depth} theme={theme} router={router} />
    )
  }

  if (node.kind === 'ConditionalExpression') {
    return <ConditionalExpression node={node} router={router} depth={depth} />
  }

  return <>Unexpected type of node: {node.kind}</>
}
