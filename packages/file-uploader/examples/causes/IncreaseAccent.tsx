import React from 'react'
import {
  createUseStyles,
  Button,
  ButtonProps,
  Select,
  Dropzone,
  UploaderLabel,
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

const DropzoneContent: React.FC<{ kind: ButtonProps['kind'] }> = ({ kind }) => {
  const classesList = useDropzoneContentStyles()

  return (
    <div className={classesList.content}>
      <Button
        kind={kind}
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
    marginBottom: 16,
    width: '100%',
    boxSizing: 'border-box',
  },
  fileItem: {
    marginBottom: 8,
  },
})

export const IncreaseAccent: React.FC = () => {
  const [value, setValue] = React.useState<ButtonProps['kind']>('ghost')

  const classesList = useDropzoneStyles()

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <Select
        options={[
          { value: 'ghost', label: 'ghost' },
          { value: 'contained', label: 'contained' },
          { value: 'outlined', label: 'outlined' },
        ]}
        className={classesList.select}
        value={value}
        label="Color"
        onChange={(value: string) => setValue(value as ButtonProps['kind'])}
      />
      <div style={{ width: '60%' }}>
        <UploaderLabel
          className={classesList.dropzone}
          label="Label"
          description="Description"
          labelProps={{
            htmlFor: 'increase-accent',
          }}
        >
          <Dropzone
            inputProps={{ id: 'increase-accent' }}
            className={classesList.dropzone}
            onUpload={() => null}
          >
            <DropzoneContent kind={value} />
          </Dropzone>
        </UploaderLabel>
      </div>
    </div>
  )
}
