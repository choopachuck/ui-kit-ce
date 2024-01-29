import * as React from 'react'
import { createUseStyles, clsx, Text } from '@v-uik/base'
import { AlertIcon } from './assets/AlretIcon'

type Props = {
  type?: 'info' | 'warning' | 'danger' | 'success'
}

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
    borderRadius: theme.ref.radius.xs,
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.body2,
    lineHeight: theme.typography.lineHeight.body2,
    letterSpacing: theme.typography.letterSpacing.body2,
  },

  icon: {
    width: 20,
    height: 20,
  },

  success: {
    border: `1px solid ${theme.ref.palette.green20}`,
    backgroundColor: theme.ref.palette.green95,
    color: theme.ref.palette.green20,
    '& svg': {
      fill: theme.ref.palette.green50,
    },
  },

  info: {
    border: `1px solid ${theme.ref.palette.electricBlue50}`,
    backgroundColor: theme.ref.palette.electricBlue95,
    color: theme.ref.palette.electricBlue20,
    '& svg': {
      fill: theme.ref.palette.electricBlue50,
    },
  },

  warning: {
    border: `1px solid ${theme.ref.palette.amber60}`,
    backgroundColor: theme.ref.palette.amber95,
    color: theme.ref.palette.amber20,
    '& svg': {
      fill: theme.ref.palette.amber60,
    },
  },

  danger: {
    border: `1px solid ${theme.ref.palette.red50}`,
    backgroundColor: theme.ref.palette.red95,
    color: theme.ref.palette.red20,
    '& svg': {
      fill: theme.ref.palette.red50,
    },
  },
}))

export const DocsAlert: React.FC<Props> = ({ type = 'info', children }) => {
  const classesList = useStyles()

  return (
    <aside className={clsx(classesList.root, classesList[type])}>
      <div className={classesList.icon}>
        <AlertIcon />
      </div>
      {children && <Text kind="body2">{children}</Text>}
    </aside>
  )
}
