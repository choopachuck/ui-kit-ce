import * as React from 'react'
import {
  createTheme,
  ThemeProvider,
  light,
  Grid,
  GridItem,
  Breadcrumbs,
  Link,
  Slider,
  Tabs,
  Tab,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  Button,
  ButtonGroup,
  Input,
  Select,
  LabelControl,
} from '@v-uik/base'

export function TokensExample() {
  const [sliderValue, setSliderValue] = React.useState(1)
  const [tabsValue, setTabsValue] = React.useState<React.ReactText>(1)
  const [radioValue, setRadioValue] = React.useState('1')
  const [checkboxValue, setCheckboxValue] = React.useState<
    string[] | undefined
  >(['1'])
  const [switchValue, setSwitchValue] = React.useState({
    first: true,
    second: false,
  })
  const [buttonGroupValue, setButtonGroupValue] = React.useState('1')
  const [inputValue, setInputValue] = React.useState('')
  const [selectValue, setSelectValue] = React.useState('')

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchValue({
      ...switchValue,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <Grid alignItems="center" justify="space-between">
      <GridItem xs={6}>
        <Breadcrumbs>
          <Link href="#">Breadcrumb 1</Link>
          <span>Current page</span>
        </Breadcrumbs>
      </GridItem>

      <GridItem xs={10}>
        <Slider
          ticks
          min={0}
          max={9}
          step={1}
          value={sliderValue}
          onChange={setSliderValue}
        />
      </GridItem>

      <GridItem xs={16}>
        <Tabs value={tabsValue} onChange={setTabsValue}>
          <Tab header="Tab 1" value={1} />
          <Tab header="Tab 2" value={2} />
          <Tab header="Tab 3" value={3} />
        </Tabs>
      </GridItem>

      <GridItem xs={5}>
        <RadioGroup
          label="Label"
          direction="vertical"
          value={radioValue}
          onChange={setRadioValue}
        >
          <LabelControl value="1" control={<Radio />} label="Radio label 1" />
          <LabelControl value="2" control={<Radio />} label="Radio label 2" />
          <LabelControl value="3" control={<Radio />} label="Radio label 3" />
        </RadioGroup>
      </GridItem>

      <GridItem xs={5}>
        <CheckboxGroup
          label="Label"
          value={checkboxValue}
          direction="vertical"
          onChange={(e, value) => setCheckboxValue(value)}
        >
          <LabelControl
            name="1"
            control={<Checkbox />}
            label="Checkbox label 1"
          />
          <LabelControl
            name="2"
            control={<Checkbox />}
            label="Checkbox label 2"
          />
          <LabelControl
            name="3"
            control={<Checkbox />}
            label="Checkbox label 3"
          />
        </CheckboxGroup>
      </GridItem>

      <GridItem xs={5}>
        <LabelControl
          style={{ marginTop: 5 }}
          name="first"
          checked={switchValue.first}
          control={<Switch />}
          label="Switch label 1"
          onChange={handleSwitchChange}
        />

        <LabelControl
          style={{ marginTop: 20 }}
          name="second"
          checked={switchValue.second}
          control={<Switch />}
          label="Switch label 2"
          onChange={handleSwitchChange}
        />
      </GridItem>

      <GridItem xs={8} style={{ margin: '20px 0' }}>
        <Button size="lg">Button</Button>
        <Button kind="outlined" style={{ margin: '0 10px' }}>
          Button
        </Button>
        <Button kind="ghost">Button</Button>
      </GridItem>

      <GridItem xs={8} style={{ margin: '20px 0' }}>
        <ButtonGroup
          value={buttonGroupValue}
          onChange={(e, value) => setButtonGroupValue(value as string)}
        >
          <Button name="1">Button</Button>
          <Button name="2">Button</Button>
          <Button name="3">Button</Button>
        </ButtonGroup>
      </GridItem>

      <GridItem xs={8}>
        <Input
          label="Label"
          placeholder="Placeholder text"
          value={inputValue}
          onChange={setInputValue}
        />
      </GridItem>

      <GridItem xs={8}>
        <Select
          label="Label"
          options={[
            { value: '', label: 'Choose an option' },
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
          value={selectValue}
          onChange={setSelectValue}
        />
      </GridItem>
    </Grid>
  )
}

const theme = createTheme({
  sys: {
    shape: {
      borderRadiusMd: light.ref.radius.lg,
    },
    color: {
      primaryAlpha: light.ref.palette.pink50,
      primaryBeta: light.ref.palette.pink40,
      primaryGamma: light.ref.palette.pink30,

      secondaryAlpha: light.ref.palette.fuchsia20,
      secondaryBeta: light.ref.palette.fuchsia30,
      secondaryGamma: light.ref.palette.fuchsia40,
    },
    typography: {
      bodyMd: {
        fontSize: 20,
      },
    },
  },
  comp: {
    backwardCompatibilityMode: false,
    button: {
      //цвета
      colorBackgroundContainedPrimary: light.ref.palette.green50,
      colorBackgroundContainedPrimaryHover: light.ref.palette.green40,
      colorBackgroundContainedPrimaryActive: light.ref.palette.green30,

      //скругления
      shapeBorderRadiusTopLeftLg: light.ref.radius.circle,
      shapeBorderRadiusTopRightLg: light.ref.radius.none,
      shapeBorderRadiusBottomLeftLg: light.ref.radius.none,
      shapeBorderRadiusBottomRightLg: light.ref.radius.circle,

      //типографика
      typographyFontFamily: light.ref.typography.fontFamily.code,
      typographyLetterSpacing: 2,
    },
  },
})

export function CustomizedTokensExample() {
  return (
    <ThemeProvider theme={theme}>
      <TokensExample />
    </ThemeProvider>
  )
}
