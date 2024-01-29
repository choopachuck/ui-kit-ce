import { ComboboxProps, ComboBox } from '@v-uik/base'
import { FieldProps, Field } from 'formik'
import * as React from 'react'

type Option = {
  value: string
  label: string
}

type Props = {
  label: string
  name: string
} & ComboboxProps<Option, 'li'>

const ComboBoxField: React.FC<Props & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, setFieldTouched },
  meta,
  options,
  ...props
}) => {
  const handleChange = React.useCallback(
    (value) => {
      setFieldValue(field.name, value)
      setFieldTouched(field.name, true)
    },
    [field.name, setFieldValue, setFieldTouched]
  )

  return (
    <ComboBox
      {...props}
      options={options}
      value={field.value}
      error={touched[field.name] && !!errors[field.name]}
      helperText={(touched[field.name] && errors[field.name]) ?? ''}
      onChange={handleChange}
    />
  )
}

export const ComboBoxFieldAdapter: React.FC<Props> = (props) => {
  const { name, ...rest } = props

  return <Field name={name} component={ComboBoxField} {...rest} />
}
