import React from 'react'
import styled from 'styled-components'
import { Text, Artwork } from '~/components/atoms'
import { Link } from 'react-router-dom'
import Subscribe from './Subscribe'

export default function Result(props: Podcast) {
  return (
    <S.Result>
      <Link to={`/podcast/${props.id}`}>
        <Artwork size="3.5rem" imgs={props.artworks} />
        <S.TextSection>
          <Text emp="high">{props.name}</Text>
          <Text emp="medium">{props.creator}</Text>
        </S.TextSection>
      </Link>
      <Subscribe id={props.id} icon={true} />
    </S.Result>
  )
}

const S = {
  Result: styled.div`
    height: 3.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    a {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-decoration: none;
      flex-shrink: 1;
      flex-grow: 1;
      min-width: auto;
      overflow-x: hidden;

      img {
        border-radius: 0.25rem;
        width: 3.5rem;
      }
    }

    ${() => S.Result} ~ & {
      margin-top: 1rem;
    }

    ${Subscribe.sc} {
      flex-shrink: 0;
      margin-left: auto;
    }
  `,

  TextSection: styled.div`
    height: 100%;
    min-width: auto;
    overflow-x: hidden;
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
