import React from 'react'
import styled from 'styled-components'
import { Artwork as Img } from '~/store/state'
import { css } from '~/utils'

interface Props {
  imgs: Img[]
  size: string | { size: string; min?: string; max?: string; query?: string }[]
  lazy?: boolean
}

function Artwork({ imgs, size, lazy }: Props) {
  let pics = []
  if (typeof imgs === 'object' && Object.entries(imgs).length) {
    const sizes = typeof size === 'string' ? [{ size }] : size
    pics = sizes.flatMap(({ size, min, max, query }) => {
      const media = query
        ? query
        : [
            ...(min ? [['min', css.parseSize(min)]] : []),
            ...(max ? [['max', css.parseSize(max)]] : []),
          ]
            .map(([t, s]) => `(${t}-width: ${s}px)`)
            .join(' and ')

      return getOptimal(css.parseSize(size), imgs).map((url, i) => ({
        url,
        media,
        type: i === 0 ? 'jpeg' : 'webp',
      }))
    })
  } else pics.push({ url: imgs })

  const fallback = imgs?.find(({ size, type }) => !size && !type)

  return (
    <S.Artwork>
      <picture>
        {pics.map(({ url, type, media }, i) => (
          <source srcSet={url} type={`image/${type}`} media={media} key={i} />
        ))}
        <img
          src={fallback?.url}
          alt={name}
          {...(lazy && { loading: 'lazy' })}
        />
      </picture>
    </S.Artwork>
  )
}

function getOptimal(pxSize, imgs) {
  let available: number[] = Array.from(
    new Set(imgs.map(({ size }) => parseInt(size, 10) || Infinity))
  )
  let size = Math.min(...available.filter(n => n >= pxSize))
  if (size === Infinity) size = Math.max(...available.filter(n => n < pxSize))
  if (size < pxSize && available.includes(Infinity)) size = Infinity
  const selected = imgs.filter(
    ({ size: imgSize }) => (size !== Infinity ? size : 'max') === imgSize
  )
  return [
    selected.find(({ type }) => type === 'webp'),
    selected.find(({ type }) => type !== 'webp'),
  ].map(img => img?.url)
}

const S = {
  Artwork: styled.picture`
    display: contents;
  `,
}
export default Object.assign(Artwork, { sc: S.Artwork })
