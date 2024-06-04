import * as React from 'react'
import {
  Button,
  Link,
  NotificationContainer,
  notification,
  TNotificationStatus,
  TNotificationPosition,
} from '@v-uik/base'

import { Icon } from './assets/Icon'

const getShowIcon = (showIcon: boolean, showCustomContent: boolean) => {
  if (showIcon) {
    return showCustomContent ? <Icon /> : undefined
  }

  return null
}

export type PlaygroundProps = {
  position: TNotificationPosition
  status: TNotificationStatus
  autoClose: number
  limit?: number
  disableAutoClose: boolean
  closeOnEscapeKeyDown: boolean
  pauseOnHover: boolean
  pauseOnWindowBlur: boolean
  closeOnClick: boolean
  showCloseButton: boolean
  showIndicator: boolean
  showIcon: boolean
  showCustomContent: boolean
  showTitle: boolean
  showDescription: boolean
  title: string
  description: string
}

export const Playground = ({
  position,
  status,
  autoClose,
  limit,
  disableAutoClose,
  closeOnEscapeKeyDown,
  pauseOnHover,
  pauseOnWindowBlur,
  closeOnClick,
  showCloseButton,
  showIndicator,
  showIcon,
  showCustomContent,
  showTitle,
  showDescription,
  title,
  description,
}: PlaygroundProps): React.ReactElement => {
  const customizedId = React.useRef(1)

  const showMessage = () => {
    const id = showCustomContent
      ? `custom-id-${customizedId.current++}`
      : undefined

    const content = showDescription ? description : undefined
    const actions = (
      <div
        style={{
          display: 'flex',
          marginRight: showCloseButton ? -40 : 0,
        }}
      >
        <Link href="">Link</Link>

        <Button
          style={{ marginLeft: 'auto' }}
          kind="outlined"
          size="sm"
          color="secondary"
          onClick={() => notification.close(id as string)}
        >
          Button
        </Button>
      </div>
    )

    notification(content, {
      direction:
        showDescription || showCustomContent ? 'vertical' : 'horizontal',
      title: showTitle ? title : null,
      actions: showCustomContent ? actions : null,
      status,
      icon: getShowIcon(showIcon, showCustomContent),
      id,
    })
  }

  return (
    <div>
      <div>
        <Button style={{ marginRight: 16 }} onClick={showMessage}>
          показать сообщение
        </Button>

        <Button
          color="error"
          style={{ marginRight: 16 }}
          onClick={() => notification.closeAll()}
        >
          закрыть все сообщения
        </Button>
      </div>

      <NotificationContainer
        nextNotification
        position={position}
        autoClose={disableAutoClose ? false : autoClose}
        limit={limit}
        pauseOnHover={pauseOnHover}
        pauseOnWindowBlur={pauseOnWindowBlur}
        closeOnClick={closeOnClick}
        showCloseButton={showCloseButton}
        showIndicator={showIndicator}
        closeOnEscapeKeyDown={closeOnEscapeKeyDown}
        closeButtonAriaLabel="Закрыть"
      />
    </div>
  )
}
