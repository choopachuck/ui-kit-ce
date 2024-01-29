/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import {
  ButtonGroup,
  Button,
  DropdownMenu,
  DropdownMenuItem,
  createUseStyles,
} from '@v-uik/base'

const useStyles = createUseStyles({
  button: {
    width: 250,
  },
})

const LABEL_MAP = {
  debt: 'Button 1',
  credit: 'Button 2',
  cash: 'Button 3',
}

type LabelKey = keyof typeof LABEL_MAP

export const PopupExample = (): React.ReactElement => {
  const styles = useStyles()
  const [active, setActive] = React.useState<LabelKey>('debt')

  return (
    <ButtonGroup>
      <Button name="selected" className={styles.button}>
        {LABEL_MAP[active]}
      </Button>
      <DropdownMenu
        action="click"
        placement="bottom-start"
        content={
          <>
            {Object.keys(LABEL_MAP).map((key) => (
              <DropdownMenuItem
                key={key}
                closeMenuOnClick
                suffix={key === active ? '✓' : ''}
                selected={key === active}
                onClick={() => setActive(key as LabelKey)}
              >
                {LABEL_MAP[key as LabelKey]}
              </DropdownMenuItem>
            ))}
          </>
        }
      >
        <Button name="popup-button">▼</Button>
      </DropdownMenu>
    </ButtonGroup>
  )
}
