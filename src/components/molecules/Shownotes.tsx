import React from 'react'
import { useSelector } from 'react-redux'
import { Dynamic } from '~/components/atoms'
import State from '~/store/state'

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
  return <Dynamic>{episode.description}</Dynamic>
}
