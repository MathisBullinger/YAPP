import React from 'react'
import { useSelector } from 'react-redux'
import { Text, Dynamic } from '~/components/atoms'

interface Props {
  id: Podcast['itunesId']
}

export default function Description({ id }: Props) {
  const description = useSelector(
    (state: State) => state.podcasts.byId[id]?.description
  )
  const Tag = description?.startsWith('\u200c') ? Dynamic : Text
  return <Tag>{description}</Tag>
}
