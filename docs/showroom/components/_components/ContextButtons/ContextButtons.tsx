import { clsx, createUseStyles } from '@v-uik/theme'
import * as React from 'react'
import { ContextButton } from '../ContextButton'
import { KindType } from '../../types'

const BUTTON_TITLES = {
  COPY: 'Copy',
  COPIED: 'Copied',
  SHOW_CODE: 'Show code',
  HIDE_CODE: 'Hide code',
  CLEAR: 'Clear',
}

const useStyles = createUseStyles({
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

export type ContextButtonsProps = {
  gutters?: boolean
  kind?: KindType
  isCopied?: boolean
  onCopy?: () => void
  withCopy?: boolean
  onClear?: () => void
  withClear?: boolean
  isShowCode?: boolean
  onShowCode?: (value: boolean) => void
  withShowCode?: boolean
}

export const ContextButtons: React.FC<ContextButtonsProps> = ({
  gutters,
  isCopied,
  kind = 'light',
  onCopy,
  withCopy,
  withClear,
  onClear,
  withShowCode,
  onShowCode,
  isShowCode,
}) => {
  const classes = useStyles()

  const buttonContainerClassName = clsx(classes.buttonContainer, {
    [classes.buttonContainerGutters]: gutters,
  })

  if (!withClear && !withCopy && !withShowCode) {
    return null
  }

  return (
    <div className={buttonContainerClassName}>
      {withCopy && (
        <ContextButton data-click-stream-off kind={kind} onClick={onCopy}>
          {isCopied ? BUTTON_TITLES.COPIED : BUTTON_TITLES.COPY}
        </ContextButton>
      )}
      {withClear && (
        <ContextButton data-click-stream-off kind={kind} onClick={onClear}>
          {BUTTON_TITLES.CLEAR}
        </ContextButton>
      )}
      {withShowCode && (
        <ContextButton
          data-click-stream-off
          kind={kind}
          onClick={() => onShowCode?.(!!isShowCode)}
        >
          {isShowCode ? BUTTON_TITLES.HIDE_CODE : BUTTON_TITLES.SHOW_CODE}
        </ContextButton>
      )}
    </div>
  )
}
