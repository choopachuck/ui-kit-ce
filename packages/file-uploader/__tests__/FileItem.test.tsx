import * as React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { FileItem, FileItemIconButton } from '../src'

it('render correctly', function () {
  const onCancelMock = jest.fn()

  const { getByTestId, getByRole } = render(
    <FileItem onCancel={onCancelMock}>
      <span data-testid="test">FileName.png</span>
    </FileItem>
  )

  expect(getByTestId('test')).toBeInTheDocument()
  expect(onCancelMock).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onCancelMock).toHaveBeenCalledTimes(1)
})

it('render different size', () => {
  const onCancelMock = jest.fn()
  const { getByTestId } = render(
    <FileItem size="sm" data-testid="test" onCancel={onCancelMock}>
      <span>FileName.png</span>
    </FileItem>
  )

  expect(getByTestId('test')).toHaveStyle({
    'padding-top': 6,
    'padding-bottom': 6,
  })
})

it('render extended button icon', () => {
  const { getByTestId } = render(
    <FileItem
      renderIconButtons={({ size }) => (
        <FileItemIconButton size={size} data-testid="test">
          x
        </FileItemIconButton>
      )}
    >
      <span>FileName.png</span>
    </FileItem>
  )

  expect(getByTestId('test')).toBeInTheDocument()
})

it('render errorText', () => {
  const { getByTestId } = render(
    <FileItem status="error" errorText={<span data-testid="test">Error</span>}>
      <span>FileName.png</span>
    </FileItem>
  )

  expect(getByTestId('test')).toBeInTheDocument()
})
