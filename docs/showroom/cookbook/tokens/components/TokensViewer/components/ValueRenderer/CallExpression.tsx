import { Theme } from '@v-uik/base'
import { getPathValue } from '@v-uik/base'
import { ITokensRouterContext } from 'cookbook/tokens/routing'
import { CallValue, CallExpressionToken } from 'cookbook/tokens/types'
import { clearTokenName, getColorByTokens } from 'cookbook/tokens/utils'
import React from 'react'
import { Text } from '@v-uik/base'
import { ValueRenderer } from './ValueRenderer'

interface Props {
  node: CallValue | CallExpressionToken
  depth: number
  theme: Theme | undefined
  router: ITokensRouterContext
}

export const CallExpression = ({ node, depth, theme, router }: Props) => {
  const colorToken = clearTokenName(node.value.args[0].value as string)
  const alphaToken = clearTokenName(node.value.args[1].value as string)
  const value =
    ('tokenFullName' in node && getPathValue(theme, node.tokenFullName)) ||
    (theme && getColorByTokens(theme, colorToken, alphaToken as string))

  return (
    <>
      <Text>
        {node.value.action}(
        {node.value.args?.map((x, idx, arr) => {
          return (
            <span key={`${String(depth)}${String(x.value)}`}>
              <ValueRenderer recursive={false} node={x} depth={depth + 1} />
              {idx + 1 < arr.length ? ', ' : ''}
            </span>
          )
        })}
        )
      </Text>
      ⦀{value && <Text>{value}</Text>}
    </>
  )
}
