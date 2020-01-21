import React from 'react'
import { useSelector } from '~/utils/hooks'
import { Dynamic } from '~/components/atoms'

interface Props {
  id: Podcast['id']
}

export default function Description({ id }: Props) {
  const description = useSelector(
    state =>
      state.podcasts.byId[id]?.descr?.long ??
      state.podcasts.byId[id]?.descr?.short
  )
  return <Dynamic>{description}</Dynamic>
}
