import React, { FunctionComponent } from 'react'

interface Props {
  onInput(v: boolean): void
}

const Checkbox: FunctionComponent<Props> = props => (
  <input
    type="checkbox"
    onInput={e => props.onInput(e.currentTarget.checked)}
  />
)
export default Checkbox
