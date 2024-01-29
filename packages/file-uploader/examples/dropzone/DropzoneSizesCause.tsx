import * as React from 'react'
import {
  Dropzone,
  UploaderLabel,
  createUseStyles,
  Select,
  Button,
} from '@v-uik/base'
import AddIcon from '../icons/AddIcon'

type DropzoneSizes = 'fixed' | 'fill'

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

const useDropzoneStyles = createUseStyles({
  select: {
    width: 180,
    marginBottom: 16,
  },
  dropzone: {
    width: '100%',
    boxSizing: 'border-box',
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  fileItem: {
    marginBottom: 8,
  },
})

export const DropzoneSizesCause: React.FC = () => {
  const [size, setSize] = React.useState<DropzoneSizes>('fixed')
  const classesList = useDropzoneStyles()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: 400,
      }}
    >
      <Select
        value={size}
        options={[
          { value: 'fixed', label: 'fixed' },
          { value: 'fill', label: 'fill' },
        ]}
        className={classesList.select}
        onChange={(v: string) => setSize(v as DropzoneSizes)}
      />
      <div style={{ width: '60%', flex: 1 }}>
        <UploaderLabel
          className={classesList.dropzone}
          label="Label"
          description="Description"
        >
          <Dropzone
            style={{ flex: size === 'fill' ? '1' : undefined }}
            onUpload={(v, e) => console.log(v, e)}
          >
            <DropzoneContent />
          </Dropzone>
        </UploaderLabel>
      </div>
    </div>
  )
}
