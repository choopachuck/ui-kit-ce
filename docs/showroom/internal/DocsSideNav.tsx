import * as React from 'react'
import { createUseStyles, clsx, Link } from '@v-uik/base'
import { scrollToElement } from './scrollToElement'
import { navigate } from './navigate'
import { HeadersOnPage } from './HeadersOnPage'

const useStyles = createUseStyles({
  root: {
    position: 'sticky',
    top: '4rem',
    padding: 0,
    boxSizing: 'border-box',
    height: 'calc(100vh - 80px)',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      width: '100%',
      backgroundOrigin: 'padding-box',
      backgroundClip: 'border-box',
      display: 'block',
      backgroundSize: 'auto auto',
    },
    transition: 'margin-bottom .3s ease-in-out',
  },

  dividerTop: {
    '&::before': {
      height: 100,
      top: 0,
      backgroundImage:
        'linear-gradient(180deg, rgba(255,255,255,1) 0,  rgba(255,255,255,0) 100%)',
    },
  },

  dividerBottom: {
    '&::after': {
      height: 50,
      bottom: 0,
      backgroundImage:
        'linear-gradient(180deg, rgba(255,255,255,0) 0,  rgba(255,255,255,1) 100%)',
    },
  },

  rootEnd: {
    marginBottom: '4rem',
  },

  list: {
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    margin: 0,
    marginBottom: '4rem',
  },

  listItem: {
    listStyle: 'none',
    margin: [4, 0],
    width: '100%',
    display: 'flex',
    // Для вложенных элементов будет максимальное смещение 6em + 300px
    boxSizing: 'border-box',
  },

  listItemLink: {
    display: 'inline-block',
    padding: '0.25em 0',
    maxWidth: 'inherit',
    boxSizing: 'border-box',
  },
})

const getRootOnEnd = () =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight

const getDividerFlags = (
  list: HTMLUListElement
): { showTopDivider: boolean; showBottomDivider: boolean } => {
  return {
    showTopDivider: list.scrollTop !== 0,
    showBottomDivider: list.scrollHeight - list.scrollTop !== list.clientHeight,
  }
}

/**
 * Отображает дополнительное меню навигации на вкладке docs.
 *
 * TODO: компонент никак не скрывается на маленьких экранах, сейчас делаем предположение
 * что все используют десктопную версию сторибука
 */
export const DocsSideNav: React.FC = () => {
  const classesList = useStyles()
  const ref = React.useRef<HTMLUListElement>(null)

  const headersOnPage = HeadersOnPage.getInstance()

  const [list, setList] = React.useState(headersOnPage.value.slice())
  const [showTopDivider, setShowTopDivider] = React.useState(false)
  const [showBottomDivider, setShowBottomDivider] = React.useState(false)
  const [rootOnEnd, setRootOnEnd] = React.useState(false)

  const offDocsRendered = headersOnPage.onDocsRendered(setList)

  const setUpDividers = (list: HTMLUListElement) => {
    const { showBottomDivider, showTopDivider } = getDividerFlags(list)

    setShowTopDivider(showTopDivider)
    setShowBottomDivider(showBottomDivider)
  }

  const rootClassName = clsx(classesList.root, {
    [classesList.dividerTop]: showTopDivider,
    [classesList.dividerBottom]: showBottomDivider,
  })

  const handleScroll = (event: React.UIEvent<HTMLUListElement, UIEvent>) => {
    setUpDividers(event.target as HTMLUListElement)
  }

  const handleScrollWindow = () => {
    setRootOnEnd(getRootOnEnd())
  }

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    setUpDividers(ref.current)
  }, [])

  React.useEffect(() => {
    const handleResize = () => {
      if (!ref.current) {
        return
      }
      setUpDividers(ref.current)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScrollWindow)

    return () => {
      offDocsRendered()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScrollWindow)
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

  if (list.length === 1) {
    return null
  }

  return (
    <div
      className={rootClassName}
      style={{ marginBottom: rootOnEnd ? '4rem' : '0px' }}
    >
      <ul ref={ref} className={classesList.list} onScroll={handleScroll}>
        {list.map((item) => {
          return (
            <li
              key={item.id}
              className={classesList.listItem}
              style={{ paddingLeft: item.level.charAt(1) + 'em' }}
            >
              <Link
                href={'#' + item.id}
                className={clsx(classesList.listItemLink)}
                onClick={(event) => handleLinkClick(item.id, event)}
              >
                {item.children}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
