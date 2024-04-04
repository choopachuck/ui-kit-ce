/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import {
  InlineNotification,
  Button,
  InlineNotificationStatusType,
  InlineNotificationKindType,
  createUseStyles,
} from '@v-uik/base'

const useStyles = createUseStyles({
  noRadius: {
    borderRadius: 0,
  },
})

export type PlaygroundProps = {
  status: InlineNotificationStatusType
  showCloseButton: boolean
  showIndicator: boolean
  showIcon: boolean
  showBody: boolean
  showTitle: boolean
  kind: InlineNotificationKindType
  showActions: boolean
  borders: 'Скругленные' | 'Прямые'
}

const actions = (
  <div style={{ display: 'flex', gap: 16 }}>
    <Button kind="outlined" color="secondary">
      Button
    </Button>
    <Button kind="ghost" color="secondary">
      Button
    </Button>
  </div>
)

export const Playground = ({
  status,
  showCloseButton,
  showIndicator,
  showIcon,
  showBody,
  showTitle,
  kind,
  showActions,
  borders,
}: PlaygroundProps): React.ReactElement => {
  const styles = useStyles()

  return (
    <div style={{ width: 420 }}>
      <InlineNotification
        title={showTitle ? 'Очень важное сообщение' : undefined}
        status={status}
        showIndicator={showIndicator}
        icon={showIcon}
        kind={kind}
        actions={showActions ? actions : undefined}
        className={borders === 'Прямые' ? styles.noRadius : undefined}
        direction="vertical"
        onClose={showCloseButton ? () => {} : undefined}
      >
        {showBody
          ? 'Сюда входят две или более строк основного текста для описания.'
          : undefined}
      </InlineNotification>
    </div>
  )
}
