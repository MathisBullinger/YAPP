import React from 'react'
import styled from 'styled-components'
import { Switch } from '~/components/atoms'
import { connect } from 'react-redux'
import { toggleDarkMode, manualDarkmode } from '~/store/actions'
import { responsive } from '~/styles'
import { Themes } from '~/styles/theme'

interface Props {
  toggleDarkMode: typeof toggleDarkMode
  manualDarkmode: typeof manualDarkmode
  theme: {
    current: Themes
  }
}

interface State {
  value: boolean
}

class DarkmodeSwitch extends React.Component<Props, State> {
  state = {
    value: false,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <S.Wrap className="darkmode-switch">
        <Switch
          inset
          value={this.state.value ? 'on' : 'off'}
          onInput={v => this.toggleDarkMode(v)}
        />
      </S.Wrap>
    )
  }

  toggleDarkMode(v: boolean) {
    this.props.manualDarkmode()
    this.props.toggleDarkMode(v)
  }

  static getDerivedStateFromProps(props) {
    return {
      value: props.theme.current !== 'light',
    }
  }
}
export default connect(
  ({ theme }: any) => ({ theme }),
  { toggleDarkMode, manualDarkmode }
)(DarkmodeSwitch)

namespace S {
  export const Wrap = styled.div`
    position: absolute;
    bottom: 1.5rem;
    display: none;

    @media ${() => responsive.navOnSide} {
      display: initial;

      div[data-value='on'].inset {
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant)
            .on('')
            .substring(0, 7)}88;
      }
    }
  `
}
