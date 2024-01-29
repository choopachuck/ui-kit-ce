import * as React from 'react'
import { ButtonUploader, UploaderLabel, ButtonUploaderProps } from '@v-uik/base'

const MAX_FILES_COUNT = 3

export const MaxFiles = (): JSX.Element => {
  const [error, setError] = React.useState('')

  const handleFileUploads: ButtonUploaderProps['onUpload'] = React.useCallback(
    (files, e) => {
      setError(
        files.length < MAX_FILES_COUNT ? '' : 'Ошибка. Превышен лимит файлов'
      )
      // обработка файлов
      // eslint-disable-next-line no-console
      console.log(files, e)
    },
    []
  )

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <UploaderLabel
        label="File upload"
        description="Limit 3 files"
        errorText={error}
      >
        <ButtonUploader
          color={error ? 'error' : 'secondary'}
          onUpload={handleFileUploads}
        >
          Upload file
        </ButtonUploader>
      </UploaderLabel>
    </div>
  )
}
