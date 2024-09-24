import * as React from 'react'
import {
  Box,
  Input,
  InputPassword,
  Checkbox,
  LabelControl,
  Grid,
  GridItem,
  Text,
  Button,
  Link,
  createUseStyles,
} from '@v-uik/base'

const useStyles = createUseStyles({
  gridItemLink: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 48,
  },
  formWrapper: {
    width: 434,
  },
})

export type BasicFormProps = {
  description?: string
}

export const BasicForm: React.FC<BasicFormProps> = ({ description }) => {
  const [checkboxValue, setCheckboxValue] = React.useState(false)

  const classes = useStyles()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked)
  }

  return (
    <Box
      noValidate
      as="form"
      className={classes.form}
      action=""
      onSubmit={handleSubmit}
    >
      <Box className={classes.formWrapper}>
        <Grid spacing={2}>
          <GridItem xs={16}>
            <Grid spacing={4} justify="center">
              <GridItem xs={16}>
                <Text as="h2" kind="titleLg">
                  ClickStream Demo
                </Text>
                <Text as="h3" kind="subtitle1">
                  {description || 'Click upon elements'}
                </Text>
              </GridItem>
              <GridItem xs={16}>
                <Input
                  fullWidth
                  label="Username"
                  placeholder="Enter your username"
                />
              </GridItem>
              <GridItem xs={16}>
                <InputPassword
                  fullWidth
                  inputProps={{ style: { letterSpacing: 'normal' } }}
                  label="Password"
                  placeholder="Enter your password"
                />
              </GridItem>
              <GridItem xs={16}>
                <LabelControl
                  label="Remember Me"
                  control={<Checkbox />}
                  checked={checkboxValue}
                  onChange={handleChangeCheckbox}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem xs={16}>
            <Grid spacing={2}>
              <GridItem xs={16}>
                <Button fullWidth type="submit">
                  Login
                </Button>
              </GridItem>
              <GridItem xs={16} className={classes.gridItemLink}>
                <Link>Need help?</Link>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}
