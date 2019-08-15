import React from 'react'
import styled from 'styled-components'
import { Switch } from '~/components/atoms'
import { connect } from 'react-redux'
import { toggleDarkMode } from '~/store/actions'
import { responsive } from '~/styles'

interface Props {
  toggleDarkMode(value?: boolean): void
  theme: string
}

class DarkmodeSwitch extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <S.Wrap className="darkmode-switch">
        <Switch
          inset
          value={this.props.theme === 'dark' ? 'on' : 'off'}
          onInput={v => this.toggleDarkMode(v)}
        />
      </S.Wrap>
    )
  }

  toggleDarkMode(v: boolean) {
    this.props.toggleDarkMode(v)
  }
}
export default connect(
  ({ theme }) => ({ theme }),
  { toggleDarkMode }
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
