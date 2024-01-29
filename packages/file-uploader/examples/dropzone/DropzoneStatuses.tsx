import * as React from 'react'
import AddIcon from '../icons/AddIcon'
import { Dropzone, UploaderLabel, Button, createUseStyles } from '@v-uik/base'

const useDropzoneContentStyles = createUseStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  button: {
    marginBottom: 4,
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.21)',
  },
})

const DropzoneContent: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const classesList = useDropzoneContentStyles()

  return (
    <div className={classesList.content}>
      <Button
        kind="ghost"
        color="secondary"
        disabled={disabled}
        tabIndex={-1}
        className={classesList.button}
      >
        <AddIcon className={classesList.icon} />
        Upload
      </Button>
      <span>or Drop files</span>
    </div>
  )
}

const useDropzoneStyle = createUseStyles({
  dropzone: {
    width: '100%',
    marginBottom: 16,
  },
})

export const DropzoneStatuses = () => {
  const classesList = useDropzoneStyle()

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <UploaderLabel
        label="Стандартный вид"
        description="Some description."
        className={classesList.dropzone}
      >
        <Dropzone onUpload={(files, e) => console.log(files, e)}>
          <DropzoneContent />
        </Dropzone>
      </UploaderLabel>
      <UploaderLabel
        label="Error"
        description="Some description."
        errorText="Some error text."
        className={classesList.dropzone}
      >
        <Dropzone error onUpload={(files, e) => console.log(files, e)}>
          <DropzoneContent />
        </Dropzone>
      </UploaderLabel>
      <UploaderLabel
        label="Disabled"
        description="Some description."
        className={classesList.dropzone}
      >
        <Dropzone disabled onUpload={(files, e) => console.log(files, e)}>
          <DropzoneContent disabled />
        </Dropzone>
      </UploaderLabel>
    </div>
  )
}
