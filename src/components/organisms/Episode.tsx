import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import State from '~/store/state'
import { responsive } from '~/styles'
import { IconButton } from '~/components/atoms'

interface Props {
  id: string
  close(): void
}

export default function Episode(props: Props) {
  const [pId, eId] = (props.id || '').split(' ')
  const episode = useSelector(
    (state: State) =>
      pId &&
      eId &&
      state.podcasts.byId[pId].episodes.find(({ id }) => id === `${pId} ${eId}`)
  )
  const [hidden, setHidden] = useState(true)

  if (!episode !== hidden) setHidden(!episode)

  return (
    <ThemeProvider theme={{ topic: 'surface' }}>
      <S.Episode data-hidden={hidden}>
        <IconButton icon="arrow_down" label="hide" onClick={props.close} />
      </S.Episode>
    </ThemeProvider>
  )
}

const S = {
  Episode: styled.div`
    position: absolute;
    z-index: 5000;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    padding: 1rem;

    transition: transform 0.5s ease-in-out;
    &[data-hidden='true'] {
      transform: translateX(-50%) translateY(100vh);
      transition: transform 0.5s ease-in-out, hidden 0.5s;
      display: hidden;
    }

    @media ${responsive.navOnSide} {
      transition: none;
      width: 500px;
      height: 500px;
      max-width: 100vw;
      max-height: 100vh;
      transform-style: preserve-3d;
      border-radius: 0.25rem;

      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 100vw;
        height: 100vh;
        transform: translateX(calc(-1rem - 50% + 250px))
          translateY(calc(-1rem - 50% + 250px)) translateZ(-1px);
        background-color: #0005;
        backdrop-filter: blur(1px);
      }

      &[data-hidden='true'] {
        transition: none;
      }
    }
  `,
}
