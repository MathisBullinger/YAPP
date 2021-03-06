import React from 'react'
import styled from 'styled-components'
import { shadow, responsive } from '~/styles'
import Picture from './Picture'

interface Props {
  podcast: Podcast
  onClick(id: string): void
  size: number
  onImgLoaded?: (id: string) => void
  preLoad: boolean
}

export default function Podcast({
  podcast,
  onClick,
  size,
  onImgLoaded,
  preLoad,
}: Props) {
  return (
    <S.Podcast onClick={() => onClick(podcast?.id)} data-size={size}>
      <Picture
        imgs={podcast?.artworks}
        size={size * devicePixelRatio}
        alt={podcast?.name}
        onLoaded={() => onImgLoaded && onImgLoaded(podcast.id)}
        lazy={!preLoad}
      />
    </S.Podcast>
  )
}

const S = {
  Podcast: styled.div`
    position: relative;
    display: block;
    cursor: pointer;
    overflow: hidden;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    width: ${props => props['data-size']}px;
    height: ${props => props['data-size']}px;

    @media ${responsive.navOnSide} {
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on('')
          .substring(0, 7)}0a;
      border: none;
      border-radius: 0.25rem;
      box-shadow: ${shadow(0.5)};

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
