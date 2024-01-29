import * as React from 'react'
import { Button, UploaderLabel } from '@v-uik/base'

export default (): JSX.Element => {
  return (
    <UploaderLabel label="label" description="description" errorText="error">
      <Button>Upload file</Button>
    </UploaderLabel>
  )
}
