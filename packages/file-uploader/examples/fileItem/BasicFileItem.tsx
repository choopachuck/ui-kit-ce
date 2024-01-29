import * as React from 'react'
import { FileItem, Link } from '@v-uik/base'

export const BasicFileItem: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FileItem style={{ width: 400 }} onCancel={(e) => console.log(e)}>
        <Link>FileName.png</Link>
      </FileItem>
    </div>
  )
}
