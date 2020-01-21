import React from 'react'
import styled from 'styled-components'
import { Text, Artwork } from '~/components/atoms'
import { Link } from 'react-router-dom'

export default function Result(props: Podcast) {
  return (
    <S.Result to={`/podcast/${props.id}`}>
      <Artwork size="3.5rem" imgs={props.artworks} />
      <div>
        <Text emp="high">{props.name}</Text>
        <Text emp="medium">{props.creator}</Text>
      </div>
    </S.Result>
  )
}

namespace S {
  const ResultBase = styled(Link)`
    display: flex;
    flex-direction: row;
    height: 3.5rem;
    align-items: center;
    text-decoration: none;

    * {
      margin: 0;
    }

    div {
      height: 3rem;
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    img {
      border-radius: 0.25rem;
      width: 3.5rem;
    }
  `

  export const Result = styled(ResultBase)`
    ${ResultBase} ~ & {
      margin-top: 1rem;
    }
  `
}
