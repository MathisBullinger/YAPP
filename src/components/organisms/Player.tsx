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

export default function Player() {
  const dispatch = useDispatch()
  const visible = useSelector((state: State) => state.player.visible)
  const current = useSelector((state: State) => state.player.currentEpisode)
  const navOnSide = useMatchMedia(responsive.navOnSide)
  const audioRef = useRef(null)

  useEffect(() => {
    register(new Audio(audioRef))
  }, [])

  if (!!current !== visible) dispatch(togglePlayerVisible(!!current))

  return (
    <ThemeProvider theme={{ topic: 'surface', variant: navOnSide ? 1 : 0 }}>
      <S.Player hidden={!visible}>
        <audio ref={audioRef} crossOrigin="anonymous" />
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
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }

    .left {
      margin-right: auto;
    }

    .right {
      margin-left: auto;
    }

    .left, .right {
      width: 200px;
    }

    .center {
      flex-grow: 1;
      margin-left: 2rem;
      margin-right: 2rem;

      .ctrlBtGroup {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }
    }
  `,
}
