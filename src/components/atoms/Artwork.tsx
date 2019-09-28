import React from 'react'
import styled from 'styled-components'
import { Artwork as Img } from '~/store/state'
import { Rem } from '~/utils/css'

interface Props {
  artworks: Img[]
  size: number
}

export default function Artwork(props: Props) {
  const artworks = getArtwork(props.artworks, new Rem(props.size))

  return (
    <S.Artwork data-size={props.size}>
      {artworks
        .map(img => (
          <source srcSet={img.url} type={`image/${img.type}`} key={img.url} />
        ))
        .sort(({ type }) => (type === 'webp' ? 1 : -1))}
      <img src={artworks.length && artworks[0].url} />
    </S.Artwork>
  )
}

function getArtwork(artworks: Img[], sizeRem: Rem): Img[] {
  if (!artworks || !artworks.length) return []
  if (!artworks.find(({ size }) => size)) return artworks
  const imgSize = sizeRem.toPx().value
  let img = artworks[0]
  for (const art of artworks) {
    if (img.size === imgSize) break
    if (img.size < imgSize) {
      if (art.size > img.size) img = art
    } else if (art.size < img.size && art.size >= imgSize) img = art
  }
  return artworks.filter(art => art.size === img.size)
}

const S = {
  Artwork: styled.picture`
    width: ${props => props['data-size']}rem;
    height: ${props => props['data-size']}rem;

    img {
      width: 100%;
      height: 100%;
    }
  `,
}
