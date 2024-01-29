import * as React from 'react'
import * as ReactDOM from 'react-dom'

export interface PortalProps {
  /**
   * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится children
   */
  container?: (() => HTMLElement) | HTMLElement
  /**
   * Потомки компонента
   */
  children?: React.ReactNode
}

export const Portal = ({
  children,
  container,
}: PortalProps): React.ReactPortal | null => {
  const [mountNode, setMountNode] = React.useState<HTMLElement>()

  React.useEffect(() => {
    setMountNode(
      typeof container === 'function' ? container() : container || document.body
    )
  }, [container])

  return mountNode ? ReactDOM.createPortal(children, mountNode) : null
}
