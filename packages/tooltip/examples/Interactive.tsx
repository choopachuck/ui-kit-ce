import * as React from 'react'
import {
  Tooltip,
  TooltipContext,
  dark,
  ThemeProvider,
  Button,
} from '@v-uik/base'

const Buttons = (): React.ReactElement => {
  const tooltipContext = React.useContext(TooltipContext)

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
      <ThemeProvider theme={dark}>
        <Button
          kind="contained"
          color="secondary"
          onClick={tooltipContext.close}
        >
          Yes
        </Button>
        <Button
          kind="ghost"
          color="secondary"
          style={{ marginLeft: 10 }}
          onClick={tooltipContext.close}
        >
          No
        </Button>
      </ThemeProvider>
    </div>
  )
}

export const Interactive = (): React.ReactElement => {
  const content = (
    <div>
      What is a <b>dog</b>? <br />A dog is a type of domesticated animal.
      <Buttons />
    </div>
  )

  return (
    <Tooltip
      interactive
      dropdownProps={{
        placement: 'right',
        content,
      }}
    >
      <span role="button" tabIndex={0} style={{ backgroundColor: 'lightgrey' }}>
        click me
      </span>
    </Tooltip>
  )
}
