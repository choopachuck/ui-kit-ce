import * as React from 'react'
import {
  UploaderLabel,
  Dropzone,
  FileItemOwnProps,
  UploaderFile,
  FileItem,
  createUseStyles,
  Button,
} from '@v-uik/base'
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

type FileEntity = Omit<
  FileItemOwnProps,
  'classes' | 'className' | 'onCancel' | 'children' | 'id'
> & { fileName: string; href: string; id: number }

const useDropzoneStyles = createUseStyles({
  label: {
    marginBottom: 16,
    width: '100%',
    boxSizing: 'border-box',
  },
  fileItem: {
    marginBottom: 8,
  },
})

export const RestrictedUploadDropzone: React.FC = () => {
  const [files, setFiles] = React.useState<FileEntity[]>([])
  const lastIdRef = React.useRef(5)
  const classesList = useDropzoneStyles()
  const [error, setError] = React.useState(false)

  const handleDelete = React.useCallback((id: number) => {
    setFiles((files) => {
      return files.filter((file) => file.id !== id)
    })
  }, [])

  const addFile = React.useCallback((newFiles: UploaderFile[]) => {
    const newFilesEntities = newFiles
      .map<FileEntity | null>((f) => {
        if (f.error || Math.ceil(f.file.size / (1024 * 1024)) > 5) {
          setError(true)

          return null
        }

        return {
          fileName: f.file.name,
          href: '#',
          id: ++lastIdRef.current,
        }
      })
      .filter(Boolean) as FileEntity[]

    setFiles((files) => {
      return [...files, ...newFilesEntities]
    })
  }, [])

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <div style={{ width: '60%' }}>
        <UploaderLabel
          className={classesList.label}
          label="File upload"
          labelProps={{
            htmlFor: 'restricted-dropzone',
          }}
          description="Only .jpg and .png files. Maximum file size 5 MB"
          errorText={
            error
              ? 'These files do not meet the download conditions'
              : undefined
          }
        >
          <Dropzone
            accept="image/png, image/jpg, image/jpeg"
            error={error}
            inputProps={{
              id: 'restricted-dropzone',
            }}
            onUpload={addFile}
          >
            <DropzoneContent />
          </Dropzone>
        </UploaderLabel>
        {files.map(({ fileName, href, id, ...rest }) => (
          <FileItem
            key={id}
            className={classesList.fileItem}
            onCancel={() => handleDelete(id)}
            {...rest}
          >
            {fileName}
          </FileItem>
        ))}
      </div>
    </div>
  )
}
