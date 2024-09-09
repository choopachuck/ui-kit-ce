import * as React from 'react'
import {
  PreviewProps as StorybookPreviewProps,
  Source as StorybookSource,
} from '@storybook/components'
import { clsx, createUseStyles } from '@v-uik/theme'
import { Canvas as StorybookCanvas, SourceState } from '@storybook/addon-docs'
import { Code } from '../Code'
import { ContextButtons } from '../_components'

export type PreviewSourceProps = React.ComponentProps<typeof StorybookSource>

export type PreviewProps = StorybookPreviewProps & {
  mdxSource?: string
  code?: string
  sourceProps?: PreviewSourceProps
}

const useStyles = createUseStyles({
  buttonContainerGutters: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 9,
    marginRight: 9,
    width: '100%',
  },
  canvasContainerOpen: {
    '& .sbdocs-preview': {
      marginBottom: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  codeContainer: {
    '& .docblock-source': {
      borderTop: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
})

export const Preview: React.FC<React.PropsWithChildren<PreviewProps>> = ({
  children,
  code,
  sourceProps,
  ...rest
}) => {
  const [showCode, setShowCode] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const classes = useStyles()

  const handleCancasShowCode = (isCodeShow: boolean) => {
    setShowCode(!isCodeShow)
  }

  const handleCodeShowCode = (isCodeShow: boolean) => {
    // При закрытии кода в блоке с кодом скроллим до канваса, чтобы не
    // экран не прыгал и не дизориентировал пользователей.
    ref.current?.scrollIntoView()
    setShowCode(!isCodeShow)
  }

  const canvasContainerClassName = clsx({
    [classes.canvasContainerOpen]: showCode,
  })

  return (
    <div ref={ref}>
      <div className={canvasContainerClassName}>
        {/*@ts-ignore */}
        <StorybookCanvas {...rest} withSource={SourceState.NONE}>
          {children}
          <div className={classes.buttonContainerGutters}>
            <ContextButtons
              withShowCode
              isShowCode={showCode}
              onShowCode={handleCancasShowCode}
            />
          </div>
        </StorybookCanvas>
      </div>
      <div className={classes.codeContainer}>
        <Code
          {...sourceProps}
          withCopy
          withShowCode
          height="100%"
          kind="ghost"
          code={code}
          isShowCode={showCode}
          onShowCode={handleCodeShowCode}
        />
      </div>
    </div>
  )
}
