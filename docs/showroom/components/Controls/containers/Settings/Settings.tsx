import React from 'react'
import { Grid, GridItem } from '@v-uik/base'
import { Canvas, SourceState } from '@storybook/addon-docs'
import { StrictInputType, Args, StrictArgTypes } from '@storybook/csf'
import { SettingsProps } from './types'
import { renderControlByType, computeInputs } from './utils'

export const Settings = <TComponentProps extends Args>({
  context: { getStoryContext, storyById, id },
  children,
  overrideFields,
}: SettingsProps<TComponentProps>): React.ReactElement => {
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
    <>
      <Canvas withSource={SourceState.NONE}>
        <Grid spacing={2}>
          {Object.keys(strictInputs).map((componentProp) => (
            <GridItem
              key={componentProp}
              xs={strictInputs[componentProp]?.gridItem?.size || 8}
            >
              {renderControlByType({
                strictInput: strictInputs[componentProp],
                onChange: handleChange,
                value: settingsValues[componentProp],
              })}
            </GridItem>
          ))}
        </Grid>
      </Canvas>
      {!!children && (
        <Canvas withSource={SourceState.NONE}>
          {children?.(settingsValues)}
        </Canvas>
      )}
    </>
  )
}
