import * as React from 'react'
import { Slider, InputLabel, InputNumber } from '@v-uik/base'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  inline: {
    display: 'flex',
    gap: 4,
  },
  input: {
    width: 64,
  },
  smPadding: {
    padding: [15, 0],
  },
  mdPadding: {
    padding: [19, 0],
  },
  lgPadding: {
    padding: [23, 0],
  },
})

export const WithInput = (): React.ReactElement => {
  const classes = useStyles()
  const [value, setValue] = React.useState<number | null>(1)

  const fixValue = () => {
    if (!value && value !== 0) {
      setValue(1)

      return
    }

    setValue(Math.min(Math.max(value, 0.5), 2))
  }

  const sliderProps = {
    min: 0.5,
    max: 2,
    step: 0.5,
    value: value ?? 0,
    onChange: setValue,
    ticks: true,
  }

  const inputProps = {
    value,
    onChange: setValue,
    onBlur: fixValue,
    classes: {
      inputContainer: classes.input,
    },
  }

  return (
    <>
      <InputLabel id="speedLabelSm">Скорость воспроизведения</InputLabel>
      <div className={classes.inline}>
        <Slider
          {...sliderProps}
          markerProps={{
            'aria-labelledby': 'speedLabelSm',
          }}
          classes={{
            slider: classes.smPadding,
          }}
        />
        <InputNumber {...inputProps} size="sm" />
      </div>
      <InputLabel id="speedLabelMd">Скорость воспроизведения</InputLabel>
      <div className={classes.inline}>
        <Slider
          {...sliderProps}
          markerProps={{
            'aria-labelledby': 'speedLabelMd',
          }}
          classes={{
            slider: classes.mdPadding,
          }}
        />
        <InputNumber {...inputProps} />
      </div>
      <InputLabel id="speedLabelLg">Скорость воспроизведения</InputLabel>
      <div className={classes.inline}>
        <Slider
          {...sliderProps}
          markerProps={{
            'aria-labelledby': 'speedLabelLg',
          }}
          classes={{
            slider: classes.lgPadding,
          }}
        />
        <InputNumber {...inputProps} size="lg" />
      </div>
    </>
  )
}
