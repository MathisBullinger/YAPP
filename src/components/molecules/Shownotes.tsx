import React from 'react'
import { useSelector } from 'react-redux'
import { Dynamic } from '~/components/atoms'
import State from '~/store/state'
import styled from 'styled-components'
import { responsive } from '~/styles'

interface Props {
  episodeId: string
}

export default function Shownotes({ episodeId }: Props) {
  const [pId, eId] = (episodeId || '').split(' ')
  const episode = useSelector(
    (state: State) =>
      pId &&
      state.podcasts.byId[pId].episodes.find(({ id }) => id === `${pId} ${eId}`)
  )
  const description =
    (episode.description && episode.description.length) >
    (episode.content && episode.content.length)
      ? episode.description
      : episode.content

  return (
    <S.Notes>
      <Dynamic>{description}</Dynamic>
    </S.Notes>
  )
}

const S = {
  Notes: styled.div`
    padding: 1rem;

    @media ${responsive.navOnSide} {
      flex-grow: 1;
      flex-basis: 0;
      overflow-y: scroll;
    }
  `,
}
