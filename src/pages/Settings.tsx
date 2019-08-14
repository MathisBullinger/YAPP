import React from 'React'
import { Title, Dropdown } from '~/components/atoms'
import { Labeled } from '~/components/molecules'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Title s4>Appearance</Title>
        <Labeled for={<Dropdown items={['dark', 'black']} />}>
          preferred darkmode
        </Labeled>
      </div>
    )
  }
}
