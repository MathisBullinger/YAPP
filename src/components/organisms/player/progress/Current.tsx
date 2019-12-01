import React, { useState } from 'react'
import TimeStamp from './TimeStamp'
import { useSelector } from '~/utils/hooks'
import { formatTimeStamp } from '~/utils'

export default function Current() {
  const total = useSelector(state => state.player.length)
  const current = useSelector(state => state.player.progress)
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
