import React, { FunctionComponent } from 'react'

interface Props {
  onInput?(v: boolean): void
}

const Checkbox: FunctionComponent<Props> = props => (
  <input
    type="checkbox"
    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
      props.onInput && props.onInput(e.target.checked)
    }
  />
)
export default Checkbox
