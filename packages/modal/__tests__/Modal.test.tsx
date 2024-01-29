import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../src'

it('render nothing without open prop', () => {
  const { queryByRole } = render(<Modal />)
  const dialog = queryByRole('dialog')
  expect(dialog).not.toBeInTheDocument()
})

it('render modal with open prop', () => {
  const { getByRole, getByText } = render(
    <Modal open>
      <ModalHeader>title</ModalHeader>
      <ModalBody>body</ModalBody>
      <ModalFooter>actions</ModalFooter>
    </Modal>
  )
  expect(getByRole('dialog')).toBeInTheDocument()
  expect(getByText('title')).toBeInTheDocument()
  expect(getByText('body')).toBeInTheDocument()
  expect(getByText('actions')).toBeInTheDocument()
})

const ComponentWithContainer = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={containerRef} data-testid="testId" />
      <Modal open container={() => containerRef.current as HTMLElement} />
    </>
  )
}

it('render to custom element', () => {
  const { getByTestId, getByRole } = render(<ComponentWithContainer />)
  expect(getByTestId('testId')).toContainElement(getByRole('dialog'))
})

it("doesn't fire backdrop click when click dialog", () => {
  const onClickDialog = jest.fn()
  const onClickBackdrop = jest.fn()
  const { getByRole } = render(
    <Modal
      open
      contentProps={{ onClick: onClickDialog }}
      backdropProps={{ onClick: onClickBackdrop }}
    />
  )
  expect(onClickDialog).toBeCalledTimes(0)
  expect(onClickBackdrop).toBeCalledTimes(0)
  fireEvent.click(getByRole('dialog'))
  expect(onClickDialog).toBeCalledTimes(1)
  expect(onClickBackdrop).toBeCalledTimes(0)
})

it('fire onClose when backdrop clicked', () => {
  const onClose = jest.fn()
  const { getByTestId } = render(
    <Modal
      open
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      backdropProps={{ 'data-testid': 'backdrop' }}
      onClose={onClose}
    />
  )
  expect(onClose).toBeCalledTimes(0)
  fireEvent.click(getByTestId('backdrop'))
  expect(onClose).toBeCalledTimes(1)
})

it("doesn't fire onClose when backdrop click disabled", () => {
  const onClose = jest.fn()
  const { getByTestId } = render(
    <Modal
      open
      disableBackdropClickHandler
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      backdropProps={{ 'data-testid': 'backdrop' }}
      onClose={onClose}
    />
  )
  expect(onClose).toBeCalledTimes(0)
  fireEvent.click(getByTestId('backdrop'))
  expect(onClose).toBeCalledTimes(0)
})

it('catch focus', () => {
  const { getAllByRole } = render(<Modal open />)
  expect(getAllByRole('presentation')[0]).toContainElement(
    document.activeElement as HTMLElement
  )
})

it('fire onClose when Esc button pressed', () => {
  const onClose = jest.fn()
  render(<Modal open onClose={onClose} />)
  expect(onClose).toBeCalledTimes(0)
  fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Escape' })
  expect(onClose).toBeCalledTimes(1)
})

it("doesn't fire onClose when Esc button disabled", () => {
  const onClose = jest.fn()
  render(<Modal open disableEscapePressHandler onClose={onClose} />)
  expect(onClose).toBeCalledTimes(0)
  fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Escape' })
  expect(onClose).toBeCalledTimes(0)
})

it("doesn't allow focus to leave modal", () => {
  render(<Modal open />)
  const sentinels = document.body.querySelectorAll('div[tabindex="0"]')
  const topSentinel = sentinels[0] as HTMLElement
  const bottomSentinel = sentinels[1] as HTMLElement
  topSentinel.focus()
  fireEvent.keyDown(topSentinel, { key: 'Tab', shiftKey: true })
  expect(document.activeElement === bottomSentinel).toBeTruthy()
  bottomSentinel.focus()
  fireEvent.keyDown(bottomSentinel, { key: 'Tab' })
  expect(document.activeElement === topSentinel).toBeTruthy()
})

it('provide aria-labelledby correctly', () => {
  const id = 'some-id'
  const { getByText, getByRole } = render(
    <Modal open aria-labelledby={id}>
      <ModalHeader>title</ModalHeader>
    </Modal>
  )
  expect(getByRole('dialog').getAttribute('aria-labelledby')).toEqual(id)
  expect(getByText('title').getAttribute('id')).toEqual(id)
})

it('generate aria-labelledby correctly', () => {
  const { getByText, getByRole } = render(
    <Modal open>
      <ModalHeader>title</ModalHeader>
    </Modal>
  )
  const dialogAttribute = getByRole('dialog').getAttribute('aria-labelledby')
  const titleAttribute = getByText('title').getAttribute('id')
  expect(dialogAttribute).toBeTruthy()
  expect(titleAttribute).toBeTruthy()
  expect(dialogAttribute === titleAttribute).toBeTruthy()
})
