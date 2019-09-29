import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, responsive, timing } from '~/styles'
import { useSelector, useDispatch } from 'react-redux'
import State from '~/store/state'
import { togglePlaying } from '~/store/actions'
import PlayButton from './player/PlayButton'
import { useMatchMedia } from '~/utils/hooks'

export default function Player() {
  const visible = useSelector((state: State) => state.player.visible)
  const dispatch = useDispatch()
  const navOnSide = useMatchMedia(responsive.navOnSide)

  function pause() {
    dispatch(togglePlaying(false))
  }

  function play() {
    dispatch(togglePlaying(true))
  }

  return (
    <ThemeProvider theme={{ topic: 'surface', variant: navOnSide ? 1 : 0 }}>
      {visible && (
        <S.Player>
          <PlayButton togglePlayer={v => (v ? play() : pause())} />
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
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(2)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    transition: background-color ${() => timing.colorSwap};

    @media ${responsive.navOnSide} {
      bottom: 0;
      height: ${layout.desktop.playerHeight};
      z-index: 2100;
    }
  `,
}
