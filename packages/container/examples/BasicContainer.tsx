import * as React from 'react'
import { Container } from '@v-uik/base'

export const BasicContainer = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Container>
        <div style={{ background: 'rgb(207, 232, 252)', height: '30vh' }} />
      </Container>
    </div>
  )
}
