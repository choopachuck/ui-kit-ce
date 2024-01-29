import * as React from 'react'
import { Popup, Select, DropdownProps } from '@v-uik/base'

type TPlacement = DropdownProps['placement']

const placements = [
  { value: 'top-start', label: 'top-start' },
  { value: 'top', label: 'top' },
  { value: 'top-end', label: 'top-end' },
  { value: 'right-start', label: 'right-start' },
  { value: 'right', label: 'right' },
  { value: 'right-end', label: 'right-end' },
  { value: 'bottom-start', label: 'bottom-start' },
  { value: 'bottom', label: 'bottom' },
  { value: 'bottom-end', label: 'bottom-end' },
  { value: 'left-start', label: 'left-start' },
  { value: 'left', label: 'left' },
  { value: 'left-end', label: 'left-end' },
]

export const Placement = ({
  defaultPlacement = 'top-start',
}: {
  defaultPlacement?: string
}): React.ReactElement => {
  const anchor = React.useRef(null)
  const [, updateState] = React.useState()
  const [placement, setPlacement] = React.useState<TPlacement>(
    defaultPlacement as TPlacement
  )

  React.useEffect(() => {
    setTimeout(() => {
      updateState({})
    }, 0)
  }, [])

  const handleChangePlacement = (value: string) => {
    setPlacement(value as TPlacement)
  }

  return (
    <div>
      <Select
        style={{ width: 200 }}
        options={placements}
        value={placement}
        onChange={handleChangePlacement}
      />
      <div
        ref={anchor}
        style={{
          margin: '50px 0 50px 150px',
          backgroundColor: 'aqua',
          display: 'inline-flex',
          padding: 10,
          borderRadius: 4,
        }}
      >
        Anchor
      </div>
      <Popup open anchor={anchor.current} placement={placement}>
        Popup content
      </Popup>
    </div>
  )
}
