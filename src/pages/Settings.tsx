import React from 'react'
import { connect } from 'react-redux'
import { Text } from '~/components/atoms'
import { StackedList } from '~/components/molecules'
import styled from 'styled-components'
import SwitchItem from './settings/SwitchItem'
import {
  toggleDarkMode,
  togglePreferAmoled,
  toggleDarkAtNight,
} from '~/store/actions'
import State from '~/store/state'

interface Props {
  theme: State['theme']
  toggleDarkMode(v?: boolean): void
  togglePreferAmoled(v?: boolean): void
  toggleDarkAtNight(v?: boolean): void
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
                <SwitchItem
                  text="dark mode"
                  key="darkmode"
                  name="darkmode"
                  value={this.props.theme.current !== 'light'}
                  onInput={v => this.props.toggleDarkMode(v)}
                />,
                <SwitchItem
                  text="use AMOLED dark mode"
                  key="amoled"
                  name="amoled"
                  value={this.props.theme.useAmoled}
                  onInput={v => this.props.togglePreferAmoled(v)}
                />,
                <SwitchItem
                  text="use dark mode at night"
                  key="night"
                  name="night"
                  value={this.props.theme.darkAtNight}
                  onInput={v => this.props.toggleDarkAtNight(v)}
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
// @ts-ignore
Settings.pageConf = {
  showAppbar: true,
  appbarTitle: 'Settings',
  appbarActions: [{ name: 'back', align: 'left' }],
  showToolbar: true,
  toolbarTitle: 'Settings',
}
export default connect(
  ({ theme }) => ({ theme }),
  { toggleDarkMode, togglePreferAmoled, toggleDarkAtNight }
)(Settings)

namespace S {
  export const Settings = styled.div``
}
