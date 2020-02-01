import React from 'react'
import styled from 'styled-components'
import { Text, Artwork } from '~/components/atoms'
import { Link } from 'react-router-dom'

export default function Result(props: Podcast) {
  return (
    <S.Result to={`/podcast/${props.id}`}>
      <Artwork size="3.5rem" imgs={props.artworks} />
      <S.TextSection>
        <Text emp="high">{props.name}</Text>
        <Text emp="medium">{props.creator}</Text>
      </S.TextSection>
    </S.Result>
  )
}

const S = {
  Result: styled(Link)`
    height: 3.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;

    img {
      border-radius: 0.25rem;
      width: 3.5rem;
    }

    ${() => S.Result} ~ & {
      margin-top: 1rem;
    }
  `,

  TextSection: styled.div`
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 1rem;

    & > * {
      margin: 0;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `,
}
