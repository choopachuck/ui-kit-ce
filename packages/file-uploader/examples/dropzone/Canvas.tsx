import * as React from 'react'
import { Button, Dropzone, ButtonKinds } from '@v-uik/base'

export default () => {
  return (
    <Dropzone onUpload={console.log}>
      <Button kind={ButtonKinds.ghost} style={{ background: 'transparent' }}>
        Загрузить файл
      </Button>
    </Dropzone>
  )
}
