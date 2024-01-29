import * as React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { ButtonUploader } from '../src'

const createMockFile = (): File => {
  const someValues = [{ name: 'example' }]

  const str = JSON.stringify(someValues)
  const blob = new Blob([str])
  const file = new File([blob], 'values.json', {
    type: 'application/JSON',
  })
  File.prototype.text = jest.fn().mockResolvedValueOnce(str)

  return file
}

it('render component', () => {
  const onUploadMock = jest.fn()

  const { getByText } = render(
    <ButtonUploader onUpload={onUploadMock}>Загрузить</ButtonUploader>
  )

  expect(getByText('Загрузить')).toBeInTheDocument()
})

it('test onUpload', () => {
  const file = createMockFile()
  const onUploadMock = jest.fn()

  const { getByTestId } = render(
    <ButtonUploader
      // @ts-ignore
      inputProps={{ 'data-testid': 'test' }}
      onUpload={onUploadMock}
    >
      Загрузить
    </ButtonUploader>
  )

  const input = getByTestId('test')
  expect(onUploadMock).toHaveBeenCalledTimes(0)
  user.upload(input, file)

  expect(onUploadMock).toHaveBeenCalledTimes(1)
})
