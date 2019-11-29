import React from 'react'
import TimeStamp from './TimeStamp'
import { useSelector } from '~/utils/hooks'
import { formatTimeStamp } from '~/utils'

export default function Total() {
  const total = useSelector(state => state.player.length)

  return <TimeStamp time={total ? formatTimeStamp(total, true) : ''} />
}
