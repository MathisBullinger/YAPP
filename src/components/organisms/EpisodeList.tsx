import React from 'react'
import styled from 'styled-components'
import { Episode } from '~/store/state'
import { EpisodeStrip } from '~/components/molecules'

interface Props {
  episodes: Episode[]
}

export default function EpisodeList(props: Props) {
  return (
    <S.List>
      {props.episodes.map(episode => (
        <EpisodeStrip key={episode.title} episode={episode} />
      ))}
    </S.List>
  )
}

const S = {
  List: styled.ol`
    margin-bottom: -1rem;
  `,
}
