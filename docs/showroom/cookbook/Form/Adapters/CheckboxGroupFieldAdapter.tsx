import { FieldProps, Field } from 'formik'
import * as React from 'react'
import {
  CheckboxGroup,
  CheckboxGroupProps,
  Checkbox,
  LabelControl,
} from '@v-uik/base'

type Props = {
  label: string
  name: string
  options: Array<{ name: string; label: string }>
} & CheckboxGroupProps

const CheckboxGroupField: React.FC<Props & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue, setFieldTouched },
  options,
  disabled,
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
    <CheckboxGroup
      disabled={disabled}
      value={field.value}
      onChange={(_, value) => handleChange(value)}
      {...props}
    >
      {options.map((item) => (
        <LabelControl
          key={item.label}
          disabled={disabled}
          name={item.name}
          label={item.label}
          control={<Checkbox />}
        />
      ))}
    </CheckboxGroup>
  )
}

export const CheckboxGroupFieldAdapter: React.FC<Props> = (props) => {
  const { name, ...rest } = props

  return <Field name={name} component={CheckboxGroupField} {...rest} />
}
