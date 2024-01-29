import * as React from 'react'
import { FileItem, Link } from '@v-uik/base'

export default () => {
  return (
    <FileItem style={{ width: 400 }} onCancel={(e) => console.log(e)}>
      <Link>FileName.png</Link>
    </FileItem>
  )
}
