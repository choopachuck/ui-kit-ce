import * as React from 'react'
import { FileItem, FileItemOwnProps } from '@v-uik/base'

export const FileItemExample: React.FC<
  Omit<FileItemOwnProps, 'onCancel' | 'children'>
> = (props) => {
  return (
    <div style={{ padding: 4 }}>
      <FileItem onCancel={() => null} {...props}>
        FileName.png
      </FileItem>
    </div>
  )
}
