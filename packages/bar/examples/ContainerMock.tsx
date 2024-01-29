import * as React from 'react'

export interface ContainerMockProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const ContainerMock = (props: ContainerMockProps): JSX.Element => {
  const { style, children, ...rest } = props

  return (
    <div
      {...rest}
      style={{
        position: 'relative',
        margin: '-30px -20px 40px',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
