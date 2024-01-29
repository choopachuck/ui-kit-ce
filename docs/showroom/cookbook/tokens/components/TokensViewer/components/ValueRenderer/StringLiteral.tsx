import { ITokensRouterContext } from 'cookbook/tokens/routing'
import { StringValue, StringToken } from 'cookbook/tokens/types'
import React from 'react'

interface Props {
  node: StringValue | StringToken
  router: ITokensRouterContext
}

export const StringLiteral = ({ node }: Props) => {
  return <div>{node.value}</div>
}
