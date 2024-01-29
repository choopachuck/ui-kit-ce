import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Dropzone } from '../src'
import { createTheme } from '@v-uik/theme'

const createMockFile = (
  fileName = 'values.json',
  type = 'application/JSON'
): File => {
  const someValues = [{ name: 'example' }]

  const str = JSON.stringify(someValues)
  const blob = new Blob([str])
  const file = new File([blob], fileName, {
    type,
  })
  File.prototype.text = jest.fn().mockResolvedValueOnce(str)

  return file
}

const theme = createTheme()

function mockData(files: Array<File>) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  }
}

function dispatchEvt(node: never, type: never, data: never) {
  const event = new Event(type, { bubbles: true })
  Object.assign(event, data)
  fireEvent(node, event)
}

it('render Dropzone', () => {
  const onUploadMock = jest.fn()
  const file1 = createMockFile()

  const { getByTestId } = render(
    // @ts-ignore
    <Dropzone inputProps={{ 'data-testid': 'test' }} onUpload={onUploadMock}>
      <span>Загрузить</span>
    </Dropzone>
  )

  const input = getByTestId('test')
  expect(onUploadMock).toHaveBeenCalledTimes(0)

  user.upload(input, file1)
  expect(onUploadMock).toHaveBeenCalledTimes(1)
})

it('multiple dropzone files', () => {
  const onUploadMock = jest.fn()
  const file1 = createMockFile('values1.json')
  const file2 = createMockFile('values2.json')

  const { getByTestId } = render(
    <Dropzone
      multiple
      // @ts-ignore
      inputProps={{ 'data-testid': 'test' }}
      onUpload={onUploadMock}
    >
      <span>Загрузить</span>
    </Dropzone>
  )

  const input = getByTestId('test')

  user.upload(input, [file1, file2])
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(onUploadMock.mock.calls[0][0]).toEqual([
    { file: file1, error: undefined },
    { file: file2, error: undefined },
  ])
})

it("test drag'n'drop in dropzone", () => {
  const onUploadMock = jest.fn()

  const { getByTestId } = render(
    <Dropzone multiple data-testid="test" onUpload={onUploadMock}>
      <span>Загрузить</span>
    </Dropzone>
  )

  const file1 = createMockFile('values1.json')
  const file2 = createMockFile('values2.json')

  const data = mockData([file1, file2])

  const dropzoneContainer: HTMLElement = getByTestId('test')
  dispatchEvt(dropzoneContainer as never, 'dragenter' as never, data as never)

  expect(getByTestId('test')).toHaveStyle({
    background: theme.comp.dropzone.colorBackgroundDragEnter,
  })

  dispatchEvt(dropzoneContainer as never, 'drop' as never, data as never)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(onUploadMock.mock.calls[0][0]).toEqual([
    { file: file1, error: undefined },
    { file: file2, error: undefined },
  ])
})

it('test onUpload with dropzone accept prop', () => {
  const onUploadMock = jest.fn()

  const { getByTestId } = render(
    <Dropzone
      multiple
      data-testid="test"
      accept="image/png, image/jpg, image/jpeg"
      onUpload={onUploadMock}
    >
      <span>Загрузить</span>
    </Dropzone>
  )

  const file1 = createMockFile('values1.png', 'image/png')
  const file2 = createMockFile('values2.json')

  const data = mockData([file1, file2])

  const dropzoneContainer: HTMLElement = getByTestId('test')

  dispatchEvt(dropzoneContainer as never, 'drop' as never, data as never)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(onUploadMock.mock.calls[0][0]).toEqual([
    { file: file1, error: undefined },
    { file: file2, error: 'FILE_INVALID_TYPE' },
  ])
})
