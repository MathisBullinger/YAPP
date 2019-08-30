import React from 'react'
import styled from 'styled-components'
import { Text } from '~/components/atoms'
import { Rem } from '~/utils/css'

interface Props {
  name: string
  creator: string
  artworks: { url: string; size: number }[]
}

export default function Result(props: Props) {
  const imgSize = new Rem(1).toPx().value * 3.5

  let thumbnail = null
  if (props.artworks) {
    let thumbSize = Math.min(
      ...props.artworks.filter(a => a.size >= imgSize).map(a => a.size)
    )
    if (thumbSize === Infinity)
      thumbSize = Math.max(...props.artworks.map(a => a.size))
    thumbnail = props.artworks.find(a => a.size === thumbSize).url
  }

  return (
    <S.Result>
      <img src={thumbnail} />
      <div>
        <Text emp="high">{props.name}</Text>
        <Text emp="medium">{props.creator}</Text>
      </div>
    </S.Result>
  )
}

namespace S {
  const ResultBase = styled.div`
    display: flex;
    flex-direction: row;
    height: 3.5rem;
    align-items: center;

    * {
      margin: 0;
    }

    img {
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 0.25rem;
    }

    div {
      height: 3rem;
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  `

  export const Result = styled(ResultBase)`
    ${ResultBase} ~ & {
      margin-top: 1rem;
    }
  `
}
