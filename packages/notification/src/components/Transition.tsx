'use client'

import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { TNotificationPosition } from '../types'

const animationSuffixByPosition: { [key in TNotificationPosition]: string } = {
  'top-left': 'Left',
  'bottom-left': 'Left',
  'top-right': 'Right',
  'bottom-right': 'Right',
  'top-center': 'Top',
  'bottom-center': 'Bottom',
}

// allowed dynamic classes usage
const useStyles = createUseStyles({
  animation: {
    animationFillMode: 'both',
    animationDuration: '0.35s',
  },

  '@keyframes slideFromRight': {
    from: {
      transform: 'translate3d(110%, 0, 0)',
      visibility: 'visible',
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
    },
  },

  '@keyframes slideFromLeft': {
    from: {
      transform: 'translate3d(-110%, 0, 0)',
      visibility: 'visible',
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
    },
  },

  '@keyframes slideFromTop': {
    from: {
      transform: 'translate3d(0, -110%, 0)',
      visibility: 'visible',
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
    },
  },

  '@keyframes slideFromBottom': {
    from: {
      transform: 'translate3d(0, 110%, 0)',
      visibility: 'visible',
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
    },
  },

  '@keyframes slideToRight': {
    from: {
      transform: 'translate3d(0, 0, 0)',
    },
    to: {
      transform: 'translate3d(110%, 0, 0)',
      visibility: 'hidden',
    },
  },

  '@keyframes slideToLeft': {
    from: {
      transform: 'translate3d(0, 0, 0)',
    },
    to: {
      transform: 'translate3d(-110%, 0, 0)',
      visibility: 'hidden',
    },
  },

  '@keyframes slideToTop': {
    from: {
      transform: 'translate3d(0, 0, 0)',
    },
    to: {
      transform: 'translate3d(0, -500px, 0)',
      visibility: 'hidden',
    },
  },

  '@keyframes slideToBottom': {
    from: {
      transform: 'translate3d(0, 0, 0)',
    },
    to: {
      transform: 'translate3d(0, 500px, 0)',
      visibility: 'hidden',
    },
  },

  animationSlideEnter: {
    animationName: ({ position = 'top-right' }: TransitionProps) =>
      `$slideFrom${animationSuffixByPosition[position]}`,
  },

  animationSlideExit: {
    animationName: ({ position = 'top-right' }: TransitionProps) =>
      `$slideTo${animationSuffixByPosition[position]}`,
  },
})

export interface TransitionProps {
  isActive: boolean
  position?: TNotificationPosition
  notificationRef: React.MutableRefObject<HTMLDivElement | null>
  onEnd: () => void
}

export const Transition: React.FC<TransitionProps> = (props) => {
  const { isActive, notificationRef, onEnd, children } = props

  const baseClassName = React.useRef('')

  const classesList = useStyles(props)

  const onEntered = (event: AnimationEvent) => {
    if (notificationRef.current) {
      const node = notificationRef.current

      if (event.target === notificationRef.current) {
        node.removeEventListener('animationend', onEntered)
        node.className = baseClassName.current
      }
    }
  }

  const onEnter = () => {
    if (notificationRef.current) {
      const node = notificationRef.current
      baseClassName.current = node.className
      node.className += ` ${classesList.animation} ${classesList.animationSlideEnter}`
      node.addEventListener('animationend', onEntered)
    }
  }

  const collapseNotification = () => {
    if (notificationRef.current) {
      const node = notificationRef.current
      const duration = 300

      requestAnimationFrame(() => {
        node.style.minHeight = 'initial'
        node.style.height = `${node.scrollHeight}px`
        node.style.transition = `all ${duration}ms`

        requestAnimationFrame(() => {
          node.style.height = '0'
          node.style.padding = '0'
          node.style.margin = '0'
          setTimeout(onEnd, duration)
        })
      })
    }
  }

  const onExited = () => {
    notificationRef.current?.removeEventListener('animationend', onExited)
    collapseNotification()
  }

  const onExit = () => {
    if (notificationRef.current) {
      const node = notificationRef.current
      node.className += ` ${classesList.animation} ${classesList.animationSlideExit}`
      node.addEventListener('animationend', onExited)
    }
  }

  React.useLayoutEffect(() => {
    onEnter()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!isActive) {
      onExit()
    }
  }, [isActive]) // eslint-disable-line react-hooks/exhaustive-deps

  return children as React.ReactElement
}
