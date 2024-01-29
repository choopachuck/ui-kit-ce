import * as React from 'react'
import {
  Button,
  Text,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@v-uik/base'

const contentProps_1 = {
  style: {
    transition: 'transform 250ms ease-out',
    transform: 'translateX(-24px)',
  },
}

const contentProps_2 = {
  style: {
    transition: 'transform 250ms ease-out',
    transform: 'translateX(-48px)',
  },
}

const backdropProps = {
  style: {
    opacity: 0,
  },
}

export const MultiLevelExample = (): JSX.Element => {
  const [openedCount, setOpenedCount] = React.useState(0)

  const handleClose = () => setOpenedCount(openedCount - 1)

  const openNext = () => setOpenedCount(openedCount + 1)

  let contentProps = openedCount === 3 ? contentProps_2 : undefined

  if (openedCount === 2) {
    contentProps = contentProps_1
  }

  return (
    <>
      <Button onClick={() => setOpenedCount(1)}>show drawer</Button>
      <Drawer
        open={openedCount > 0}
        backdropProps={openedCount > 1 ? backdropProps : undefined}
        contentProps={contentProps}
        onClose={handleClose}
      >
        <DrawerHeader onClose={handleClose}>First</DrawerHeader>
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
          <Button onClick={openNext}>Next</Button>
        </DrawerFooter>
      </Drawer>

      <Drawer
        open={openedCount > 1}
        backdropProps={openedCount > 2 ? backdropProps : undefined}
        contentProps={openedCount === 3 ? contentProps_1 : undefined}
        onClose={handleClose}
      >
        <DrawerHeader onClose={handleClose}>Second</DrawerHeader>
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
            Закрыть
          </Button>
          <Button onClick={openNext}>Next</Button>
        </DrawerFooter>
      </Drawer>

      <Drawer open={openedCount > 2} onClose={handleClose}>
        <DrawerHeader onClose={handleClose}>Third</DrawerHeader>
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
