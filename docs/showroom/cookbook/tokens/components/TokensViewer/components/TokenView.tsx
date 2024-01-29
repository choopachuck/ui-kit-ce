import * as React from 'react'
import { Text } from '@v-uik/base'
import { ValueRenderer } from './ValueRenderer'
import { List, ListItem } from '@v-uik/base'
import { TokenT, TokenValue } from '../../../types'
import { TokenViewContext } from '../TokenViewContext'
import { Accordion, AccordionItem } from '@v-uik/base'
import { Link } from '@v-uik/base'
import { TokensRouterContext } from '../../../routing'
import { findUsages, clearTokenName } from '../../../utils'

const checkValue = (v: TokenT | TokenValue, tokenFullName: string): boolean => {
  switch (v.kind) {
    case 'PropertyAccessExpression': {
      return clearTokenName(v.value) === clearTokenName(tokenFullName)
    }
    case 'CallExpression': {
      return !!v.value.args.find((a) => checkValue(a, tokenFullName))
    }
    case 'ConditionalExpression': {
      return (
        checkValue(v.value.trueValue, tokenFullName) ||
        checkValue(v.value.falseValue, tokenFullName)
      )
    }
    default:
      return false
  }
}

export const TokenView: React.FC<{ node: TokenT }> = ({ node }) => {
  const [usages, setUsages] = React.useState<string[]>([])
  const { themeTokens } = React.useContext(TokenViewContext)

  const getData = React.useCallback((): void => {
    if (!themeTokens) {
      return
    }

    const res = findUsages(node.tokenFullName)
    setUsages(res)
  }, [node.tokenFullName])

  React.useEffect(() => {
    getData()
  }, [getData])

  const router = React.useContext(TokensRouterContext)
  if (!router) {
    throw new Error('Tokens router must be defined!')
  }

  return (
    <div
      style={{
        height: '350px',
        overflowY: 'auto',
        padding: '0rem 0.5rem',
        minWidth: '500px',
        textAlign: 'center',
      }}
    >
      <Text
        kind="subtitle2"
        style={{
          wordBreak: 'break-all',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{node.tokenFullName}</span>
      </Text>
      <Accordion>
        <AccordionItem expanded header="Наследование">
          <ValueRenderer key={node.tokenFullName} node={node} />
        </AccordionItem>
      </Accordion>
      <Accordion style={{ marginTop: '-1px' }}>
        <AccordionItem
          expanded
          header="Используется в"
          style={{ textAlign: 'right' }}
        >
          {usages.length ? (
            <List>
              {usages.map((x) => (
                <ListItem key={x}>
                  <Link onClick={() => router.pushToken(x)}>{x}</Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>Зависимостей не найдено</Text>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  )
}
