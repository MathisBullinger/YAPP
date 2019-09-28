import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, responsive } from '~/styles'

export default function Player() {
  return (
    <ThemeProvider theme={{ topic: 'surface' }}>
      <S.Player></S.Player>
    </ThemeProvider>
  )
}

const S = {
  Player: styled.div`
    display: block;
    z-index: 1900;
    position: fixed;
    bottom: ${layout.mobile.navHeight};
    width: 100vw;
    height: 4rem;
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(0.8)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};

    @media ${responsive.navOnSide} {
      bottom: 0;
      left: ${layout.desktop.navWidth};
      width: calc(100vw - ${layout.desktop.navWidth});
      height: 6rem;
    }

    @media ${responsive.navCollapsed} {
      left: ${layout.desktop.navWidthCollapsed};
      width: calc(100vw - ${layout.desktop.navWidthCollapsed});
    }
  `,
}
