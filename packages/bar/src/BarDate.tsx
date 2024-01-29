'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Direction } from '@v-uik/common'
import { BarContext } from './BarContext'
import { BarItem, BarItemProps } from './BarItem'
import { BarDateClasses as Classes } from './interfaces/classes'

const useStyles = createUseStyles((theme) => ({
  barDateHorizontal: {
    padding: [14, 16],
  },

  barDateVertical: {
    padding: [8, 12],
  },

  barDateVerticalExpanded: {
    padding: [12, 16, 12, 20],
  },

  dark: {
    '& $date': {
      color: theme.comp.barDate.dateColorTextDark,
    },

    '& $time': {
      color: theme.comp.barDate.timeColorTextDark,
    },
  },

  light: {
    '& $date': {
      color: theme.comp.barDate.dateColorTextLight,
    },

    '& $time': {
      color: theme.comp.barDate.timeColorTextLight,
    },
  },

  primary: {
    '& $date': {
      color: theme.comp.barDate.dateColorTextPrimary,
    },

    '& $time': {
      color: theme.comp.barDate.timeColorTextPrimary,
    },
  },

  text: {
    fontFamily: theme.comp.barDate.typographyFontFamily,
    fontWeight: theme.comp.barDate.typographyFontWeight,
    fontSize: theme.comp.barDate.typographyFontSize,
    lineHeight: theme.comp.barDate.typographyLineHeight,
    letterSpacing: theme.comp.barDate.typographyLetterSpacing,
  },

  date: {},

  time: {},
}))

export interface BarDateProps extends BarItemProps {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
}

const BarDateContent = ({
  isCollapsed,
  dateClassName,
  timeClassName,
}: {
  isCollapsed: boolean
  dateClassName: string
  timeClassName: string
}) => {
  const { date, time, year } = useCurrentTimeString()

  return (
    <>
      <span className={dateClassName}>
        {date}
        {isCollapsed ? '' : `.${year}`}
      </span>

      {isCollapsed ? <br /> : ' '}

      <span className={timeClassName}>{time}</span>
    </>
  )
}

export const BarDate = React.forwardRef(
  (
    { classes: classesProp, ...rest }: BarDateProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const barContext = React.useContext(BarContext)

    const classesList = useStyles()
    const {
      date: dateClassName,
      time: timeClassName,
      ...classesMap
    } = useClassList(classesList, classesProp)
    const barItemClasses = {
      ...classesMap,
      root: clsx(
        classesMap.root,
        barContext.direction === Direction.horizontal
          ? classesMap.barDateHorizontal
          : undefined
      ),
      vertical: clsx(
        classesMap.vertical,
        barContext.expanded
          ? classesMap.barDateVerticalExpanded
          : classesMap.barDateVertical
      ),
    }

    const isCollapsed =
      barContext.direction === Direction.vertical && !barContext.expanded

    return (
      <BarItem {...rest} ref={ref} classes={barItemClasses}>
        <BarDateContent
          isCollapsed={isCollapsed}
          dateClassName={dateClassName}
          timeClassName={timeClassName}
        />
      </BarItem>
    )
  }
)

function useCurrentTimeString() {
  const [currentTime, setCurrentTime] = React.useState<Date>(new Date())

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return {
    date:
      `0${currentTime.getDate()}`.slice(-2) +
      '.' +
      `0${currentTime.getMonth() + 1}`.slice(-2),
    time:
      `0${currentTime.getHours()}`.slice(-2) +
      ':' +
      `0${currentTime.getMinutes()}`.slice(-2),
    year: currentTime.getFullYear(),
  }
}
