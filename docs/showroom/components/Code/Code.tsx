import * as React from 'react'
import { createUseStyles, useValue } from '@v-uik/base'
import { Source, SourceProps } from './components'
import { ContextButtons, ContextButtonsProps } from '../_components'

export type CodeProps = SourceProps &
  Omit<ContextButtonsProps, 'gutters'> & {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
  }

const useStyles = createUseStyles({
  root: {
    position: 'relative',
  },
  buttonContainer: {
    zIndex: 1,
    position: 'absolute',
    bottom: 1,
    right: 1,
    display: 'flex',
    flexDirection: 'row',
    '& button:last-child:not(:first-child)': {
      borderTopLeftRadius: 0,
    },
  },
  buttonContainerGutters: {
    marginRight: -20,
  },
})

const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

export const Code: React.FC<CodeProps> = ({
  data: dataProp,
  code: codeProp,
  height = 390,
  gutters,
  withClear: withClearProp,
  withShowCode,
  withCopy,
  isShowCode: isShowCodeProp,
  onShowCode,
  ...rest
}) => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const [data, setData] = React.useState<any>([])
  const [code, setCode] = React.useState('')
  const [isCopied, setIsCopied] = React.useState(false)
  const [isShowCode, setIsShowCode] = useValue(isShowCodeProp)

  const classes = useStyles()

  const handleClear = () => {
    setData([])
    setCode('')
  }

  const toggleShow = (value: boolean) => {
    onShowCode?.(value)
    if (isShowCodeProp === undefined) {
      setIsShowCode((s) => !s)
    }
  }

  const handleCopy = async () => {
    await copyToClipboard(data || code)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const showCode = (withShowCode && isShowCode) || !withShowCode
  const withClear =
    withClearProp && (!!code || ((data || []) as [])?.length > 0)

  React.useEffect(() => {
    setData(dataProp)
  }, [dataProp])

  React.useEffect(() => {
    setCode(codeProp ?? '')
  }, [codeProp])

  if (!showCode) {
    return null
  }

  return (
    <div className={classes.root}>
      <Source
        height={height}
        code={code ? code : JSON.stringify(data, null, 1)}
        gutters={gutters}
        {...rest}
      />
      <ContextButtons
        kind={rest.kind}
        withCopy={withCopy}
        withShowCode={withShowCode}
        withClear={withClear}
        gutters={gutters}
        isCopied={isCopied}
        isShowCode={isShowCode}
        onShowCode={toggleShow}
        onClear={handleClear}
        onCopy={handleCopy}
      />
    </div>
  )
}
