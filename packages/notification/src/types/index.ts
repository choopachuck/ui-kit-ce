import * as React from 'react'
import { DirectionType } from '@v-uik/common'

export const NotificationPosition = {
  'top-left': 'top-left',
  'top-center': 'top-center',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  'bottom-center': 'bottom-center',
  'bottom-right': 'bottom-right',
} as const

export type TNotificationPosition = keyof typeof NotificationPosition

export const NotificationStatus = {
  default: 'default',
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
} as const

export type TNotificationStatus = keyof typeof NotificationStatus

export interface CommonOptions {
  /**
   * Таймаут задержки закрытия сообщения в миллисекундах.
   * Чтобы отменить автоматическое закрытие, передайте false
   */
  autoClose?: number | false
  /**
   * Приостановить таймер закрытия при наведении курсора на сообщение
   */
  pauseOnHover?: boolean
  /**
   * Приостановить таймер закрытия при уходе фокуса со страницы
   */
  pauseOnWindowBlur?: boolean
  /**
   * Закрыть сообщение при клике на него
   */
  closeOnClick?: boolean
  /**
   * Установить позицию отображения сообщения
   */
  position?: TNotificationPosition
  /**
   * Отображать иконку закрытия или нет
   */
  showCloseButton?: boolean
  /**
   * Отображать вертикальную линию
   */
  showIndicator?: boolean
  /**
   *  Можно ли закрывать сообщение по нажатию на кнопку Escape (accessibility)
   */
  closeOnEscapeKeyDown?: boolean
  /**
   * aria-label для close button
   */
  closeButtonAriaLabel?: string
  /**
   * JSS-классы для стилизации Notification
   */
  classes?: Partial<NotificationClasses>
  /**
   * свойства кнопки закрытия
   */
  closeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  /**
   * включить режим работы cо свойствами title, actions
   */
  nextNotification?: boolean
}

export type NotificationContainerProps<T extends React.ElementType = 'div'> =
  Omit<CommonOptions, 'classes'> &
    React.ComponentPropsWithRef<T> & {
      /**
       * Максимально количество одновременно отображаемых сообщений
       */
      limit?: number
      /**
       * JSS-классы для стилизации Notification
       */
      notificationClasses?: Partial<NotificationClasses>
    }

export interface NotificationOptions extends CommonOptions {
  /**
   * Статус сообщения.
   */
  status?: TNotificationStatus
  /**
   * Иконка для отображения.
   */
  icon?: React.ReactNode
  /**
   * Идентификатор сообщения.
   */
  id?: string
  /** заголовок сообщения (только при nextNotification = true) */
  title?: React.ReactNode
  /** блок действий сообщения (только при nextNotification = true) */
  actions?: React.ReactNode
  /** направление отображения сообщения (только при nextNotification = true) */
  direction?: DirectionType
}

export type NotificationProps<T extends React.ElementType = 'div'> =
  NotificationOptions &
    React.ComponentPropsWithRef<T> & {
      /**
       * Активно ли сообщение
       * @internal
       */
      isActive: boolean
      /**
       * Функция закрытия сообщения
       * @internal
       */
      closeNotification: () => void
      /**
       * Функция удаления сообщения
       * @internal
       */
      removeNotification: () => void
    }

export interface NotificationObject {
  content: React.ReactNode
  props: NotificationProps
}

export type NotificationClasses = {
  /** Стиль, применяемый к элементу */
  root?: string
  /** Стиль, применяемый к элементу индикатора, при `showIndicator='true'`*/
  indicator?: string
  /** Стиль, применяемый к элементу иконки */
  icon?: string
  /** Стиль, применяемый к элементу кнопки закрытия */
  closeButton?: string

  /** Стиль title (стилизуется как потомок horizontal/vertical) */
  title?: string
  /** Стиль title при status: error */
  titleError?: string
  /** Стиль title при status: warning */
  titleWarning?: string
  /** Стиль title при status: success */
  titleSuccess?: string
  /** Стиль title при status: neutral */
  titleNeutral?: string
  /** Стиль title при status: info */
  titleInfo?: string

  /** Стиль content (стилизуется как потомок horizontal/vertical) */
  content?: string
  /** Стиль content при status: error */
  contentError?: string
  /** Стиль content при status: warning */
  contentWarning?: string
  /** Стиль content при status: success */
  contentSuccess?: string
  /** Стиль content при status: neutral */
  contentNeutral?: string
  /** Стиль content при status: info */
  contentInfo?: string

  /** Стиль обертки title и content (стилизуется как потомок horizontal/vertical) */
  textContainer?: string

  /** Стиль контейнера actions (стилизуется как потомок horizontal/vertical) */
  actions?: string

  /** Стиль контейнера контента (стилизуется как потомок horizontal/vertical) */
  body?: string

  /** Стиль при direction: horizontal */
  horizontal?: string

  /** Стиль при direction: vertical */
  vertical?: string
}

export type NotificationContainerClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к контейнеру элемента */
  container?: string
  /** Стиль, применяемый к элементу с `position='top'` */
  top?: string
  /** Стиль, применяемый к элементу с `position='bottom'`*/
  bottom?: string
  /** Стиль, применяемый к элементу с `position='left'`*/
  left?: string
  /** Стиль, применяемый к элементу с `position='right'`*/
  right?: string
  /** Стиль, применяемый к с `position='center'` */
  center?: string
}
