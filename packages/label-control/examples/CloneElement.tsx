import * as React from 'react'
import { LabelControl, Switch, createUseStyles } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  div: {
    display: 'inline-flex',
    border: `1px solid ${theme.sys.color.neutralAlpha}`,
    height: 30,
    width: 55,
    justifyContent: 'center',
    borderTopLeftRadius: theme.sys.shape.borderRadiusCircle,
    borderTopRightRadius: theme.sys.shape.borderRadiusCircle,
    borderBottomLeftRadius: theme.sys.shape.borderRadiusCircle,
    borderBottomRightRadius: theme.sys.shape.borderRadiusCircle,
  },
}))

const SwitchWrapper = ({ ...switchProps }) => {
  const classes = useStyles()

  return (
    <div className={classes.div}>
      <Switch {...switchProps} />
    </div>
  )
}

export const CloneElement = () => {
  const [value, setValue] = React.useState(false)

  return (
    <LabelControl
      checked={value}
      control={<SwitchWrapper />}
      label={`${value ? 'Disable' : 'Enable'} element`}
      onChange={() => setValue(!value)}
    />
  )
}
