import { Formik, Form } from 'formik'
import {
  TextareaFieldAdapter,
  SwitchFieldAdapter,
  CheckboxGroupFieldAdapter,
  SelectFieldAdapter,
  TextFieldAdapter,
  ComboBoxFieldAdapter,
} from './Adapters'
import { createUseStyles, Button } from '@v-uik/base'
import React from 'react'

const options = [
  { value: 'graph 1', label: 'SmartApp Graph 1.0' },
  { value: 'graph 2', label: 'SmartApp Graph 2.1' },
  { value: 'graph 3', label: 'SmartApp Graph 3.1' },
]

const platforms = [
  { name: 'Platform 1', label: 'Platform 1' },
  { name: 'Platform 2', label: 'Platform 2' },
  { name: 'Platform 3', label: 'Platform 3' },
  { name: 'Platform 4', label: 'Platform 4' },
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

type Values = {
  smartAppName: string
  version: string
  description: string
  versionEnable: boolean
  platforms: string[]
  comboOptions: string[]
}

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

export const FormWithFormik = (): JSX.Element => {
  const classesList = useStyles()

  const [initialValues, setInitialValues] = React.useState<Values>({
    smartAppName: '',
    version: '',
    description: '',
    versionEnable: false,
    platforms: [],
    comboOptions: [],
  })

  const handleChange = (values: Values) => {
    setInitialValues(values)
  }

  return (
    <Formik
      enableReinitialize
      validateOnBlur
      initialValues={initialValues}
      render={({ values, handleSubmit }) => (
        <Form>
          <div className={classesList.form}>
            <TextFieldAdapter
              label="Смарт апп"
              name="smartAppName"
              placeholder="Введите текст"
            />

            <SwitchFieldAdapter label="Включить версию" name="versionEnable" />

            <SelectFieldAdapter
              disabled={!values.versionEnable}
              label=" Версия"
              name="version"
              options={options}
            />

            <TextareaFieldAdapter label="Описание" name="description" />

            <CheckboxGroupFieldAdapter
              label="Приложения и устройства"
              direction="vertical"
              name="platforms"
              options={platforms}
            />

            <ComboBoxFieldAdapter
              multiple
              options={comboOptions}
              label="Множественный выбор"
              name="comboOptions"
            />

            <Button type="submit" onClick={() => handleSubmit()}>
              Сохранить
            </Button>

            <pre>{JSON.stringify(values, null, ' ')}</pre>
          </div>
        </Form>
      )}
      onSubmit={handleChange}
    />
  )
}
