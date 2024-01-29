'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Direction, DirectionType } from '@v-uik/common'
import { StepperContext, StepperContextValue } from './StepperContext'
import { StepperClasses } from './interfaces'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'stretch',
  },

  vertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
})

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<StepperClasses>
  /**
   * Индекс текущего шага (нумерация с 0)
   */
  activeStep?: number
  /**
   * Расположение элементов
   */
  direction?: DirectionType
  /**
   * Шаги доступны для переключения
   */
  clickable?: boolean
  /**
   * Обработчик переключения (для clickable = true)
   */
  onChange?: (index: number) => void
}

export const Stepper = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      activeStep = 0,
      direction = Direction.horizontal,
      clickable,
      onChange,
      children,
      ...rest
    }: StepperProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.vertical]: direction === Direction.vertical,
    })

    const stepperContextValue: StepperContextValue = React.useMemo(
      () => ({
        activeStep,
        direction,
        clickable,
        onChange,
      }),
      [activeStep, direction, clickable, onChange]
    )

    return (
      <div {...rest} ref={ref} className={className}>
        <StepperContext.Provider value={stepperContextValue}>
          {children}
        </StepperContext.Provider>
      </div>
    )
  }
)
