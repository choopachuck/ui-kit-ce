import { SwitchProps, Switch, LabelControl } from '@v-uik/base'
import { FieldProps, Field } from 'formik'
import * as React from 'react'

type Props = {
  label: string
  name: string
} & SwitchProps

const SwitchField: React.FC<Props & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors },
  ...props
}) => {
  return (
    <LabelControl
      {...props}
      {...field}
      onChange={(event) => {
        field.onChange(event)
      }}
      inputProps={{ id: field.name }}
      control={<Switch />}
    />
  )
}

export const SwitchFieldAdapter: React.FC<Props> = (props) => {
  const { name, ...rest } = props

  return <Field name={name} component={SwitchField} {...rest} />
}
