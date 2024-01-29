import { useFormik } from 'formik'

import React from 'react'
import {
  createUseStyles,
  Button,
  Input,
  Switch,
  LabelControl,
  Select,
  Textarea,
  CheckboxGroup,
  Checkbox,
  ComboBox,
} from '@v-uik/base'

const options = [
  { value: 'graph 1', label: 'SmartApp Graph 1.0' },
  { value: 'graph 2', label: 'SmartApp Graph 2.1' },
  { value: 'graph 3', label: 'SmartApp Graph 3.1' },
]

const comboOptions = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
  { value: '4', label: 'Опция 4' },
  { value: '5', label: 'Опция 5' },
  { value: '6', label: 'Длинная опция 6' },
  { value: '7', label: 'Опция 7' },
  { value: '8', label: 'Опция 8' },
  { value: '9', label: 'Опция 9' },
]

const useStyles = createUseStyles(() => ({
  form: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    maxWidth: 202,
  },
  formItem: {
    width: '100%',
  },
}))

export const FormWithHook = (): JSX.Element => {
  const classesList = useStyles()

  const formik = useFormik({
    initialValues: {
      smartAppName: 'Альфа',
      version: '',
      description: '',
      versionEnable: true,
      platforms: ['Platform 1'],
      comboOptions: [],
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form className={classesList.form} onSubmit={formik.handleSubmit}>
      <Input
        fullWidth
        label="Смарт апп"
        inputProps={{ id: 'smartAppName' }}
        value={formik.values.smartAppName}
        onChange={(_, event) => formik.handleChange(event)}
      />

      <LabelControl
        checked={formik.values.versionEnable}
        label="Включить версию"
        control={<Switch />}
        inputProps={{ id: 'versionEnable' }}
        onChange={(e) => formik.handleChange(e)}
      />

      <Select
        multiple={false}
        disabled={!formik.values.versionEnable}
        options={options}
        value={formik.values.version}
        onChange={(value) => formik.setFieldValue('version', value)}
      />

      <Textarea
        textareaProps={{ id: 'description' }}
        value={formik.values.description}
        onChange={(_, event) => formik.handleChange(event)}
      />

      <CheckboxGroup
        label="Приложения и устройства"
        value={formik.values.platforms}
        direction="vertical"
        onChange={(_, value) => formik.setFieldValue('platforms', value)}
      >
        <LabelControl
          disabled
          name="Platform 1"
          label="Platform 1"
          control={<Checkbox />}
        />
        <LabelControl
          name="Platform 2"
          label="Platform 2"
          control={<Checkbox />}
        />
        <LabelControl
          name="Platform 3"
          label="Platform 3"
          control={<Checkbox />}
        />
        <LabelControl
          name="Platform 4"
          label="Platform 4"
          control={<Checkbox />}
        />
      </CheckboxGroup>

      <ComboBox
        multiple
        label="Множественный выбор"
        options={comboOptions}
        value={formik.values.comboOptions}
        onChange={(value) => formik.setFieldValue('comboOptions', value)}
      />

      <Button type="submit" onClick={() => formik.handleSubmit()}>
        Сохранить
      </Button>

      <pre>{JSON.stringify(formik.values, null, ' ')}</pre>
    </form>
  )
}
