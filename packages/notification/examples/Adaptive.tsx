import * as React from 'react'
import { Button, NotificationContainer, notification } from '@v-uik/base'

export const Adaptive: React.VFC = () => {
  const handleClick = () => {
    notification(
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit laborum omnis qui, quia quidem sequi!'
    )
  }

  return (
    <div>
      <Button onClick={handleClick}>показать сообщение</Button>
      <NotificationContainer closeButtonAriaLabel="Закрыть" />
    </div>
  )
}
