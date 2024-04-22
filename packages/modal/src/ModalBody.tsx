'use client'

import * as React from 'react'
import { createUseStyles, clsx, setAlphaChannel } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { BodyClasses } from './classes'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const scrollColor = '#c4c4c4'

const useStyles = createUseStyles((theme) => ({
  body: {
    flex: '1 1 auto',
    marginTop: 22,
    minHeight: 0,
    display: 'flex',
    position: 'relative',
    margin: [-2, -2],
  },

  topShadow: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 8,
      height: 32,
      background: `linear-gradient(${
        theme.comp.modal.colorBackground
      }, ${setAlphaChannel(theme.comp.modal.colorBackground, 0)})`,
    },
  },

  bottomShadow: {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 8,
      height: 32,
      background: `linear-gradient(${setAlphaChannel(
        theme.comp.modal.colorBackground,
        0
      )}, ${theme.comp.modal.colorBackground})`,
    },
  },

  scrollContainer: {
    padding: [2, 2],
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: `${scrollColor} ${theme.comp.modal.colorBackground}`,

    '&::-webkit-scrollbar': {
      width: 8,
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.comp.modal.colorBackground,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollColor,
      borderRadius: 8,
      border: `2px solid ${theme.comp.modal.colorBackground}`,
    },
  },
}))

export interface ModalBodyProps extends ComponentPropsWithRefFix<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<BodyClasses>
}

export const ModalBody = React.forwardRef(
  (
    { classes, className: classNameProp, children, ...rest }: ModalBodyProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const innerRef = React.useRef<HTMLDivElement>(null)

    const [showTopShadow, setShowTopShadow] = React.useState(false)
    const [showBottomShadow, setShowBottomShadow] = React.useState(false)

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.body, {
      [classesList.topShadow]: showTopShadow,
      [classesList.bottomShadow]: showBottomShadow,
    })

    React.useEffect(() => {
      if (
        innerRef.current &&
        innerRef.current.scrollHeight > innerRef.current.clientHeight
      ) {
        setShowBottomShadow(true)
      }
    }, [])

    const onScroll = () => {
      if (innerRef.current) {
        setShowTopShadow(innerRef.current.scrollTop > 0)
        setShowBottomShadow(
          Math.ceil(
            innerRef.current.scrollTop + innerRef.current.clientHeight
          ) < innerRef.current.scrollHeight
        )
      }
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <div
          ref={innerRef}
          className={classesMap.scrollContainer}
          onScroll={onScroll}
        >
          {children}
        </div>
      </div>
    )
  }
)
