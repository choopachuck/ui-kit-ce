import * as React from 'react'
import {
  Dropzone,
  FileItem,
  FileItemOwnProps,
  UploaderFile,
  UploaderLabel,
  Button,
  Select,
  createUseStyles,
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

const DEFAULT_FILES: FileEntity[] = [
  {
    id: 1,
    fileName: 'FileName-1.png',
    href: '#',
  },
  {
    id: 2,
    fileName: 'FileName-2.png',
    href: '#',
    status: 'success',
  },
  {
    id: 3,
    fileName: 'FileName-3.png',
    status: 'error',
    errorText: 'Error text',
    href: '#',
  },
  {
    id: 4,
    fileName: 'FileName-4.png',
    status: 'progress',
    href: '#',
    info: '4 / 6 MB',
  },
  {
    id: 5,
    fileName: 'FileName-5.png',
    status: 'progress',
    href: '#',
    progressType: 'linear',
  },
]

const useDropzoneStyles = createUseStyles({
  select: {
    width: 180,
    marginBottom: 16,
  },
  dropzone: {
    marginBottom: 16,
    width: '100%',
    boxSizing: 'border-box',
  },
  fileItem: {
    marginBottom: 8,
  },
})

export const DropzoneCause: React.FC = () => {
  const [value, setValue] = React.useState<'md' | 'sm' | 'lg'>('md')
  const [files, setFiles] = React.useState(DEFAULT_FILES)
  const lastIdRef = React.useRef(5)
  const classesList = useDropzoneStyles()

  const handleDelete = React.useCallback((id: number) => {
    setFiles((files) => {
      return files.filter((file) => file.id !== id)
    })
  }, [])

  const addFile = React.useCallback((newFiles: UploaderFile[]) => {
    const newFilesEntities = newFiles.map<FileEntity>((f) => ({
      fileName: f.file.name,
      href: '#',
      id: ++lastIdRef.current,
    }))
    setFiles((files) => {
      return [...files, ...newFilesEntities]
    })
  }, [])

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <Select
        options={[
          { value: 'sm', label: 'sm' },
          { value: 'md', label: 'md' },
          { value: 'lg', label: 'lg' },
        ]}
        className={classesList.select}
        value={value}
        label="Размер FileItem"
        onChange={(value: string) => setValue(value as 'md' | 'sm' | 'lg')}
      />
      <div style={{ width: '60%' }}>
        <UploaderLabel
          className={classesList.dropzone}
          label="Label"
          description="Description"
          labelProps={{
            htmlFor: 'basic-dropzone',
          }}
        >
          <Dropzone
            inputProps={{
              id: 'basic-dropzone',
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
            size={value}
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
