import * as React from 'react'
import { Checkbox, CheckboxGroup, LabelControl } from '@v-uik/base'

interface Props {
  initPayments?: string[]
}

export const Indeterminate = ({ initPayments = [] }: Props): JSX.Element => {
  const payments = React.useMemo(() => ['debt', 'credit', 'cash'], [])
  const [activePayments, setActivePayments] =
    React.useState<typeof payments>(initPayments)

  const handleChangeGroup = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string[] | undefined
    ) => {
      setActivePayments(value ?? [])
    },
    []
  )

  const rootChecked = activePayments.length === payments.length
  const indeterminate =
    !!activePayments.length && activePayments.length < payments.length

  const handleChangeRoot = React.useCallback(() => {
    if (rootChecked) {
      setActivePayments([])
    } else {
      setActivePayments(payments)
    }
  }, [payments, rootChecked])

  return (
    <>
      <LabelControl
        style={{ marginBottom: 8 }}
        checked={rootChecked}
        control={<Checkbox indeterminate={indeterminate} />}
        label="Main label"
        onChange={handleChangeRoot}
      />

      <div style={{ marginLeft: '25px' }}>
        <CheckboxGroup
          value={activePayments}
          direction="vertical"
          onChange={handleChangeGroup}
        >
          <LabelControl
            name="debt"
            control={<Checkbox />}
            label="Checkbox label 1"
          />
          <LabelControl
            name="credit"
            control={<Checkbox />}
            label="Checkbox label 2"
          />
          <LabelControl
            name="cash"
            control={<Checkbox />}
            label="Checkbox label 3"
          />
        </CheckboxGroup>
      </div>
    </>
  )
}
