export type FileItemClasses = {
  /**
   * Стиль, применяемый к основному элементу
   */
  root?: string
  /**
   * Стиль для контейнера внутри root
   */
  container?: string
  /**
   * Стиль для содержимого элемента
   */
  content?: string
  /**
   * Стиль для поля info (слева от статуса)
   */
  info?: string
  /**
   * Стиль для элемента статуса
   */
  status?: string
  /**
   * Стиль для status=error
   */
  error?: string
  /**
   * Стиль для status=progress
   */
  progress?: string
  /**
   * Стиль для текста ошибки
   */
  errorText?: string
  /**
   * Стиль для линейного прогресса (LinearProgress)
   */
  linearProgress?: string
  /**
   * Стиль для size='sm'
   */
  sm?: string
  /**
   * Стиль для size='md'
   */
  md?: string
  /**
   * Стиль для size='lg'
   */
  lg?: string
}

export type FileItemIconButtonClasses = {
  /**
   * Стиль для контейнера
   */
  root?: string
  /**
   * Стиль при size='md'
   */
  md?: string
  /**
   * Стиль при size='sm'
   */
  sm?: string
  /**
   * Стиль при size='lg'
   */
  lg?: string
}
