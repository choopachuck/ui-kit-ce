import * as React from 'react'
import { Tooltip, Button, createUseStyles } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  div: {
    display: 'inline-flex',
    border: `1px solid ${theme.sys.color.neutralAlpha}`,
    padding: 16,
  },
}))

type CustomChildProps = React.ComponentPropsWithRef<'div'> & {
  text: string
}

const CustomChild = React.forwardRef<HTMLDivElement, CustomChildProps>(
  ({ text, ...tooltipProps }, ref) => {
    const classes = useStyles()

    return (
      <div ref={ref} className={classes.div} {...tooltipProps}>
        <Button>{text}</Button>
      </div>
    )
  }
)

export const CloneElement = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 150 }}>
      <Tooltip dropdownProps={{ placement: 'top', content: 'Tooltip content' }}>
        <CustomChild text="Hover Me" />
      </Tooltip>
    </div>
  )
}
