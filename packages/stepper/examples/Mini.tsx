import * as React from 'react'
import { createUseStyles, Stepper, Step } from '@v-uik/base'
import { IconMini } from './assets/IconMini'
import { IconCompletedMini } from './assets/IconCompletedMini'
import { IconActiveMini } from './assets/IconActiveMini'
import { IconErrorMini } from './assets/IconErrorMini'

const useStyles = createUseStyles({
  stepMini: {
    padding: [0, 8, 0, 0],
    borderRadius: 12,
  },

  iconContainerMini: {
    marginRight: 4,
  },

  descriptionMini: {
    marginLeft: 28,
  },

  connectorMini: {},

  verticalMini: {
    padding: [0, 0, 8, 0],

    '& $connectorMini': {
      marginTop: 4,
    },

    '& $descriptionMini': {
      marginLeft: 4,
    },

    '&:last-child': {
      '& $descriptionMini': {
        marginLeft: 28,
      },
    },
  },
})

export const Mini = (): React.ReactElement => {
  const classes = useStyles()

  const stepperMiniClasses = {
    root: classes.stepMini,
    iconContainer: classes.iconContainerMini,
    description: classes.descriptionMini,
    vertical: classes.verticalMini,
    connector: classes.connectorMini,
  }

  return (
    <Stepper activeStep={2}>
      {['First', 'Second', 'Third', 'Fourth', 'Fifth'].map((step, index) => {
        const error = index === 3

        return (
          <Step
            key={step}
            index={index}
            classes={stepperMiniClasses}
            icon={error ? <IconErrorMini /> : <IconMini />}
            activeIcon={<IconActiveMini />}
            completedIcon={<IconCompletedMini />}
            showIconBadge={false}
            error={error}
          >
            {step}
          </Step>
        )
      })}
    </Stepper>
  )
}
