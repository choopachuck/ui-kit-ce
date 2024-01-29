import { SelectProps, Select } from '@v-uik/base'
import { FieldProps, Field } from 'formik'
import * as React from 'react'

type Props = {
  label: string
  name: string
  className?: string
} & SelectProps<'ul', 'li'>

const SelectField: React.FC<Props & FieldProps> = ({
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
    <Select
      options={options}
      multiple={false}
      {...props}
      onChange={handleChange}
      value={field.value}
      error={touched[field.name] && !!errors[field.name]}
      helperText={(touched[field.name] && errors[field.name]) ?? ''}
    />
  )
}

export const SelectFieldAdapter: React.FC<Props> = (props) => {
  const { name, ...rest } = props

  return <Field name={name} component={SelectField} {...rest} />
}
