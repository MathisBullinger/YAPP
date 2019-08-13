import React from 'react'
import { Title, Switch } from '~/components/atoms'
import { Labeled } from '~/components/molecules'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Title>Profile</Title>
        <Labeled for={<Switch onInput={v => this.toggleDarkMode(v)} />}>
          Dark mode
        </Labeled>
      </div>
    )
  }

  toggleDarkMode(v) {
    console.log(v)
  }
}
