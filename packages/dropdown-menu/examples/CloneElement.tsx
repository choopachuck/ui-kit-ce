import * as React from 'react'
import { DropdownMenu, DropdownMenuItem, createUseStyles } from '@v-uik/base'

const content = (
  <>
    <DropdownMenuItem>Option 1</DropdownMenuItem>
    <DropdownMenuItem>Option 2</DropdownMenuItem>
    <DropdownMenuItem disabled>Option 3</DropdownMenuItem>
    <DropdownMenuItem
      dropdownProps={{
        content: (
          <>
            <DropdownMenuItem>Option 1</DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
            <DropdownMenuItem>Option 3</DropdownMenuItem>
          </>
        ),
      }}
    >
      Option 4
    </DropdownMenuItem>
  </>
)

const useStyles = createUseStyles((theme) => ({
  div: {
    display: 'inline-flex',
    border: `1px solid ${theme.sys.color.neutralAlpha}`,
    padding: 16,
    cursor: 'default',
  },
}))

type CustomChildProps = React.ComponentPropsWithRef<'div'> & {
  text: string
}

const CustomChild = React.forwardRef<HTMLDivElement, CustomChildProps>(
  ({ text, ...dropdownMenuProps }, ref) => {
    const classes = useStyles()

    return (
      <div ref={ref} className={classes.div} {...dropdownMenuProps}>
        {text}
      </div>
    )
  }
)

export const CloneElement = () => {
  return (
    <DropdownMenu content={content} placement="bottom-end">
      <CustomChild text="Hover Me" />
    </DropdownMenu>
  )
}
