import React from 'react'
import { useSelector } from '~/utils/hooks'
import { Text, Dynamic } from '~/components/atoms'

interface Props {
  id: Podcast['id']
}

export default function Description({ id }: Props) {
  const description = useSelector(state => state.podcasts.byId[id]?.description)
  const Tag = description?.startsWith('\u200c') ? Dynamic : Text
  return <Tag>{description}</Tag>
}
