import React from 'react'
import { Title, Switch } from '~/components/atoms'
import { Labeled } from '~/components/molecules'
import { connect } from 'react-redux'
import { toggleDarkMode } from '~/store/actions'

interface Props {
  toggleDarkMode(value?: boolean): void
  theme: string
}

class Profile extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Title>Profile</Title>
        <Labeled
          for={
            <Switch
              value={this.props.theme === 'dark' ? 'on' : 'off'}
              onInput={v => this.toggleDarkMode(v)}
            />
          }
        >
          Dark mode
        </Labeled>
        <Switch />
      </div>
    )
  }

  toggleDarkMode(v: boolean) {
    this.props.toggleDarkMode(v)
  }
}

export default connect(
  ({ theme }) => ({ theme }),
  { toggleDarkMode }
)(Profile)
