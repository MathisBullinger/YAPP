import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, responsive, timing } from '~/styles'

interface State {
  visible: boolean
}

export default class Appbar extends React.Component<{}, State> {
  state = {
    visible: true,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ThemeProvider theme={{ topic: 'surface', visible: this.state.visible }}>
        <S.Appbar />
      </ThemeProvider>
    )
  }
}

namespace S {
  export const Appbar = styled.div`
    z-index: 2000;
    position: fixed;
    display: none;
    width: 100vw;
    height: ${() => layout.mobile.appbarHeight};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(4)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};
    transition: background-color ${() => timing.colorSwap};

    @media ${() => responsive.appbarVisible} {
      display: block;
    }
  `
}
