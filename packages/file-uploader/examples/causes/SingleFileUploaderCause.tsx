import * as React from 'react'
import {
  Select,
  Button,
  Dropzone,
  FileItem,
  UploaderFile,
  UploaderLabel,
  ElementSizeType,
  createUseStyles,
} from '@v-uik/base'
import AddIcon from '../icons/AddIcon'

const useStyles = createUseStyles({
  uploaderLabel: {
    width: 288,
  },
  dropzone: {
    padding: 4,

    boxSizing: 'border-box',
    minHeight: 'unset',
    alignItems: 'unset',
    justifyContent: 'unset',
    '&:has($fileItem:hover):hover': {
      background: 'inherit',
      '&::after': {
        borderColor: 'inherit',
      },
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    marginLeft: 4,
    flex: 1,
  },
  fileItem: {
    flex: 1,
    marginLeft: 4,
    overflowX: 'hidden',
    marginTop: -2,
    marginBottom: -2,
    paddingTop: 2,
    paddingBottom: 2,
  },
  fileItemContent: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
  },
  fileLink: {
    display: 'inline',
  },
})

type Sizes = 'md' | 'lg' | 'sm'

const isDropEvent = (
  event: Event | React.DragEvent<HTMLElement>
): event is React.DragEvent<HTMLElement> => event.type === 'drop'

const SingleFileUploader: React.FC<{
  file: UploaderFile | null
  size?: ElementSizeType
  onUpload: (file: UploaderFile) => void
  onDelete: () => void
}> = ({ file: fileEntry, onDelete, onUpload, size = 'md' }) => {
  const classesList = useStyles()

  const [error, setError] = React.useState(false)

  const addFile = React.useCallback(
    (files: UploaderFile[], event) => {
      setError(false)
      if (files.length === 0) {
        return
      }

      if (isDropEvent(event) && event.dataTransfer.files.length > 1) {
        setError(true)
      }

      onUpload(files[0])
    },
    [onUpload]
  )

  const deleteFile: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (e) => {
        e.stopPropagation()
        onDelete()
      },
      [onDelete]
    )

  return (
    <UploaderLabel
      className={classesList.uploaderLabel}
      label="Label"
      description="Description"
      errorText={error ? 'Error. File limit exceeded' : undefined}
      labelProps={{ htmlFor: 'single-file-uploader' }}
    >
      <Dropzone
        className={classesList.dropzone}
        multiple={false}
        inputProps={{ id: 'single-file-uploader' }}
        onUpload={addFile}
      >
        <div className={classesList.content}>
          <Button kind="ghost" color="secondary" size={size} tabIndex={-1}>
            <AddIcon
              className={classesList.icon}
              width={size === 'sm' ? 16 : 24}
              height={size === 'sm' ? 16 : 24}
            />
            Upload
          </Button>
          {!fileEntry ? (
            <span className={classesList.text}>or Drop files</span>
          ) : (
            <div className={classesList.fileItem}>
              <FileItem
                classes={{ content: classesList.fileItemContent }}
                size={size}
                onClick={(e) => e.stopPropagation()}
                onCancel={deleteFile}
                onKeyDown={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
              >
                <span className={classesList.fileLink}>
                  {fileEntry.file.name}
                </span>
              </FileItem>
            </div>
          )}
        </div>
      </Dropzone>
    </UploaderLabel>
  )
}

export const SingleFileUploaderCause: React.FC = () => {
  const [file, setFile] = React.useState<UploaderFile | null>({
    file: {
      name: 'FileName.png',
    } as File,
  })

  const [size, setSize] = React.useState<Sizes>('md')

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Select
        value={size}
        label="Size"
        options={[
          { value: 'sm', label: 'sm' },
          { value: 'md', label: 'md' },
          { value: 'lg', label: 'lg' },
        ]}
        style={{ marginBottom: 16, width: 180 }}
        onChange={(val: Sizes) => setSize(val)}
      />
      <SingleFileUploader
        file={file}
        size={size}
        onUpload={setFile}
        onDelete={() => setFile(null)}
      />
    </div>
  )
}
