export type InputElementType = JSX.IntrinsicElements['input']['type']

export type BaseElementType = keyof JSX.IntrinsicElements

export type ButtonElementType = JSX.IntrinsicElements['button']['type']

export type LinkAnchorElementType = 'link' | 'anchor'

export type ClickStreamElementProperty = { key: string; value: string }

export type ClickStreamEventBatch<
  TData extends unknown = ClickStreamEventData
> = ClickStreamEventBatchItem<TData>[]

export type ClickStreamElementType =
  | InputElementType
  | BaseElementType
  | LinkAnchorElementType
  | ButtonElementType

export type ClickStreamBaseData = {
  /**
   * URL страницы, где было инициировано событие
   */
  url: string
  /**
   * Дата и время, в которое было инициировано событие в формате `ISO`
   */
  timeStamp: string
  /**
   * Название страницы, где было инициировано событие
   */
  pageName: string
  /**
   * Тип соединения пользователя с интернетом на момент инициирования события
   */
  connectionType: string
  /**
   * Уровень заряда устройства пользователя на момент инициирования события
   */
  batteryLevel: string
}

export type ClickStreamEventData = ClickStreamBaseData & {
  /**
   * Массив с атрибутами HTML-элемента, с которым было инициировано событие
   */
  elementAttributes: ClickStreamElementProperty[]

  /**
   * Тип инициированного события. По умолчанию принимает значение события `event.type`.
   * Также может принимать любое пользовательское значение
   */
  elementEvent: string
  /**
   * Тип элемента, с которым произошло событие. Если событие произошло с элементом `input`,
   * то значением будет являться `element.type`, иначе принимает значение, равное
   * `element.tagName` в нижнем регистре
   */
  elementType: ClickStreamElementType
  /**
   * HTML-тэг элемента, с которым произошло событие
   */
  elementTag: string
  /**
   * Значение элемента, с которым произошло событие. Если событие произошло с элементом `input`
   * и типом `radio` или `checkbox`, то значением будет являться `element.checked`. Если
   * событие произошло с элементом `input` и типом не `radio` или `checkbox`, то значением
   * будет являться `element.value`. Иначе принимает значение, равное `element.innerText`
   */
  value: string
}

export type ClickStreamEventMeta = {
  /**
   * Дата и время, в которое была отправлена очередь событиий в в формате `ISO`
   */
  timeStamp: string
  /**
   * Константное значение, которое означает, что очередь событий была отправлена через веб-приложение
   */
  platform: 'WEB'
  /**
   * Браузер, в котором была отправлена очередь событий
   */
  browser: string
  /**
   * Установленный языковой пакет в браузере пользователя на момент отправки очереди событий
   */
  systemLanguage: string
  /**
   * Язык, установленный в самом веб-приложении на момент отправки очереди событий
   */
  applicationLanguage: string
  /**
   * Размер экрана устройства пользователя на момент отправки очереди событий
   */
  screenSize: string
}

export type ClickStreamContextProps = {
  /**
   * Функция для вызова события
   *
   * @param {Event} event Инициированное событие
   * @param {string} eventType Тип инициированного события. По умолчанию принимает значение события
   * `event.type`. Также может принимать любое пользовательское значение
   * @param {boolean} immediate Флаг отправки события без очереди
   */
  dispatchEvent: (event: Event, eventType?: string, immediate?: boolean) => void
}

export type ClickStreamProviderProps<
  TData extends unknown = ClickStreamEventData
> = {
  /**
   * Функция обратного вызова, которая срабатывает при первой инициализации провайдера
   *
   * @param {ClickStreamBaseData<TData>} data Данные первой инициализации провайдера
   *
   * @param {ClickStreamEventMeta} meta Метаданные отправляемой очереди событий
   */
  onInit?: (data: ClickStreamBaseData, meta: ClickStreamEventMeta) => void
  /**
   * Функция обратного вызова, которая срабатывает при отправке очереди событий
   *
   * После отправки очереди событий, текущая очередь очищается
   *
   * @param {ClickStreamEventBatch<TData>} batch Отправляемая очередь событий, размер которой равен
   * значению свойства `batchSize`
   *
   * @param {ClickStreamEventMeta} meta Метаданные отправляемой очереди событий
   */
  onSendEvent?: (
    batch: ClickStreamEventBatch<TData>,
    meta: ClickStreamEventMeta
  ) => void
  /**
   * Функция для получения отформатированных данных для событий `ClickStreamProvider`
   *
   * @param {Event} event Инициированное событие
   * @param {string} eventType Тип инициированного события. По умолчанию принимает значение события
   * `event.type`. Также может принимать любое пользовательское значение
   */
  formatEventData?: (event: Event, eventType: string) => TData
  /**
   * Функция обратного вызова, которая срабатывает при добавлении нового события в очередь событий
   *
   * @param {Event} event Инициированное событие
   * @param {TData} data Отформатированные данные для события
   * @param {ClickStreamEventBatch<TData>} batch Накопленная очередь событий
   * @param {boolean} immediate Флаг отправки события без очереди
   */
  onBatch?: (
    event: Event,
    data: TData,
    batch: ClickStreamEventBatch<TData>,
    immediate: boolean
  ) => void
  /**
   * Флаг для отключения у всего приложения автоматической отправки событий через `ClickStreamProvider`
   */
  disableAutoSendEvent?: boolean
  /**
   * Максимальный размер очереди событий
   */
  batchSize?: number
  /**
   * Разрешенное время бездействия пользователя в миллисекундах
   *
   * Если пользователь совершил количество действий меньше, чем указано в свойстве `batchSize`, то
   * по истечению указанного времени `ClickStreamProvider` автоматически запустит функцию обратного
   * вызова `onSendEvent` с накопившейся очередью событий
   */
  inactivityTime?: number
}

export type ClickStreamEventBatchItem<
  TData extends unknown = ClickStreamEventData
> = {
  /**
   * Инициированное событие
   */
  event: Event
  /**
   * Отформатированные данные для события
   */
  data: TData
}
