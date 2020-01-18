import React from 'react'
import styled from 'styled-components'
import { EpisodeStrip } from '~/components/molecules'
import { responsive } from '~/styles'

interface Props {
  episodes: Episode[]
  handleOpen(id: string): void
}

export default function EpisodeList(props: Props) {
  return (
    <S.List>
      {props.episodes
        .sort((a, b) => b.date - a.date)
        .map((episode, i) => (
          <EpisodeStrip
            key={episode.title + episode.file}
            episode={episode}
            handleOpen={props.handleOpen}
            i={i}
          />
        ))}
    </S.List>
  )
}

const S = {
  List: styled.ol`
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto auto;
    --episode-height: 4rem;
    grid-auto-rows: var(--episode-height);
    align-items: center;
    grid-column-gap: 5vw;
    margin-bottom: -1rem;

    @media ${responsive.navOnBottom} {
      grid-template-columns: 1fr auto;
      grid-auto-rows: 1.75rem 2.5rem 1.75rem;
      --episode-height: 6rem;
    }
  `,
}
