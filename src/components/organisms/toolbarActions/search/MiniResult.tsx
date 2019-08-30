import React from 'react'
import styled from 'styled-components'
import { shadow } from '~/styles'
import { PodcastStrip } from '~/components/molecules'

interface Podcast {
  name: string
  creator: string
  artworks: { url: string; size: number }[]
}

interface Props {
  podcasts: Podcast[]
}

export default function MiniResult({ podcasts }: Props) {
  return (
    <S.Result>
      {podcasts.map(podcast => (
        <PodcastStrip key={podcast.name + podcast.creator} {...podcast} />
      ))}
    </S.Result>
  )
}

namespace S {
  export const Result = styled.output`
    position: absolute;
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 0.25rem;
    top: calc(100% + 0.5rem);
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    box-shadow: ${shadow(0.4)};
    padding: 1rem;
    max-height: 70vh;
    overflow-y: auto;
  `
}
