import { ReactNode } from 'react'
import { Accessors, Options } from '../../interfaces'
import { StateManagerComboboxProps } from '../useStateManager'

export interface CreatableOwnProps<Option> {
  /**
   * Устанавливает позицию нового элемента в списке.
   */
  newOptionPosition?: 'first' | 'last'
  /**
   * Форматирует заголовок "Создать ...". Принимает введенное значение
   */
  formatLabel?: (inputValue: string) => ReactNode
  /**
   * Определяет, должна ли показываться опция "Создать ..." на основе введенного значения, выбранного, и массива всех опций
   */
  isValidNewOption?: (
    inputValue: string,
    selectedOption: Options<Option>,
    options: Options<Option>,
    accessors: Accessors<Option>
  ) => boolean
  /**
   * Возвращает новую опцию, исходя из введенного значения. Новая опция будет передана в дефолтный `onChange`
   */
  getNewOption?: (inputValue: string, optionLabel: ReactNode) => Option
  /**
   * Если есть, будет вызвана с введенным значением, вместо дефолтного `onChange`
   */
  onCreateOption?: (inputValue: string) => void
  /**
   * Показывать ли разделитель у создаваемой опции
   */
  isCreatableDivided?: boolean
}

export type CreatableProps<
  Option,
  ListElement extends React.ElementType,
  IsMulti extends boolean,
  ListItemElement extends React.ElementType = 'li'
> = StateManagerComboboxProps<Option, ListElement, IsMulti, ListItemElement> &
  CreatableOwnProps<Option>
