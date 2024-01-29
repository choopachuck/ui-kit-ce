import React from 'react'
import {
  createUseStyles,
  Button,
  Dropzone,
  DropzoneOwnProps,
} from '@v-uik/base'
import AddIcon from '../../examples/icons/AddIcon'

const useDropzoneContentStyles = createUseStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    letterSpacing: 0.15,
    color: theme.sys.color.onBackgroundMedium,
  },
}))

const DropzoneContent: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const classesList = useDropzoneContentStyles()

  return (
    <div className={classesList.content}>
      <Button kind="ghost" color="secondary" disabled={disabled}>
        <AddIcon className={classesList.icon} />
        Загрузить
      </Button>
      <span>or Drop files</span>
    </div>
  )
}

export const DropzoneExample: React.FC<
  Omit<DropzoneOwnProps, 'children' | 'onUpload'>
> = (props) => {
  return (
    <div style={{ padding: 4 }}>
      <Dropzone onUpload={() => null} {...props}>
        <DropzoneContent disabled={props.disabled} />
      </Dropzone>
    </div>
  )
}
