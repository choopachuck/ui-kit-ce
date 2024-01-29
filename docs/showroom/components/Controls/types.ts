import { SettingsProps } from './containers'

export type ControlsProps<TComponentProps> = Pick<
  SettingsProps<TComponentProps>,
  'children' | 'overrideFields'
>
