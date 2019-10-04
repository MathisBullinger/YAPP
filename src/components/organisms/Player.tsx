import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, responsive, timing } from '~/styles'
import State from '~/store/state'
import { useMatchMedia } from '~/utils/hooks'
import { togglePlayerVisible } from '~/store/actions'
import Audio from '~/systems/audio'
import { register, send } from '~/systems'
import PlayButton from './player/PlayButton'
import ControlButton from './player/ControlButton'
import Volume from './player/Volume'
import Progress from './player/Progress'

const alwaysVisible = true

export default function Player() {
  const dispatch = useDispatch()
  let visible = useSelector((state: State) => state.player.visible)
  const current = useSelector((state: State) => state.player.currentEpisode)
  const navOnSide = useMatchMedia(responsive.navOnSide)
  const audioRef = useRef(null)

  if (alwaysVisible && !visible) dispatch(togglePlayerVisible(true))

  useEffect(() => {
    register(new Audio())
  }, [])

  const audioEl = audioRef.current
  useEffect(() => {
    if (!audioEl) return
    send('audio', 'connect', audioEl)
    return () => send('audio', 'disconnect')
  }, [audioEl])

  if (!alwaysVisible)
    if (!!current !== visible) dispatch(togglePlayerVisible(!!current))

  return (
    <ThemeProvider theme={{ topic: 'surface', variant: navOnSide ? 1 : 0 }}>
      <S.Player hidden={!visible}>
        <audio ref={audioRef} crossOrigin="anonymous" preload="auto" />
        <div className="left" />
        <div className="center">
          <div className="ctrlBtGroup">
            <ControlButton
              label="jump backward"
              icon="jumpBack"
              handleClick={() => send('audio', 'jump', 'backward')}
            />
            <PlayButton />
            <ControlButton
              label="jump forward"
              icon="jumpForward"
              handleClick={() => send('audio', 'jump', 'forward')}
            />
          </div>
          <Progress />
        </div>
        <div className="right">
          <Volume handleChange={v => send('audio', 'setVolume', v)} />
        </div>
      </S.Player>
    </ThemeProvider>
  )
}

const S = {
  Player: styled.div`
    display: ${({ hidden }) => (hidden ? 'hidden' : 'flex')};
    justify-content: space-between;
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
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    @media ${responsive.navOnSide} {
      bottom: 0;
      height: ${layout.desktop.playerHeight};
      z-index: 2100;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-content: center;
    }

    .left, .right {
      width: 200px;
      flex-shrink: 0;
    }

    .center {
      flex-grow: 1;
      margin-left: 1rem;
      margin-right: 1rem;
      max-width: 750px;

      .ctrlBtGroup {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  `,
}
