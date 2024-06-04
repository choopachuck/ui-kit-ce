type EnumControlValue = string | number

export type EnumControlsProps = {
  label: string
  values: EnumControlValue[]
  value: EnumControlValue
  onChange: (value: EnumControlValue) => void
}
