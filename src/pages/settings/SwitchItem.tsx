import React from 'react'
import { Switch } from '~/components/atoms'
import Item from './Item'

interface Props {
  name: string
  text: string
  value: boolean
  onInput(v: boolean): void
}

const SwitchItem: React.FunctionComponent<Props> = ({
  name,
  value,
  text,
  onInput,
}) => (
  <Item
    name={name}
    text={text}
    action={<Switch id={name} value={value ? 'on' : 'off'} onInput={onInput} />}
  />
)
export default SwitchItem
