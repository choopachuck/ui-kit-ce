import * as React from 'react'
import {
  NotificationContainer,
  notification as coreNotification,
  Button,
} from '@v-uik/base'

export default () => {
  return (
    <>
      <NotificationContainer />
      <Button onClick={() => coreNotification('notification content')}>
        show notification
      </Button>
    </>
  )
}
