import * as React from 'react'
import { ButtonUploader } from '@v-uik/base'

export const BasicButtonUploader = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ButtonUploader
        color="secondary"
        onUpload={(files, e) => console.log(files, e)}
      >
        Upload File
      </ButtonUploader>
    </div>
  )
}
