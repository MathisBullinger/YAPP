import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Mask from './Mask'
import State from '~/store/state'
import { useMatchMedia } from '~/utils/hooks'
import { Artwork } from '~/components/atoms'

interface Props {
  cl: number
  itunesId: string
}

export default function Podcast(props: Props) {
  const method = useSelector((state: State) => state.interaction.method)
  const isSpaced = useMatchMedia(
    '(min-width: 600px) and (orientation: landscape)'
  )

  const podcast = useSelector(
    (state: State) => state.podcasts.byId[props.itunesId]
  )

  const img = podcast && podcast.artworks

  return (
    <S.Podcast data-cl={props.cl}>
      {img && <Artwork artworks={img} size={13} />}
      {method === 'mouse' && isSpaced && <Mask />}
    </S.Podcast>
  )
}

const S = {
  Podcast: styled.div`
    position: relative;
    display: block;
    background-color: ${props =>
      '#' + (props['data-cl'] * 255).toString(16)[0].repeat(6)};
    padding-bottom: 100%;

    @media (min-width: 600px) and (orientation: landscape) {
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on('')
          .substring(0, 7)}0a;
    }

    * {
      position: absolute;
      left: 0;
      top: 0;
      max-width: 100%;
      max-height: 100%;
    }
  `,
}
