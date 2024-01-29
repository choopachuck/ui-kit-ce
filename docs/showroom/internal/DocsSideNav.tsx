import * as React from 'react'
import { createUseStyles, clsx, Link, useText } from '@v-uik/base'
import { scrollToElement } from './scrollToElement'
import { navigate } from './navigate'
import { HeadersOnPage } from './HeadersOnPage'

const useStyles = createUseStyles({
  root: {
    height: '100%',
    position: 'sticky',
    top: '4rem',
    width: '300px',
    maxWidth: '300px',
    padding: 0,
    boxSizing: 'border-box',
  },

  listItem: {
    listStyle: 'none',
    // Для вложенных элементов будет максимальное смещение 6em + 300px
    maxWidth: 'inherit',
    boxSizing: 'border-box',
  },

  listItemLink: {
    display: 'inline-block',
    padding: '0.25em 0',
    maxWidth: 'inherit',
    boxSizing: 'border-box',
  },
})

/**
 * Отображает дополнительное меню навигации на вкладке docs.
 *
 * TODO: компонент никак не скрывается на маленьких экранах, сейчас делаем предположение
 * что все используют десктопную версию сторибука
 */
export const DocsSideNav = (): JSX.Element => {
  const classesList = useStyles()
  const classesText = useText()

  const headersOnPage = HeadersOnPage.getInstance()

  const [list, setList] = React.useState(headersOnPage.value.slice())

  const offDocsRendered = headersOnPage.onDocsRendered(setList)

  React.useEffect(() => {
    return () => {
      offDocsRendered()
    }
  }, [offDocsRendered])

  const handleLinkClick = (id: string, event: React.SyntheticEvent) => {
    event.preventDefault()

    navigate(`#${id}`)

    const elToScroll = document.getElementById(id)

    if (elToScroll) {
      scrollToElement(elToScroll)
    }
  }

  return (
    <ul className={classesList.root}>
      {list.map((item) => {
        return (
          <li
            key={item.id}
            className={classesList.listItem}
            style={{ paddingLeft: item.level.charAt(1) + 'em' }}
          >
            <Link
              href={'#' + item.id}
              className={clsx(classesList.listItemLink, classesText.ellipsis)}
              onClick={(event) => handleLinkClick(item.id, event)}
            >
              {item.children}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
