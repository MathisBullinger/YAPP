import React from 'react'
import styled from 'styled-components'
import { Text } from '~/components/atoms'

interface Props {
  name: string
  creator: string
  artworks: { url: string; size: number }[]
}

export default function Result(props: Props) {
  return (
    <S.Result>
      <img src={props.artworks.length && props.artworks[0].url} />
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
