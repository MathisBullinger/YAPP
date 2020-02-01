import React from 'react'
import styled from 'styled-components'
import { Text } from '~/components/atoms'
import InlinePlayButton from '~/components/molecules/InlinePlayButton'
import { responsive, layout } from '~/styles'
import { useSelector, useMatchMedia } from '~/utils/hooks'
import audio from '~/systems/audio'
import { Link } from 'react-router-dom'

interface Props {
  episode: Episode
  i: number
}

const formatDate = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
}).format

export default function EpisodeStrip({ episode, i }: Props) {
  const player = useSelector(state => state.player)
  const playing = player.state === 'playing' || player.state === 'waiting'
  const selected = player.currentEpisode === episode.id
  const length = useSelector(state => state.player.length)
  const progress = useSelector(state => state.player.progress)
  const isDesktop = useMatchMedia(responsive.navOnSide)
  const [pId, eId] = episode.id.split(' ')

  const Date = (
    <Text emp="medium" small={!isDesktop}>
      {formatDate(episode.date)}
    </Text>
  )
  return (
    <S.Episode>
      {!isDesktop && Date}
      <Text emp="high">{episode.title || 'no title available'}</Text>
      {isDesktop && Date}
      <InlinePlayButton
        playing={selected && playing}
        progress={selected ? (progress || 0) / (length || Infinity) : 0}
        onClick={audio.toggle(episode.id)}
      />
      {!isDesktop && <Text />}
      <S.Box to={`/podcast/${pId}/${eId.replace(/^ep_(.+)/, '$1')}`} i={i} />
    </S.Episode>
  )
}

const S = {
  Episode: styled.li`
    display: contents;

    &:first-child > ${() => S._box} {
      border-top: 1px solid
        ${({ theme }) =>
          theme[theme.topic](theme.variant)
            .on()
            .substring(0, 7)}22;
    }

    @media ${responsive.navOnBottom} {
      & > *:not(${InlinePlayButton.sc}) {
        grid-column: 1;
      }

      & > ${Text.sc}:first-child {
        align-self: flex-end;
      }

      & > ${Text.sc} {
        margin: 0;
        line-height: 1.2em;
      }
    }
  `,

  Box: styled(Link).attrs((props: any) => ({
    style: { top: `calc(${props.i} * var(--episode-height))` },
  }))`
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: var(--episode-height);

    border-bottom: 1px solid
      ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on()
          .substring(0, 7)}22;

    @media ${responsive.navOnBottom} {
      margin-left: -${layout.page.padding};
      width: calc(100% + 2 * ${layout.page.padding});
    }
  `,

  get _box() {
    return this.Box
  },
}
