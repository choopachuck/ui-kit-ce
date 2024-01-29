import * as React from 'react'
import { FileItem, FileItemOwnProps } from '@v-uik/base'

export const FileItemInfoExample: React.FC<
  Omit<FileItemOwnProps, 'onCancel' | 'children'>
> = (props) => {
  return (
    <div style={{ padding: 4 }}>
      <FileItem info="4MB / 6MB" onCancel={() => null} {...props}>
        FileName.png
      </FileItem>
    </div>
  )
}
