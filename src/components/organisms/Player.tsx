import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, responsive, timing } from '~/styles'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import PlayButton from './player/PlayButton'

export default function Player() {
  const active = useSelector((state: State) => state.player.active)

  return (
    <ThemeProvider theme={{ topic: 'surface' }}>
      {active && (
        <S.Player>
          <PlayButton playing={true} />
        </S.Player>
      )}
    </ThemeProvider>
  )
}

const S = {
  Player: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1900;
    position: fixed;
    bottom: ${layout.mobile.navHeight};
    width: 100vw;
    height: ${layout.mobile.playerHeight};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(0.8)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};
    transition: background-color ${() => timing.colorSwap};

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
