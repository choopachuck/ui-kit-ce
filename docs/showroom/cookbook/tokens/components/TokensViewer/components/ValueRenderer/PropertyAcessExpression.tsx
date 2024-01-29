import { Link } from '@v-uik/base'
import { Theme } from '@v-uik/base'
import { getPathValue } from '@v-uik/base'
import { ITokensRouterContext } from 'cookbook/tokens/routing'
import {
  PropertyValue,
  ProppertyToken,
  ThemeTokens,
  TokenT,
} from 'cookbook/tokens/types'
import { clearTokenName } from 'cookbook/tokens/utils'
import React from 'react'
import { Text } from '@v-uik/base'
import { ValueRenderer } from './ValueRenderer'

interface Props {
  node: PropertyValue | ProppertyToken
  depth: number
  recursive?: boolean
  theme: Theme | undefined
  themeTokens: ThemeTokens | undefined
  router: ITokensRouterContext
  deprecated?: boolean
}

export const PropertyAccessExpression = ({
  node,
  depth,
  recursive,
  theme,
  router,
  themeTokens,
  deprecated,
}: Props) => {
  let addon = null
  const key = clearTokenName(node.value)

  if (!key.includes('sys.') && !key.includes('ref.')) {
    addon = <Text>{getPathValue(theme, key)}</Text>
  } else {
    addon = (
      <ValueRenderer
        key={String(depth) + key}
        depth={depth + 1}
        node={getPathValue(themeTokens, key) as TokenT}
      />
    )
  }

  return (
    <>
      {
        // deprecated, но участвует в наследовании (чтобы не было перехода по токену с colourway)
        deprecated ? (
          key
        ) : (
          <Link onClick={() => router.pushToken(key)}>{key}</Link>
        )
      }
      {recursive && (
        <>
          <div>↑</div>
          {addon}
        </>
      )}
    </>
  )
}
