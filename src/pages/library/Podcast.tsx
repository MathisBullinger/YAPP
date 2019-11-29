import React from 'react'
import styled from 'styled-components'
import { Artwork, Text } from '~/components/atoms'
import { shadow } from '~/styles'

interface Props {
  podcast: Podcast
  method: State['platform']['input']
  isSpaced: boolean
  steps: { size: string; query?: string }[]
  onClick(id: string): void
}

export default function Podcast(props: Props) {
  const img = props.podcast ? props.podcast.artworks : []
  return (
    <S.Podcast onClick={() => props.onClick(props.podcast?.itunesId)}>
      {img.length > 0 && <Artwork lazy imgs={img} size={props.steps} />}
      {img.length === 0 && props.podcast && (
        <Text emp="disabled">{props.podcast.name}</Text>
      )}
    </S.Podcast>
  )
}

const S = {
  Podcast: styled.div`
    position: relative;
    display: block;
    padding-bottom: 100%;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.15s ease;
    margin: 0.5rem;

    @media (min-width: 600px) and (orientation: landscape) {
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on('')
          .substring(0, 7)}0a;
      border: none;
      border-radius: 0.25rem;

      &:hover {
        box-shadow: ${shadow(1.5)};
        transform: scale(1.05);

        img {
          filter: saturate(1.4);
        }
      }
    }

    * {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  `,
}
