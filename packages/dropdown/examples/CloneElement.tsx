import * as React from 'react'
import { Dropdown, Button, createUseStyles } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  div: {
    display: 'inline-flex',
    border: `1px solid ${theme.sys.color.neutralAlpha}`,
    padding: 16,
  },
}))

type CustomChildProps = {
  text: string
}

const CustomChild = React.forwardRef<HTMLDivElement, CustomChildProps>(
  ({ text, ...dropdownProps }, ref) => {
    const classes = useStyles()

    return (
      <div ref={ref} className={classes.div} {...dropdownProps}>
        <Button>{text}</Button>
      </div>
    )
  }
)

export const CloneElement = () => {
  const anchor = React.useRef(null)

  return (
    <Dropdown
      anchor={anchor.current}
      content={
        <div
          id="dropdown-id"
          style={{ padding: 10, backgroundColor: '#ccc', borderRadius: 4 }}
        >
          Dropdown content
        </div>
      }
    >
      <CustomChild ref={anchor} text="Click me" />
    </Dropdown>
  )
}
