import * as React from 'react'
import { createUseStyles, Text } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  coloredText: {
    color: theme.sys.color.primaryAlpha,
  },
}))

export const JssExample = (): React.ReactElement => {
  const classes = useStyles()

  return (
    <Text className={classes.coloredText}>Пример стилизованного текста</Text>
  )
}
