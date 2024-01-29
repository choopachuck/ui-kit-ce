import { Grid, GridItem } from '@v-uik/base'
import { Theme } from '@v-uik/base'
import { getPathValue } from '@v-uik/base'
import { ITokensRouterContext } from 'cookbook/tokens/routing'
import { ConditionToken, DeepPartial } from 'cookbook/tokens/types'
import React from 'react'
import { ValueRenderer } from './ValueRenderer'
import { Text } from '@v-uik/base'

interface Props {
  node: ConditionToken
  depth: number
  router: ITokensRouterContext
}

export const ConditionalExpression = ({ node, depth, router }: Props) => {
  return (
    <>
      <Grid justify="space-around">
        <GridItem>
          <Text>v1</Text>
        </GridItem>
        <GridItem>
          <Text>v2</Text>
        </GridItem>
      </Grid>
      <Grid justify="space-around">
        <GridItem sm={8}>
          <ValueRenderer
            deprecated
            depth={depth + 1}
            node={node.value.trueValue}
          />
        </GridItem>
        <GridItem sm={8}>
          <ValueRenderer depth={depth + 1} node={node.value.falseValue} />
        </GridItem>
      </Grid>
    </>
  )
}
