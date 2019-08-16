import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, responsive } from '~/styles'

export default class Appbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ThemeProvider theme={{ topic: 'surface' }}>
        <S.Appbar />
      </ThemeProvider>
    )
  }
}

namespace S {
  export const Appbar = styled.div`
    z-index: 2000;
    position: relative;
    display: none;
    box-sizing: border-box;
    top: 0;
    width: 100vw;
    height: ${() => layout.mobile.appbarHeight};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(4)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};

    @media ${() => responsive.appbarVisible} {
      display: block;
    }
  `
}
