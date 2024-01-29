import * as React from 'react'
import { Tooltip, Select, DropdownProps } from '@v-uik/base'

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
  const [open, setOpen] = React.useState(false)
  const [placement, setPlacement] = React.useState<TPlacement>(
    defaultPlacement as TPlacement
  )

  const handleChangePlacement = (value: string) => {
    setPlacement(value as TPlacement)
  }

  React.useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <div>
      <Select
        style={{ width: 200 }}
        options={placements}
        value={placement}
        onChange={handleChangePlacement}
      />
      <Tooltip
        dropdownProps={{
          open,
          placement,
          content: (
            <div>
              Lorem ipsum dolor sit amet,
              <br />
              consectetur adipisicing elit
              <br />
              Assumenda aut deserunt dignissimos
              <br />
              distinctio ducimus error facere
            </div>
          ),
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            width: 60,
            height: 60,
            margin: '100px 0 100px 300px',
            backgroundColor: 'lightgrey',
          }}
        >
          hover me
        </div>
      </Tooltip>
    </div>
  )
}
