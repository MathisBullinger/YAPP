import React from 'react'
import styled from 'styled-components'
import State, { Episode } from '~/store/state'
import { Text } from '~/components/atoms'
import { InlinePlayButton } from '.'
import { responsive } from '~/styles'
import { useSelector } from 'react-redux'
import { send } from '~/systems'

interface Props {
  episode: Episode
}

export default function EpisodeStrip(props: Props) {
  const player = useSelector((state: State) => state.player)

  function togglePlay() {
    if (player.currentEpisode !== props.episode.id)
      send('audio', 'play', props.episode.id)
    else send('audio', player.playing ? 'pause' : 'resume')
  }

  return (
    <S.Episode>
      <Text emp="high">{props.episode.title || 'no title available'}</Text>
      <InlinePlayButton
        playing={player.currentEpisode === props.episode.id && player.playing}
        progress={Math.random()}
        onClick={togglePlay}
      />
    </S.Episode>
  )
}

const S = {
  Episode: styled.li`
    height: 4rem;
    display: flex;
    align-items: center;
    margin-left: -2rem;
    margin-right: -2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    justify-content: space-between;

    & > * {
      margin: 0;
    }

    border-top: 1px solid
      ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on()
          .substring(0, 7)}22;
    border-bottom: 1px solid
      ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on()
          .substring(0, 7)}22;

    ${() => S.horrendousSelfSelector} + & {
      border-top: none;
    }

    @media ${responsive.navOnSide} {
      margin: 0;
      padding: 0;
    }
  `,

  get horrendousSelfSelector() {
    return this.Episode
  },
}