import * as React from 'react'
import {
  Drawer,
  DrawerPlacementType,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
} from '@v-uik/base'

export const PositionsExample = (): JSX.Element => {
  const [opened, setOpened] = React.useState<{
    [key in DrawerPlacementType]: boolean
  }>({
    left: false,
    right: false,
    top: false,
    bottom: false,
  })

  return (
    <>
      {(['left', 'right', 'top', 'bottom'] as const).map((placement) => {
        const toggle = (val: boolean) =>
          setOpened({
            ...opened,
            [placement]: val,
          })

        const handleClose = () => toggle(false)

        return (
          <React.Fragment key={placement}>
            <Button style={{ marginRight: 16 }} onClick={() => toggle(true)}>
              {placement}
            </Button>
            <Drawer
              open={opened[placement]}
              placement={placement}
              onClose={handleClose}
            >
              <DrawerHeader showCloseButton={false}>{placement}</DrawerHeader>

              <DrawerBody>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  enim hic, inventore nihil quas soluta veritatis! Autem,
                  blanditiis, consectetur dolorum ea in laudantium non, omnis
                  perferendis porro praesentium quaerat sint.
                </Text>
              </DrawerBody>

              <DrawerFooter>
                <Button kind="outlined" onClick={handleClose}>
                  Закрыть
                </Button>
                <Button onClick={handleClose}>Подтвердить</Button>
              </DrawerFooter>
            </Drawer>
          </React.Fragment>
        )
      })}
    </>
  )
}
