import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { KindType } from '../../types'

const useStyles = createUseStyles({
  light: {
    color: '#333333',
    background: ' #FFFFFF',
    borderTop: '1px solid rgba(0, 0, 0, .1)',
    borderLeft: '1px solid rgba(0, 0, 0, .1)',
    '&:focus': {
      boxShadow: '#1EA7FD 0 -3px 0 0 inset',
      outline: '0 none',
    },
  },
  dark: {
    color: '#FFFFFF',
    background: '#333333',
    borderTop: '1px solid rgba(255,255,255,.1)',
    borderLeft: '1px solid rgba(255,255,255,.1)',
    '&:focus': {
      boxShadow: '#1EA7FD 0 -3px 0 0 inset',
      outline: '0 none',
    },
  },
  ghost: {
    color: '#333333',
    background: ' #F5F5F5',
    borderTop: '1px solid rgba(0, 0, 0, .1)',
    borderLeft: '1px solid rgba(0, 0, 0, .1)',
    '&:focus': {
      boxShadow: '#1EA7FD 0 -3px 0 0 inset',
      outline: '0 none',
    },
  },
  root: {
    margin: 0,
    borderBottom: '0 none',
    borderRight: '0 none',
    padding: [4, 10],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    lineHeight: '16px',
    fontFamily:
      '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 700,
    borderRadius: '4px 0 0 0',
  },
})

export type ContextButton = JSX.IntrinsicElements['button'] & {
  kind?: KindType
}

export const ContextButton: React.FC<ContextButton> = ({
  className: classNameProp,
  kind = 'light',
  ...rest
}) => {
  const classes = useStyles()

  const className = clsx(classNameProp, classes.root, {
    [classes.light]: kind === 'light',
    [classes.dark]: kind === 'dark',
    [classes.ghost]: kind === 'ghost',
  })

  return <button className={clsx(className, classes.root)} {...rest} />
}
