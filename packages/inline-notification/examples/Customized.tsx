/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { InlineNotification, Text, createUseStyles, Link } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  icon: {
    padding: 2,
    backgroundColor: theme.sys.color.backgroundAlpha,
    color: theme.sys.color.onBackgroundHigh,
    borderRadius: 4,
    width: 16,
    height: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
  },
  medium: {
    color: theme.sys.color.onBackgroundMedium,
  },
  topContainer: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
    marginBottom: 8,
    color: theme.sys.color.onBackgroundLow,
  },
  mlAuto: {
    marginLeft: 'auto',
  },
}))

export const Customized = () => {
  const styles = useStyles()

  return (
    <InlineNotification
      status="info"
      direction="vertical"
      icon={false}
      closeButtonProps={{
        children: '🗑️',
      }}
    >
      <div className={styles.topContainer}>
        <span className={styles.icon}>💬</span>
        <Text kind="bodySm">Уведомление календаря</Text>
        <Text kind="bodySm" className={styles.mlAuto}>
          Через 10 мин
        </Text>
      </div>
      <Link>
        <Text kind="titleSm">Очень важная встреча</Text>
      </Link>

      <Text className={styles.medium}>Скругление 1px или 2px</Text>
    </InlineNotification>
  )
}
