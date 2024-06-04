import * as React from 'react'
import { Card, Button } from '@v-uik/base'

export default (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: 288 }}>
      <Card
        kind="container"
        header="Heading"
        subtitle="Subtitle"
        footer={<Button>Button</Button>}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
      </Card>
    </div>
  )
}
