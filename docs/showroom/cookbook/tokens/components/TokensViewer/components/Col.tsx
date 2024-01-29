import * as React from 'react'
import { GridItem, List, ListItem, createUseStyles } from '@v-uik/base'
import { TokenView } from './TokenView'
import { ThemeTokens, TokenGroup, TokenMap, TokenT } from '../../../types'
import { TokensRouterContext } from '../../../routing'

const useListStyles = createUseStyles((theme) => ({
  selected: {
    background: theme.sys.color.primaryAlpha,
    color: theme.sys.color.onPrimaryHigh,
  },
}))

type ColProps = {
  node: ThemeTokens | TokenGroup | TokenMap
  depth?: number
  parent?: string
}

/**
 * Компонент рекурсивно рендерит новую колонку токен уровней исходя из предыдущего выбранного уровня
 *
 * @param node - группа рассматриваемых уровней
 * @param depth - глубина уровней (позиция уровня токена)
 * @param parent - предыдущий активный элемент, используется в рекурсии
 */
export const Col: React.FC<ColProps> = ({ node, depth = 0, parent = '' }) => {
  const styles = useListStyles()
  const [activeLevel, setActiveLevel] = React.useState('')

  const router = React.useContext(TokensRouterContext)
  if (!router) {
    throw new Error('Tokens router must be defined!')
  }

  React.useEffect(() => {
    if (router.locationLevels.length) {
      setActiveLevel(router.locationLevels[depth])
    } else {
      setActiveLevel('')
    }
  }, [router.locationLevels])

  return (
    <>
      <GridItem
        style={{ padding: '0 .5rem', borderRight: '1px solid rgba(0,0,0,.1)' }}
      >
        <List interactive style={{ height: '350px', overflowY: 'auto' }}>
          {Object.keys(node).map((c) => (
            <ListItem
              key={c}
              size="sm"
              classes={{
                selected: styles.selected,
              }}
              selected={c === activeLevel}
              onClick={() => {
                router.pushTokenLevel(c, depth)
              }}
            >
              {c}
            </ListItem>
          ))}
        </List>
      </GridItem>
      {activeLevel && !node[activeLevel].tokenName && (
        <Col
          key={String(depth + 1) + activeLevel}
          parent={`${parent}${activeLevel}.`}
          depth={depth + 1}
          node={node[activeLevel] as TokenMap | TokenGroup}
        />
      )}
      {activeLevel && node[activeLevel].tokenName && (
        <TokenView node={node[activeLevel] as TokenT} />
      )}
    </>
  )
}
