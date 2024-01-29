import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
})

interface DocsWrapperProps extends React.ComponentPropsWithoutRef<'div'> {}

// Обертка для вкладки docs, чтобы добавить SideMenu
export const DocsWrapper = (props: DocsWrapperProps): JSX.Element => {
  const { children } = props
  const classesList = useStyles()

  return <div className={classesList.root}>{children}</div>
}
