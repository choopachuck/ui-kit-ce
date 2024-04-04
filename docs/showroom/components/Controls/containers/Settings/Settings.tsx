import React from 'react'
import { createUseStyles, ThemeProvider, createTheme } from '@v-uik/base'
import { StrictInputType, Args, StrictArgTypes } from '@storybook/csf'
import { SettingsProps } from './types'
import { renderControlByType, computeInputs } from './utils'

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    border: `1px solid ${theme.sys.color.separationMajor}`,
    borderRadius: 8,
  },
  componentPanel: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsPanel: {
    width: 240,
    background: '#F7F7F7',
    borderLeft: `1px solid ${theme.sys.color.separationMajor}`,
    boxSizing: 'border-box',
    display: 'flex',
    gap: 12,
    flexDirection: 'column',
    padding: [24, 20],
  },
}))

const theme = createTheme({
  comp: {
    labelControl: {
      typographyFontSizeSm: '14px',
      typographyLineHeightSm: '20px',
    },
    backwardCompatibilityMode: false,
  },
})

export const Settings = <TComponentProps extends Args>({
  context: { getStoryContext, storyById, id },
  children,
  overrideFields,
}: SettingsProps<TComponentProps>): React.ReactElement => {
  const styles = useStyles()
  const properties = getStoryContext(storyById(id))

  const { defaultValues, strictInputs } = React.useMemo(
    () =>
      computeInputs({
        overrideFields,
        storyFields: properties.argTypes as StrictArgTypes<TComponentProps>,
      }),
    [overrideFields, properties.argTypes]
  )

  const handleChange = (name: StrictInputType['name'], value: unknown) => {
    setSettingsValues((prev) => ({ ...prev, [name]: value }))
  }

  const [settingsValues, setSettingsValues] =
    React.useState<Partial<TComponentProps>>(defaultValues)

  return (
    <div className={styles.container}>
      <div className={styles.componentPanel}>
        {!!children && children?.(settingsValues)}
      </div>
      <ThemeProvider theme={theme}>
        <div className={styles.settingsPanel}>
          {Object.keys(strictInputs).map((componentProp) => (
            <div key={componentProp}>
              {renderControlByType({
                strictInput: strictInputs[componentProp],
                onChange: handleChange,
                value: settingsValues[componentProp],
              })}
            </div>
          ))}
        </div>
      </ThemeProvider>
    </div>
  )
}
