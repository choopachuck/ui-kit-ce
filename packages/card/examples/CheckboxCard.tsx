import * as React from 'react'
import { Text, createUseStyles, Checkbox, Card } from '@v-uik/base'

const cards = [
  {
    title: 'Title',
    id: '1',
    price: '55',
    content: `Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.`,
  },
  {
    title: 'Title',
    id: '2',
    price: '430',
    content: `Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.`,
  },
  {
    title: 'Title',
    id: '3',
    price: '950',
    content: `Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.`,
  },
]

const useStyles = createUseStyles((theme) => ({
  subtitle: {
    color: theme.sys.color.onBackgroundMedium,
  },
  content: {
    marginTop: 8,
  },
  container: {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
  },
  mainContent: {
    flex: 1,
  },
  card: {
    marginBottom: 20,
  },
}))

export const CheckboxCard: React.FC = () => {
  const [selected, setSelected] = React.useState(['1'])
  const styles = useStyles()

  const onChange = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  return (
    <div style={{ width: 600, margin: 'auto' }}>
      {cards.map(({ id, content, title, price }) => (
        <Card
          key={id}
          className={styles.card}
          kind="selectable"
          checked={selected.includes(id)}
          onChange={() => onChange(id)}
        >
          <div className={styles.container}>
            <Checkbox
              inputProps={{ tabIndex: -1 }}
              checked={selected.includes(id)}
              onChange={() => {
                onChange(id)
              }}
            />
            <div className={styles.mainContent}>
              <Text kind="titleLg">{title}</Text>
              <Text kind="body2" className={styles.subtitle}>
                Subtitle
              </Text>
              <Text kind="bodyMd" className={styles.content}>
                {content}
              </Text>
            </div>
            <Text kind="titleMd">{price}</Text>
          </div>
        </Card>
      ))}
    </div>
  )
}
