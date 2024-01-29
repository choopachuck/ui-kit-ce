import * as React from 'react'
import { Container, ContainerProps, Select } from '@v-uik/base'

export const MaxWidthContainer = (): JSX.Element => {
  const [value, setValue] =
    React.useState<Required<ContainerProps['maxWidth']>>('md')

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 24, width: 180 }}>
          <Select
            limitByWidth
            options={[
              { value: 'sm', label: 'sm' },
              { value: 'md', label: 'md' },
              { value: 'lg', label: 'lg' },
              { value: 'xl', label: 'xl' },
              { value: 'xxl', label: 'xxl' },
            ]}
            value={value}
            label="Width"
            onChange={(v: string) =>
              setValue(v as Required<ContainerProps['maxWidth']>)
            }
          />
        </div>
      </div>
      <Container maxWidth={value}>
        <div style={{ background: 'rgb(207, 232, 252)', height: '30vh' }} />
      </Container>
    </div>
  )
}
