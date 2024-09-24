import * as React from 'react'
import { createUseStyles } from '@v-uik/base'
import { Source, SourceProps } from './components'

export type CodeProps = SourceProps & {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const useStyles = createUseStyles({
  clearButton: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    border: '0 none',
    padding: [4, 10],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
    background: '#333333',
    fontSize: '12px',
    lineHeight: '16px',
    fontFamily:
      '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 700,
    borderTop: '1px solid rgba(255,255,255,.1)',
    borderLeft: '1px solid rgba(255,255,255,.1)',
    marginRight: -20,
    borderRadius: '4px 0 0 0;',

    '&:focus': {
      boxShadow: '#1EA7FD 0 -3px 0 0 inset',
      outline: '0 none',
    },
  },
  root: {
    position: 'relative',
    marginTop: 48,
  },
})

export const Code: React.FC<CodeProps> = ({
  data: dataProp,
  code: codeProp,
  height = 390,
  ...rest
}) => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const [data, setData] = React.useState<any>([])
  const [code, setCode] = React.useState('')

  const classes = useStyles()

  const handleClear = () => {
    setData([])
    setCode('')
  }

  React.useEffect(() => {
    setData(dataProp)
  }, [dataProp])

  React.useEffect(() => {
    setCode(codeProp ?? '')
  }, [codeProp])

  return (
    <div className={classes.root}>
      <Source
        height={height}
        code={code ? code : JSON.stringify(data, null, 1)}
        {...rest}
      />
      {(Array.isArray(data) ? data.length : !!code) ? (
        <button
          data-click-stream-off
          className={classes.clearButton}
          onClick={handleClear}
        >
          Clear Log
        </button>
      ) : undefined}
    </div>
  )
}
