import * as React from 'react'
import { Popup, PopupProps } from '../src'
import { fireEvent, render } from '@testing-library/react'

const Component = (props: Partial<PopupProps>) => {
  const anchor = () => document.getElementById('anchor') as HTMLElement

  const [visible, setVisible] = React.useState(props.open)

  return (
    <>
      <div
        id="anchor"
        role="button"
        style={{
          margin: '50px 0 50px 150px',
          backgroundColor: 'aqua',
          display: 'inline-flex',
          padding: 10,
          borderRadius: 4,
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        Anchor
      </div>
      <Popup open={visible} anchor={anchor}>
        Содержимое popup
      </Popup>
    </>
  )
}

it('should render', () => {
  const { getByRole, getByText } = render(<Component open />)

  expect(getByRole('tooltip')).toBeInTheDocument()
  expect(getByText('Содержимое popup')).toBeInTheDocument()
})

it('without true open prop not render', () => {
  const { queryByRole, queryByText } = render(<Component open={false} />)

  expect(queryByRole('tooltip')).not.toBeInTheDocument()
  expect(queryByText('Содержимое popup')).not.toBeInTheDocument()
})

it('hover appearance control', async () => {
  const { getByRole, queryByRole, queryByText, findByRole, findByText } =
    render(<Component open={false} />)

  const anchor = getByRole('button', { name: 'Anchor' })

  expect(queryByRole('tooltip')).not.toBeInTheDocument()
  expect(queryByText('Содержимое popup')).not.toBeInTheDocument()

  fireEvent.mouseEnter(anchor)
  expect(await findByRole('tooltip')).toBeInTheDocument()
  expect(await findByText('Содержимое popup')).toBeInTheDocument()

  fireEvent.mouseLeave(anchor)
  expect(queryByRole('tooltip')).not.toBeInTheDocument()
  expect(queryByText('Содержимое popup')).not.toBeInTheDocument()
})
