import React from 'react'
import styled from 'styled-components'
import { EpisodeStrip } from '~/components/molecules'

interface Props {
  episodes: Episode[]
  handleOpen(id: string): void
}

export default function EpisodeList(props: Props) {
  return (
    <S.List>
      {props.episodes
        .sort((a, b) => b.date - a.date)
        .map(episode => (
          <EpisodeStrip
            key={episode.title + episode.file}
            episode={episode}
            handleOpen={props.handleOpen}
          />
        ))}
    </S.List>
  )
}

const S = {
  List: styled.ol`
    margin-bottom: -1rem;
  `,
}
