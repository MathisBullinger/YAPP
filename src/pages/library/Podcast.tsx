import React from 'react'
import styled from 'styled-components'
import Mask from './Mask'
import { Artwork, Text } from '~/components/atoms'

interface Props {
  podcast: Podcast
  method: State['interaction']['method']
  isSpaced: boolean
  steps: { size: string; query?: string }[]
  onClick(id: string): void
}

export default function Podcast(props: Props) {
  const img = props.podcast ? props.podcast.artworks : []
  return (
    <S.Podcast onClick={() => props.onClick(props.podcast?.itunesId)}>
      {img.length > 0 && <Artwork lazy imgs={img} size={props.steps} />}
      {props.method === 'mouse' && props.isSpaced && <Mask />}
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

    @media (min-width: 600px) and (orientation: landscape) {
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on('')
          .substring(0, 7)}0a;
      border: none;
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
