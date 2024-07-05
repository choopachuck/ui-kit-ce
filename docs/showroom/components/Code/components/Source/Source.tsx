import * as React from 'react'
import { Source as StorybookSource } from '@storybook/addon-docs'
import { createUseStyles } from '@v-uik/base'

export type SourceProps = {
  code?: string
  height?: React.CSSProperties['height']
  light?: boolean
}

// Используем динамический стиль, чтобы добраться до
// нижнего класса .docblock-source и присвоить ему значение `height`
// из пропсов
const useStyles = createUseStyles<string, Pick<SourceProps, 'height'>>({
  root: {
    '& .docblock-source': {
      borderRadius: 0,
      boxShadow: 'none',
      height: ({ height }) => height,
      margin: 0,
      marginLeft: -20,
      marginRight: -20,
      marginBottom: -30,
      '& div:nth-child(2)': {
        display: 'none',
      },
    },
  },
})

export const Source: React.FC<SourceProps> = ({
  code,
  height = 'auto',
  light,
}) => {
  const classes = useStyles({ height })

  return (
    <div className={classes.root}>
      <StorybookSource dark={!light} language="tsx" code={code} />
    </div>
  )
}
