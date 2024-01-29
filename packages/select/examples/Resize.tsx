import * as React from 'react'
import { createUseStyles } from '@v-uik/base'

const useStyles = createUseStyles({
  root: {
    background: 'none',
    position: 'absolute',
    boxSizing: 'border-box',
    display: 'inline-block',
    padding: [10, 20],
  },

  resize: {
    top: 0,
    right: 0,
    width: 10,
    height: '100%',
    cursor: 'ew-resize',
    position: 'absolute',
    background: 'lightcoral',
  },

  move: {
    top: 0,
    left: 0,
    width: 10,
    height: '100%',
    cursor: 'move',
    position: 'absolute',
    background: 'orange',
  },
})

interface Props {
  width?: number
}

export const Resize: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const classes = useStyles()

  const ref = React.useRef<HTMLDivElement>(null)
  const [x, setX] = React.useState<number>(16)
  const [y, setY] = React.useState<number>(16)
  const [width, setWidth] = React.useState(props.width)
  const [initW, setInitW] = React.useState<number>(0)
  const [initX, setInitX] = React.useState<number>(0)
  const [isMove, setIsMove] = React.useState(false)
  const [isResize, setIsResize] = React.useState(false)

  /* -------------------------------------------------------------------- */
  /* -----------------------------Resize--------------------------------- */
  /* -------------------------------------------------------------------- */
  const handleResizeEnd = React.useCallback(() => {
    setIsResize(false)
  }, [])
  const handleResize = React.useCallback(
    (e: MouseEvent) => {
      setWidth(e.pageX - initX + initW)
    },
    [initX, initW]
  )

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsResize(true)
    setInitW(ref.current?.getBoundingClientRect().width ?? 0)
    setInitX(e.pageX)
  }

  React.useEffect(() => {
    if (isResize) {
      document.addEventListener('mouseup', handleResizeEnd)
      document.addEventListener('mousemove', handleResize)
    } else {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', handleResizeEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [isResize, handleResize, handleResizeEnd])

  /* -------------------------------------------------------------------- */
  /* -------------------------------Move--------------------------------- */
  /* -------------------------------------------------------------------- */
  const handleMoveEnd = React.useCallback(() => {
    setIsMove(false)
  }, [])
  const handleMove = React.useCallback((e: MouseEvent) => {
    setX(Math.max(0, e.pageX))
    setY(Math.max(0, e.pageY))
  }, [])

  const handleMoveStart = () => setIsMove(true)

  React.useEffect(() => {
    if (isMove) {
      document.addEventListener('mouseup', handleMoveEnd)
      document.addEventListener('mousemove', handleMove)
    } else {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleMoveEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleMoveEnd)
    }
  }, [isMove, handleMove, handleMoveEnd])

  return (
    <div ref={ref} style={{ width, top: y, left: x }} className={classes.root}>
      <div className={classes.move} onMouseDown={handleMoveStart} />
      {props.children}
      <div className={classes.resize} onMouseDown={handleResizeStart} />
    </div>
  )
}

Resize.displayName = 'Resize'
