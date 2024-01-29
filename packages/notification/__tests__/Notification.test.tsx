import * as React from 'react'
import {
  notification,
  NotificationContainer,
  NotificationContainerProps,
  TNotificationStatus,
} from '../src'
import { Button } from '../../button/src'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

type Props = {
  showCustomContent?: boolean
  showDescription?: boolean
  title?: string
  description?: string
  showIcon?: boolean
  status?: TNotificationStatus
  containerProps?: NotificationContainerProps
}

const Component: React.FC<Props> = (props) => {
  const {
    containerProps,
    description,
    title = 'Message',
    showCustomContent,
    showDescription,
    status = 'default',
    showIcon,
  } = props

  const customizedId = React.useRef(1)

  const showMessage = () => {
    const content =
      showDescription || showCustomContent ? (
        <>
          {title}

          {showDescription && <span>{description}</span>}

          {showCustomContent && <div>Custom content</div>}
        </>
      ) : (
        title
      )

    notification(content, {
      status,
      icon: showIcon,
      id: `custom-id-${customizedId.current++}`,
    })
  }

  return (
    <div>
      <Button data-testid="showMessage" onClick={showMessage}>
        показать сообщение
      </Button>

      <Button
        data-testid="closeMessage"
        onClick={() => notification.closeAll()}
      >
        закрыть все сообщения
      </Button>

      <NotificationContainer {...containerProps} />
    </div>
  )
}

it('set title correctly ', async () => {
  const { getByTestId } = render(<Component title="custom title" />)
  const notificationButton = getByTestId('showMessage')
  fireEvent.click(notificationButton)

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('custom title')
})

it('set description correctly', async () => {
  const { getByTestId } = render(
    <Component showDescription description="description field" />
  )
  const notificationButton = getByTestId('showMessage')
  fireEvent.click(notificationButton)

  await waitFor(() => screen.getByRole('alert'))

  expect(screen.getByRole('alert')).toHaveTextContent('description field')
})

it('set position correctly', async () => {
  const { getByTestId } = render(
    <Component containerProps={{ position: 'bottom-left' }} />
  )

  const notificationButton = getByTestId('showMessage')
  fireEvent.click(notificationButton)

  await waitFor(() => screen.getByRole('alert'))
  expect(
    document.querySelectorAll('div[class^="container"]')[0].className
  ).toMatch(/^.*?\bbottom\b.*?\bleft\b.*?$/i)
})

it('set indicator correctly', async () => {
  const { getByTestId } = render(
    <Component
      containerProps={{
        showIndicator: true,
      }}
    />
  )
  const notificationButton = getByTestId('showMessage')
  fireEvent.click(notificationButton)

  await waitFor(() => screen.getByRole('alert'))

  expect(
    document.querySelectorAll('div[class^="indicator"]')[0]
  ).toBeInTheDocument()
})

it('visible close button', async () => {
  const { getByTestId } = render(
    <Component
      containerProps={{
        showCloseButton: true,
      }}
    />
  )
  const notificationButton = getByTestId('showMessage')
  fireEvent.click(notificationButton)

  await waitFor(() => screen.getByRole('alert'))

  expect(document.querySelector('button')).toBeInTheDocument()
})
