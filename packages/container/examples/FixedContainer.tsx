import * as React from 'react'
import { Container } from '@v-uik/base'

export const FixedContainer = (): JSX.Element => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <div style={{ marginBottom: 24, width: '100%' }}>
        <Container fixed>
          <div
            style={{
              background: 'rgb(207, 232, 252)',
              height: '30vh',
              textAlign: 'center',
            }}
          >
            fixed
          </div>
        </Container>
      </div>
      <Container>
        <div
          style={{
            background: 'rgb(207, 232, 252)',
            height: '30vh',
            textAlign: 'center',
          }}
        >
          non-fixed
        </div>
      </Container>
    </div>
  )
}
