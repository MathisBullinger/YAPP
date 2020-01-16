import React from 'react'
import styled from 'styled-components'
import { Text } from '~/components/atoms'
import InlinePlayButton from '~/components/molecules/InlinePlayButton'
import { responsive, layout } from '~/styles'
import { useSelector } from '~/utils/hooks'
import audio from '~/systems/audio'

interface Props {
  episode: Episode
  handleOpen(id: string): void
  i: number
}

const formatDate = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
}).format

export default function EpisodeStrip(props: Props) {
  const player = useSelector(state => state.player)
  const playing = player.state === 'playing' || player.state === 'waiting'
  const selected = player.currentEpisode === props.episode.id
  const length = useSelector(state => state.player.length)
  const progress = useSelector(state => state.player.progress)

  return (
    <S.Episode onClick={() => props.handleOpen(props.episode.id)}>
      <Text emp="high">{props.episode.title || 'no title available'}</Text>
      <Text emp="medium">{formatDate(props.episode.date)}</Text>
      <InlinePlayButton
        playing={selected && playing}
        progress={selected ? (progress || 0) / (length || Infinity) : 0}
        onClick={audio.toggle(props.episode.id)}
      />
      <S.Box i={props.i} />
    </S.Episode>
  )
}

const S = {
  Episode: styled.li`
    display: contents;

    & > ${Text.sc}:first-child {
      margin-right: auto;
    }

    &:first-child > ${() => S._box} {
      border-top: 1px solid
        ${({ theme }) =>
          theme[theme.topic](theme.variant)
            .on()
            .substring(0, 7)}22;
    }
  `,

  Box: styled.div`
    display: block;
    position: absolute;
    left: 0;
    top: calc(${props => props['i']} * var(--episode-height));
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
