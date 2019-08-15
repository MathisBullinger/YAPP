import React from 'react'
import { Text } from '~/components/atoms'

interface Props {
  name: string
  text: string
  action: JSX.Element
}

const Item: React.FunctionComponent<Props> = props => (
  <div>
    <Text>{props.text}</Text>
    {props.action}
  </div>
)
export default Item
