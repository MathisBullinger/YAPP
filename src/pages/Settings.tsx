import React from 'react'
import { connect } from 'react-redux'
import { Text, Switch } from '~/components/atoms'
import { StackedList } from '~/components/molecules'
import styled from 'styled-components'
import Item from './settings/Item'
import { toggleDarkMode, togglePreferAmoled } from '~/store/actions'
import { Themes } from '~/styles/theme'

interface Props {
  theme: {
    current: Themes
    useAmoled: boolean
  }
  toggleDarkMode(v?: boolean): void
  togglePreferAmoled(v?: boolean): void
}

class Settings extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <S.Settings>
        <StackedList
          sections={[
            {
              title: 'Appearance',
              items: [
                <Item
                  key="dark"
                  name="darkmode"
                  text="dark mode"
                  action={
                    <Switch
                      id="darkmode"
                      value={
                        this.props.theme.current !== 'light' ? 'on' : 'off'
                      }
                      onInput={v => this.props.toggleDarkMode(v)}
                    />
                  }
                />,
                <Item
                  key="amoled"
                  name="amoled"
                  text="use AMOLED dark mode"
                  action={
                    <Switch
                      id="amoled"
                      value={this.props.theme.useAmoled ? 'on' : 'off'}
                      onInput={v => this.props.togglePreferAmoled(v)}
                    />
                  }
                />,
              ],
            },
            {
              title: 'Playback',
              items: Array(100)
                .fill(0)
                .map((_, i) => <Text key={`item2${i}`}>item {i}</Text>),
            },
          ]}
        />
      </S.Settings>
    )
  }
}
export default connect(
  ({ theme }) => ({ theme }),
  { toggleDarkMode, togglePreferAmoled }
)(Settings)

namespace S {
  export const Settings = styled.div``
}
