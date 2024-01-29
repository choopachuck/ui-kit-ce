import React from 'react'
import {
  FileItem,
  FileItemOwnProps,
  createUseStyles,
  Select,
} from '@v-uik/base'

const useStyles = createUseStyles({
  fileItem: {
    marginBottom: 8,
  },
})

export const FileItemStatuses: React.FC = () => {
  const classesList = useStyles()

  const [progress, setProgress] = React.useState(0)
  const [value, setValue] = React.useState<FileItemOwnProps['size']>('md')

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((t) => {
        if (t >= 100) {
          return 0
        }

        return t + 1
      })
    }, 150)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Select
        value={value}
        options={[
          { value: 'sm', label: 'sm' },
          { value: 'md', label: 'md' },
          { value: 'lg', label: 'lg' },
        ]}
        style={{ marginBottom: 16, width: 200 }}
        onChange={(val: string) => setValue(val as FileItemOwnProps['size'])}
      />
      <FileItem
        className={classesList.fileItem}
        status="success"
        size={value}
        onCancel={(e) => console.log(e)}
      >
        FileName.png
      </FileItem>
      <FileItem
        className={classesList.fileItem}
        status="error"
        size={value}
        errorText="Some Error"
        onCancel={(e) => console.log(e)}
      >
        FileName.png
      </FileItem>
      <FileItem
        className={classesList.fileItem}
        info="4 / 6 MB"
        status="progress"
        size={value}
        onCancel={(e) => console.log(e)}
      >
        FileName.png
      </FileItem>
      <FileItem
        className={classesList.fileItem}
        info="4 / 6 MB"
        status="progress"
        size={value}
        progressType="linear"
        onCancel={(e) => console.log(e)}
      >
        FileName.png
      </FileItem>
      <FileItem
        className={classesList.fileItem}
        info={<>{progress} %</>}
        status="progress"
        size={value}
        progress={progress}
        onCancel={(e) => console.log(e)}
      >
        FileName.png
      </FileItem>
      <FileItem
        className={classesList.fileItem}
        info={<>{progress} %</>}
        status="progress"
        size={value}
        progress={progress}
        progressType="linear"
        onCancel={(e) => console.log(e)}
      >
        FileName.png
      </FileItem>
    </div>
  )
}
