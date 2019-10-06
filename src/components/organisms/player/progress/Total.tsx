import React from 'react'
import TimeStamp from './TimeStamp'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import { formatTimeStamp } from '~/utils'

export default function Total() {
  const total = useSelector((state: State) => state.player.length)

  return <TimeStamp time={total ? formatTimeStamp(total, true) : ''} />
}
