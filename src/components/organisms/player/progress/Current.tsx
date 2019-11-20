import React, { useState } from 'react'
import TimeStamp from './TimeStamp'
import { useSelector } from 'react-redux'
import { formatTimeStamp } from '~/utils'

export default function Current() {
  const total = useSelector((state: State) => state.player.length)
  const current = useSelector((state: State) => state.player.progress)
  const [compTotal, setCompTotal] = useState(total)
  const [digits, setDigits] = useState(5)

  if (total !== compTotal) {
    setCompTotal(total)
    setDigits(formatTimeStamp(total, true).length)
  }

  return (
    <TimeStamp time={current ? formatTimeStamp(current).substr(-digits) : ''} />
  )
}
