import * as React from 'react'

export type UploaderError = 'FILE_INVALID_TYPE'

export type UploaderFile = {
  /**
   * Файл
   */
  file: File
  /**
   * Ошибка
   */
  error?: UploaderError
}

export type UploaderBaseProps = {
  /**
   * Возможность загрузки нескольких файлов
   */
  multiple?: boolean
  /**
   * Свойства поля ввода
   */
  inputProps?: Omit<
    React.HTMLProps<HTMLInputElement>,
    'type' | 'accept' | 'multiple'
  >
  /**
   * Компонент Dropzone заблокирован для ввода
   */
  disabled?: boolean
  /**
   * Формат передаваемых файлов (https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept). Пример "image/png, image/jpg, image/jpeg"
   */
  accept?: string
}
