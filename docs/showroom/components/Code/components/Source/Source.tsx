import * as React from 'react'
import { Source as StorybookSource } from '@storybook/addon-docs'
import { clsx, createUseStyles } from '@v-uik/base'
import { KindType } from '../../../types'

export type SourceProps = {
  code?: string
  height?: React.CSSProperties['height']
  gutters?: boolean
  noElevation?: boolean
  kind?: KindType
  noRound?: boolean
}

// Используем динамический стиль, чтобы добраться до
// нижнего класса .docblock-source и присвоить ему значение `height`
// из пропсов
const useStyles = createUseStyles<string, Pick<SourceProps, 'height'>>({
  root: {
    '& .docblock-source': {
      boxShadow: 'none',
      height: ({ height }) => height,
      margin: 0,
      '& div:nth-child(2)': {
        display: 'none',
      },
    },
  },

  gutters: {
    marginLeft: -20,
    marginRight: -20,
    marginBottom: -30,
  },

  ghost: {
    '& .docblock-source': {
      background: '#F5F5F5',
    },
  },
  elevation: {
    boxShadow: 'rgba(0, 0, 0, 0.10) 0 1px 3px 0',
  },
  noRound: {
    '& .docblock-source': {
      borderRadius: 0,
    },
  },
})

export const Source: React.FC<SourceProps> = ({
  code,
  height = 'auto',
  kind = 'light',
  gutters,
  noElevation,
  noRound,
}) => {
  const classes = useStyles({ height })

  const rootClassName = clsx(classes.root, {
    [classes.gutters]: gutters,
    [classes.elevation]: !noElevation,
    [classes.noRound]: noRound,
    [classes.ghost]: kind === 'ghost',
  })

  return (
    <div className={rootClassName}>
      <StorybookSource dark={kind === 'dark'} language="tsx" code={code} />
    </div>
  )
}
