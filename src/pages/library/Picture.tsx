import React from 'react'
import styled from 'styled-components'

interface Props {
  imgs: Artwork[]
  size: Number
  alt: string
}

function Picture({ imgs, size, alt }: Props) {
  if (!(imgs && imgs.length)) return null

  const sizes = imgs
    .filter(({ type }) => type === 'jpeg')
    .map(({ size }) => size)

  const idealSize = Math.min(Infinity, ...sizes.filter(s => s >= size))

  return (
    <S.Picture>
      {...idealSize === Infinity
        ? []
        : ['webp', 'jpeg']
            .map(type =>
              imgs.find(img => img.size === idealSize && img.type === type)
            )
            .flatMap(img =>
              img
                ? [
                    <source
                      srcSet={img.url}
                      type={`image/${img.type}`}
                      key={img.type}
                    />,
                  ]
                : []
            )}
      <img
        src={(imgs?.find(({ size }) => !size) || { url: '' }).url}
        alt={alt}
        width={`${size}`}
        height={`${size}`}
        // @ts-ignore
        loading="lazy"
      />
    </S.Picture>
  )
}

const S = {
  Picture: styled.picture`
    display: contents;
  `,
}
export default Object.assign(Picture, { SC: S.Picture })
