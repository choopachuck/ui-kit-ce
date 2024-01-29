import React from 'react'
import { DocsContext } from '@storybook/addon-docs'
import { Args } from '@storybook/csf'
import { Settings } from './containers'
import { ControlsProps } from './types'

export const Controls = <TComponentProps extends Args = Args>({
  children,
  ...rest
}: ControlsProps<TComponentProps>): React.ReactElement => (
  <DocsContext.Consumer>
    {(context) => (
      <Settings<TComponentProps> {...rest} context={context}>
        {(controlValues) => children?.(controlValues)}
      </Settings>
    )}
  </DocsContext.Consumer>
)
