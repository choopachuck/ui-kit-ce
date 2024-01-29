import { InputProps, Input } from '@v-uik/base'
import { FieldProps, Field } from 'formik'
import * as React from 'react'

type Props = {
  label: string
  name: string
} & InputProps

const TextField: React.FC<Props & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors },
  ...props
}) => {
  return (
    <Input
      {...props}
      {...field}
      onChange={(_, event) => {
        field.onChange(event)
      }}
      error={touched[field.name] && !!errors[field.name]}
      helperText={(touched[field.name] && errors[field.name]) ?? ''}
      inputProps={{
        id: field.name,
      }}
    />
  )
}

export const TextFieldAdapter: React.FC<Props> = (props) => {
  const { name, ...rest } = props

  return <Field name={name} component={TextField} {...rest} />
}
