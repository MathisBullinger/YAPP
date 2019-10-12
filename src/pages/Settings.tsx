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
  manualDarkmode,
  toggleDarkUseSystem,
} from '~/store/actions'
import State from '~/store/state'
import { responsive } from '~/styles'

interface Props {
  theme: State['theme']
  toggleDarkMode(v?: boolean): void
  togglePreferAmoled(v?: boolean): void
  toggleDarkAtNight(v?: boolean): void
  toggleDarkUseSystem(v?: boolean): void
  manualDarkmode: typeof manualDarkmode
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
                  onInput={v =>
                    void (this.props.toggleDarkMode(v),
                    this.props.manualDarkmode())
                  }
                />,
                <SwitchItem
                  text="use AMOLED dark mode"
                  key="amoled"
                  name="amoled"
                  value={this.props.theme.useAmoled}
                  onInput={v => this.props.togglePreferAmoled(v)}
                />,
                <SwitchItem
                  text="use system preference"
                  key="system"
                  name="system"
                  value={this.props.theme.useSystem}
                  onInput={v => this.props.toggleDarkUseSystem(v)}
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
  hideAppbarOnScroll: true,
}
export default connect(
  ({ theme }: any) => ({ theme }),
  {
    toggleDarkMode,
    togglePreferAmoled,
    toggleDarkAtNight,
    manualDarkmode,
    toggleDarkUseSystem,
  }
)(Settings)

const S = {
  Settings: styled.div`
    @media ${responsive.navOnSide} {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  `,
}
