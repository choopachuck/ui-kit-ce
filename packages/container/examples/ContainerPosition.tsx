import * as React from 'react'
import { Container, ContainerProps, Select } from '@v-uik/base'

export const ContainerPosition = (): JSX.Element => {
  const [value, setValue] =
    React.useState<Required<ContainerProps['justify']>>('center')

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 24, width: 180 }}>
          <Select
            limitByWidth
            options={[
              { value: 'center', label: 'center' },
              { value: 'start', label: 'start' },
              { value: 'end', label: 'end' },
            ]}
            value={value}
            label="Position"
            onChange={(v: string) =>
              setValue(v as Required<ContainerProps['justify']>)
            }
          />
        </div>
      </div>
      <Container maxWidth="sm" justify={value}>
        <div style={{ background: 'rgb(207, 232, 252)', height: '30vh' }} />
      </Container>
    </div>
  )
}
