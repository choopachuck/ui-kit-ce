import { TextareaProps, Textarea } from '@v-uik/base'
import { FieldProps, Field } from 'formik'
import * as React from 'react'

type Props = {
  label: string
  name: string
} & TextareaProps

const TextareaField: React.FC<Props & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors },
  ...props
}) => {
  return (
    <Textarea
      {...props}
      {...field}
      onChange={(_, event) => {
        field.onChange(event)
      }}
      error={touched[field.name] && !!errors[field.name]}
      helperText={(touched[field.name] && errors[field.name]) ?? ''}
      textareaProps={{
        id: field.name,
      }}
    />
  )
}

export const TextareaFieldAdapter: React.FC<Props> = (props) => {
  const { name, ...rest } = props

  return <Field name={name} component={TextareaField} {...rest} />
}
