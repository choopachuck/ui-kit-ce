import {
  AnyFramework,
  StrictInputType,
  Args,
  SBType,
  StrictArgTypes,
} from '@storybook/csf'
import { DocsContextProps } from '@storybook/addon-docs'
import { GridItemProps } from '@v-uik/base'

export type ControlBaseStrictInputType =
  | (Omit<StrictInputType, 'type'> & {
      type: {
        name: SBType['name'] | 'textarea'
        value?: SBType
      }
    })
  | StrictInputType

export type ControlStrictInputType = ControlBaseStrictInputType & {
  /**
   * Текстовое название свойства компонента
   */
  label: string
  /**
   * Настройки размерной сетки для отрисовки поля
   */
  gridItem?: {
    size: GridItemProps['xs']
  }
}

export type BaseControlFields<
  TComponentProps = Args,
  TStrictInputType = ControlBaseStrictInputType
> = {
  [Property in keyof TComponentProps]: TStrictInputType
}

export type ControlOverrideField<TComponentProps extends Args> =
  ControlBaseStrictInputType & {
    /**
     * Ключ/название свойства компонента
     */
    key: keyof TComponentProps
  }

export type ControlFields<TComponentProps extends Args = Args> =
  BaseControlFields<TComponentProps, ControlBaseStrictInputType>

export type SettingsProps<TComponentProps extends Args = Args> = {
  children?: (settingsValues: Partial<TComponentProps>) => React.ReactNode
  /**
   * Контекст storybook для текущего компонента
   */
  context: DocsContextProps<AnyFramework>
  /**
   * Массив полей для настройки компонента
   */
  overrideFields?: ControlOverrideField<TComponentProps>[]
}

export type RenderControlByTypeProps = {
  /**
   * Поле для отрисовки настройки компонента
   */
  strictInput: ControlStrictInputType
  /**
   * Коллбэк на изменение значения поля
   */
  onChange: (name: ControlStrictInputType['name'], value: unknown) => void
  /**
   * Текущее значение поля
   */
  value: unknown
}

export type ComputeFieldsProps<TComponentProps extends Args = Args> = {
  /**
   * Объект с полями для настройки компонента, полученных из контекста storybook
   */
  storyFields: StrictArgTypes<TComponentProps>
  /**
   * Клиентский массив полей для настройки компонента
   */
  overrideFields?: ControlOverrideField<TComponentProps>[]
}
