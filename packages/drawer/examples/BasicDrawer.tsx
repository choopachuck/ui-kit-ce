import * as React from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
} from '@v-uik/base'

export const BasicDrawer = (): JSX.Element => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(!open)}>show drawer</Button>
      <Drawer open={open} onClose={handleClose}>
        <DrawerHeader
          subtitle="Подзаголовок"
          closeButtonProps={{
            'aria-label': 'Close drawer',
          }}
          onClose={handleClose}
        >
          Заголовок
        </DrawerHeader>
        <DrawerBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi
            beatae consectetur dolore doloremque doloribus earum enim, ex
            exercitationem facere natus nisi nostrum repellat repudiandae rerum,
            sit tenetur velit voluptate.
          </Text>
        </DrawerBody>
        <DrawerFooter>
          <Button kind="outlined" onClick={handleClose}>
            Close
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export default BasicDrawer
