import React from 'react'
import styled from 'styled-components'
import { Episode } from '~/store/state'
import { Text } from '~/components/atoms'
import { InlinePlayButton } from '.'
import { responsive } from '~/styles'

interface Props {
  episode: Episode
}

export default function EpisodeStrip(props: Props) {
  return (
    <S.Episode>
      <Text emp="high">{props.episode.title || 'no title available'}</Text>
      <InlinePlayButton progress={Math.random()} />
    </S.Episode>
  )
}

const S = {
  Episode: styled.li`
    height: 4rem;
    display: flex;
    align-items: center;
    margin-left: -2rem;
    margin-right: -2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    justify-content: space-between;

    & > * {
      margin: 0;
    }

    border-top: 1px solid
      ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on()
          .substring(0, 7)}22;
    border-bottom: 1px solid
      ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on()
          .substring(0, 7)}22;

    ${() => S.horrendousSelfSelector} + & {
      border-top: none;
    }

    @media ${responsive.navOnSide} {
      margin: 0;
      padding: 0;
    }
  `,

  get horrendousSelfSelector() {
    return this.Episode
  },
}
