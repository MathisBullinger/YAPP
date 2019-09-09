import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { shadow } from '~/styles'
import { PodcastStrip } from '~/components/molecules'

interface Props {
  podcasts: any[]
}

export default function MiniResult({ podcasts }: Props) {
  return (
    <ThemeProvider theme={{ topic: 'surface' }}>
      <S.Result>
        {podcasts.map(podcast => (
          <PodcastStrip key={podcast.name + podcast.creator} {...podcast} />
        ))}
      </S.Result>
    </ThemeProvider>
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
