import * as React from 'react'
import { Dropzone, createUseStyles, Button } from '@v-uik/base'
import AddIcon from '../icons/AddIcon'

const useDropzoneContentStyles = createUseStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
})

const DropzoneContent: React.FC = () => {
  const classesList = useDropzoneContentStyles()

  return (
    <div className={classesList.content}>
      <Button
        kind="ghost"
        color="secondary"
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
  fileItem: {
    marginBottom: 8,
  },
})

export const BasicDropzone = (): JSX.Element => {
  const classesList = useDropzoneStyle()

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <Dropzone
        className={classesList.dropzone}
        onUpload={(files) => console.log(files)}
      >
        <DropzoneContent />
      </Dropzone>
    </div>
  )
}
