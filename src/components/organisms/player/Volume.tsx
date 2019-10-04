import React from 'react'
import { Slider } from '~/components/atoms'
import { send } from '~/systems'

export default function Volume() {
  return (
    <Slider
      min={0}
      max={50}
      step={0.5}
      handleChange={v => send('audio', 'setVolume', v)}
    />
  )
}
