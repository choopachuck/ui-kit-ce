import * as React from 'react'
import { Select, createUseStyles, Text } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  container: {
    height: 300,
    overflow: 'auto',
  },
  content: {
    height: 500,
    background: theme.sys.color.backgroundBeta,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export const AbsolutePositioningExample = (): React.ReactElement => {
  const styles = useStyles()
  const [value, setValue] = React.useState('')

  return (
    <div className={styles.container}>
      <Select
        limitByWidth
        hideDropdownOnOutsideScroll={false}
        options={[
          { value: '', label: 'Выберите опцию' },
          { value: '1', label: 'Опция 1' },
          { value: '2', label: 'Опция 2' },
          { value: '3', label: 'Очень длинная опция 3' },
        ]}
        value={value}
        label="Заголовок"
        dropdownProps={{
          disablePortal: true,
          popperOptions: {
            strategy: 'absolute',
          },
        }}
        onChange={setValue}
      />

      <div className={styles.content}>
        <Text>Content below</Text>
      </div>
    </div>
  )
}
