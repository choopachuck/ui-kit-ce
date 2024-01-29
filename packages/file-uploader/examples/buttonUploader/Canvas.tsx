import * as React from 'react'
import { ButtonUploader } from '@v-uik/base'

export default (): JSX.Element => {
  return (
    <ButtonUploader
      color="primary"
      onUpload={(files, e) => console.log(files, e)}
    >
      Upload File
    </ButtonUploader>
  )
}
