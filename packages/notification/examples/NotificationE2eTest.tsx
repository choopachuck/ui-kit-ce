import * as React from 'react'
import {
  RadioGroup,
  Radio,
  InputNumber,
  Checkbox,
  Text,
  useTheme,
  Button,
  Link,
  LabelControl,
  NotificationContainer,
  TNotificationPosition,
  TNotificationStatus,
  notification,
  Textarea,
} from '@v-uik/base'

import { Icon } from './assets/Icon'

const offsetStyle = {
  marginBottom: 12,
}

const checkboxStyle = {
  marginBottom: 8,
}

const getShowIcon = (showIcon: boolean, showCustomContent: boolean) => {
  if (showIcon) {
    return showCustomContent ? <Icon /> : undefined
  }

  return null
}

export const NotificationE2eTest = (): React.ReactElement => {
  const [position, setPosition] =
    React.useState<TNotificationPosition>('top-right')
  const [status, setStatus] = React.useState<TNotificationStatus>('default')
  const [autoClose, setAutoClose] = React.useState(5000)
  const [disableAutoClose, setDisableAutoClose] = React.useState(false)
  const [limit, setLimit] = React.useState(3)
  const [pauseOnHover, setPauseOnHover] = React.useState(true)
  const [pauseOnWindowBlur, setPauseOnWindowBlur] = React.useState(true)
  const [closeOnClick, setCloseOnClick] = React.useState(true)
  const [showCloseButton, setShowCloseButton] = React.useState(true)
  const [showIndicator, setShowIndicator] = React.useState(true)
  const [showIcon, setShowIcon] = React.useState(true)
  const [showTitle, setShowTitle] = React.useState(true)
  const [showDescription, setShowDescription] = React.useState(false)
  const [showCustomContent, setShowCustomContent] = React.useState(false)
  const [title, setTitle] = React.useState('Очень важное сообщение')
  const [description, setDescription] = React.useState(
    'Сюда входят две или более строк основного текста для описания этого уведомления.'
  )
  const [closeOnEscapeKeyDown, setCloseOnEscapeKeyDown] = React.useState(true)

  const theme = useTheme()

  const handleChangeTitle = (value: string) => {
    setTitle(value)
  }

  const handleChangeDescription = (value: string) => {
    setDescription(value)
  }

  const onChangePosition = (value: string) =>
    setPosition(value as TNotificationPosition)

  const onChangeType = (value: string) =>
    setStatus(value as TNotificationStatus)

  const onChangeAutoClose = (value: number | null) => setAutoClose(value ?? 0)

  const onChangeLimit = (value: number | null) => setLimit(value ?? 0)

  const customizedId = React.useRef(1)

  const showMessage = () => {
    const id = showCustomContent
      ? `custom-id-${customizedId.current++}`
      : undefined

    const titleText = showTitle ? title : null

    const content =
      showDescription || showCustomContent ? (
        <>
          {titleText}

          {showDescription && (
            <Text
              style={{
                marginTop: titleText ? 8 : 0,
                color: theme.sys.color.onBackgroundMedium,
              }}
            >
              {description}
            </Text>
          )}

          {showCustomContent && (
            <div
              style={{
                display: 'flex',
                marginTop: 16,
                marginRight: showCloseButton ? -40 : 0,
              }}
            >
              <Link href="">Link</Link>

              <Button
                style={{ marginLeft: 'auto' }}
                kind="outlined"
                size="sm"
                color="secondary"
                onClick={() => notification.close(id as string)}
              >
                Button
              </Button>
            </div>
          )}
        </>
      ) : (
        titleText
      )

    notification(content, {
      status,
      icon: getShowIcon(showIcon, showCustomContent),
      id,
    })
  }

  return (
    <div>
      <RadioGroup
        style={offsetStyle}
        label="Расположение сообщений"
        value={position}
        onChange={onChangePosition}
      >
        <LabelControl
          style={checkboxStyle}
          label="top-right"
          value="top-right"
          control={<Radio />}
        />
        <LabelControl
          label="top-center"
          value="top-center"
          control={<Radio />}
        />
        <LabelControl label="top-left" value="top-left" control={<Radio />} />
        <LabelControl
          label="bottom-right"
          value="bottom-right"
          control={<Radio />}
        />
        <LabelControl
          label="bottom-center"
          value="bottom-center"
          control={<Radio />}
        />
        <LabelControl
          label="bottom-left"
          value="bottom-left"
          control={<Radio />}
        />
      </RadioGroup>

      <RadioGroup
        style={offsetStyle}
        label="Тип сообщений"
        value={status}
        onChange={onChangeType}
      >
        <LabelControl label="default" value="default" control={<Radio />} />
        <LabelControl label="success" value="success" control={<Radio />} />
        <LabelControl label="info" value="info" control={<Radio />} />
        <LabelControl label="warning" value="warning" control={<Radio />} />
        <LabelControl label="error" value="error" control={<Radio />} />
      </RadioGroup>

      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <InputNumber
            precision={0}
            style={offsetStyle}
            label="Время показа сообщения (мс)"
            disabled={disableAutoClose}
            value={autoClose}
            onChange={onChangeAutoClose}
          />

          <LabelControl
            style={checkboxStyle}
            checked={disableAutoClose}
            control={<Checkbox />}
            label="Отключить автоматическое закрытие"
            onChange={() => setDisableAutoClose(!disableAutoClose)}
          />
          <LabelControl
            style={checkboxStyle}
            checked={closeOnEscapeKeyDown}
            control={<Checkbox />}
            label="Закрывать на кнопку Escape"
            onChange={() => setCloseOnEscapeKeyDown(!closeOnEscapeKeyDown)}
          />
          <LabelControl
            style={checkboxStyle}
            checked={pauseOnHover}
            control={<Checkbox />}
            label="Останавливать таймер закрытия при наведении курсора"
            onChange={() => setPauseOnHover(!pauseOnHover)}
          />
          <LabelControl
            style={checkboxStyle}
            checked={pauseOnWindowBlur}
            control={<Checkbox />}
            label="Останавливать таймер закрытия при потере фокуса окном"
            onChange={() => setPauseOnWindowBlur(!pauseOnWindowBlur)}
          />
          <LabelControl
            style={offsetStyle}
            checked={closeOnClick}
            control={<Checkbox />}
            label="Закрывать при клике на сообщение"
            onChange={() => setCloseOnClick(!closeOnClick)}
          />
        </div>

        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <InputNumber
            precision={0}
            style={offsetStyle}
            label="Лимит отображаемых сообщений"
            value={limit}
            onChange={onChangeLimit}
          />
          <LabelControl
            style={checkboxStyle}
            checked={showCloseButton}
            control={<Checkbox />}
            label="Показывать кнопку закрытия"
            onChange={() => setShowCloseButton(!showCloseButton)}
          />
          <LabelControl
            style={checkboxStyle}
            checked={showIndicator}
            control={<Checkbox />}
            label="Показывать индикатор"
            onChange={() => setShowIndicator(!showIndicator)}
          />
          <LabelControl
            style={checkboxStyle}
            checked={showIcon}
            control={<Checkbox />}
            label="Показывать иконку"
            onChange={() => setShowIcon(!showIcon)}
          />
          <LabelControl
            style={offsetStyle}
            checked={showCustomContent}
            control={<Checkbox />}
            label="Показывать кастомизированный контент"
            onChange={() => setShowCustomContent(!showCustomContent)}
          />
        </div>
      </div>

      <hr style={{ margin: '8px 0 20px' }} />

      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingRight: 16,
            boxSizing: 'border-box',
          }}
        >
          <LabelControl
            style={offsetStyle}
            checked={showTitle}
            control={<Checkbox />}
            label="Показывать заголовок"
            onChange={() => setShowTitle(!showTitle)}
          />

          <Textarea
            fullWidth
            style={offsetStyle}
            label="Заголовок"
            value={title}
            onChange={handleChangeTitle}
          />
        </div>

        <div
          style={{
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <LabelControl
            style={offsetStyle}
            checked={showDescription}
            control={<Checkbox />}
            label="Показывать описание"
            onChange={() => setShowDescription(!showDescription)}
          />

          <Textarea
            fullWidth
            style={offsetStyle}
            label="Текст описания"
            placeholder="Введите описание для вывода в контейнере"
            value={description}
            onChange={handleChangeDescription}
          />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Button
          style={{ marginRight: 16, marginBottom: 16 }}
          onClick={showMessage}
        >
          показать сообщение
        </Button>

        <Button
          color="error"
          style={{ marginRight: 16, marginBottom: 16 }}
          onClick={() => notification.closeAll()}
        >
          закрыть все сообщения
        </Button>
      </div>

      <NotificationContainer
        position={position}
        autoClose={disableAutoClose ? false : autoClose}
        limit={limit}
        pauseOnHover={pauseOnHover}
        pauseOnWindowBlur={pauseOnWindowBlur}
        closeOnClick={closeOnClick}
        showCloseButton={showCloseButton}
        showIndicator={showIndicator}
        closeOnEscapeKeyDown={closeOnEscapeKeyDown}
        closeButtonAriaLabel="Закрыть"
      />
    </div>
  )
}
