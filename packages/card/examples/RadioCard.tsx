import * as React from 'react'
import { Radio, Text, createUseStyles, Card } from '@v-uik/base'

const CarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43.9 21.1C43.95 21.2 44 21.3 44 21.4V34C44 35.2 43.2 36 42 36H39.6C38.8 38.4 36.6 40 34 40C31.4 40 29.2 38.4 28.4 36H19.6C18.8 38.4 16.6 40 14 40C11.4 40 9.2 38.4 8.4 36H6C4.8 36 4 35.2 4 34V26C4 24.8 4.8 24 6 24C7.2 24 8 24.8 8 26V32H8.4C9.2 29.6 11.4 28 14 28C16.6 28 18.8 29.6 19.6 32H24V12H4C2.8 12 2 11.2 2 10C2 8.8 2.8 8 4 8H26C27.2 8 28 8.8 28 10H36C36.8 10 37.4 10.4 37.8 10.8L43.8 20.8C43.8 20.9 43.85 21 43.9 21.1ZM12 34C12 35.2 12.8 36 14 36C15.2 36 16 35.2 16 34C16 32.8 15.2 32 14 32C12.8 32 12 32.8 12 34ZM34.8 14H28V20H38.4L34.8 14ZM32 34C32 35.2 32.8 36 34 36C35.2 36 36 35.2 36 34C36 32.8 35.2 32 34 32C32.8 32 32 32.8 32 34ZM39.6 32H40V24H28V32H28.4C29.2 29.6 31.4 28 34 28C36.6 28 38.8 29.6 39.6 32Z"
      fill="black"
      fillOpacity="0.46"
    />
    <path
      d="M14 20H6C4.8 20 4 19.2 4 18C4 16.8 4.8 16 6 16H14C15.2 16 16 16.8 16 18C16 19.2 15.2 20 14 20Z"
      fill="black"
      fillOpacity="0.46"
    />
  </svg>
)

const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M42 14.7992C42 14.3992 41.8 14.1992 41.8 13.9992C41.6 13.7992 41.6 13.5992 41.4 13.3992C41.4 13.3992 41.4 13.3992 41.2 13.1992C41.2 13.1992 41.2 13.1992 41 12.9992L25 3.99922C24.4 3.59922 23.6 3.59922 23 3.99922L7 12.9992C7 12.9992 6.8 12.9992 6.8 13.1992C6.8 13.1992 6.8 13.1992 6.6 13.3992C6.6 13.5992 6.4 13.7992 6.2 13.9992C6.2 14.1992 6 14.3992 6 14.5992V14.7992C6 14.7992 6 14.7992 6 14.9992V32.9992C6 33.7992 6.4 34.3992 7 34.7992L23 43.7992C23 43.7992 23 43.7992 23.2 43.7992C23.2 43.7992 23.2 43.7992 23.4 43.7992C23.6 43.7992 23.8 43.9992 24 43.9992C24.2 43.9992 24.4 43.9992 24.6 43.7992C24.6 43.7992 24.6 43.7992 24.8 43.7992C24.8 43.7992 24.8 43.7992 25 43.7992L41 34.7992C41.6 34.3992 42 33.7992 42 32.9992V14.7992C42 14.9992 42 14.9992 42 14.7992ZM24 8.19922L36 14.9992L24 21.7992L12 14.9992L24 8.19922ZM10 18.3992L22 25.1992V38.5992L10 31.7992V18.3992ZM26 38.5992V25.1992L38 18.3992V31.7992L26 38.5992Z"
      fill="black"
      fillOpacity="0.46"
    />
  </svg>
)

const SomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M42.0005 21.9997C42.0005 20.7997 41.2005 19.9997 40.0005 19.9997C35.2005 19.9997 27.0005 14.3997 26.0005 12.7997V9.99969H28.0005C29.0005 9.99969 29.8005 9.39969 30.0005 8.39969C30.2005 7.39969 29.8005 6.59969 29.0005 6.19969L25.0005 4.19969C24.4005 3.79969 23.6005 3.99969 23.0005 4.19969C22.4005 4.59969 22.0005 5.39969 22.0005 5.99969V12.7997C21.0005 14.3997 13.0005 19.9997 8.00046 19.9997C6.80046 19.9997 6.00046 20.7997 6.00046 21.9997C6.00046 23.1997 6.80046 23.9997 8.00046 23.9997H9.80046C9.00046 35.1997 7.40046 39.1997 6.40046 40.7997C6.00046 41.3997 5.80046 42.1997 6.20046 42.7997C6.60046 43.3997 7.20046 43.9997 8.00046 43.9997H16.0005C18.4005 43.9997 21.8005 39.9997 24.0005 34.3997C26.2005 39.9997 29.6005 43.9997 32.0005 43.9997H40.0005C40.8005 43.9997 41.4005 43.5997 41.8005 42.7997C42.2005 42.1997 42.0005 41.3997 41.6005 40.7997C40.4005 39.1997 39.0005 35.1997 38.2005 23.9997H40.0005C41.2005 23.9997 42.0005 23.1997 42.0005 21.9997ZM24.0005 16.3997C25.2005 17.5997 27.0005 18.7997 28.8005 19.9997H19.2005C21.0005 18.7997 22.8005 17.5997 24.0005 16.3997ZM15.8005 39.9997H11.2005C12.4005 36.5997 13.2005 31.3997 13.8005 23.9997H22.0005C22.0005 32.7997 17.2005 39.1997 15.8005 39.9997ZM36.8005 39.9997H32.2005C30.8005 39.1997 26.0005 32.7997 26.0005 23.9997H34.2005C34.6005 31.3997 35.6005 36.5997 36.8005 39.9997Z"
      fill="black"
      fillOpacity="0.46"
    />
  </svg>
)

const cards = [
  {
    title: 'Title',
    id: '1',
    icon: <CarIcon />,
    content: `Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.`,
  },
  {
    title: 'Title',
    id: '2',
    icon: <BoxIcon />,
    content: `Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.`,
  },
  {
    title: 'Title',
    id: '3',
    icon: <SomeIcon />,
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

export const RadioCard: React.FC = () => {
  const [selected, setSelected] = React.useState('1')
  const styles = useStyles()

  return (
    <div style={{ width: 600, margin: 'auto' }}>
      {cards.map(({ id, content, title, icon }) => (
        <Card
          key={id}
          inputProps={{ type: 'radio' }}
          className={styles.card}
          kind="selectable"
          name="some"
          checked={selected === id}
          onChange={() => setSelected(id)}
        >
          <div className={styles.container}>
            <Radio
              inputProps={{ tabIndex: -1 }}
              checked={selected === id}
              onChange={() => {
                setSelected(id)
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
            {icon}
          </div>
        </Card>
      ))}
    </div>
  )
}
