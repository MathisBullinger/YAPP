import React, { useState } from 'react'
import styled from 'styled-components'
import { Slider, IconButton } from '~/components/atoms'
import { send } from '~/systems'

export default function Volume() {
  const [muted, setMuted] = useState(false)
  const [value, setValue] = useState(25)

  function handleChange(v: number) {
    if (muted) {
      setMuted(false)
      return
    }
    setValue(v)
    send('audio', 'setVolume', v / 100)
  }

  return (
    <S.Volume>
      <IconButton
        icon={muted ? 'muted' : 'volume'}
        label={muted ? 'unmute' : 'mute'}
        onClick={() => {
          send('audio', 'setVolume', muted ? value / 100 : 0)
          setMuted(!muted)
        }}
      />
      <Slider
        min={0}
        max={50}
        step={0.5}
        value={muted ? 0 : value}
        handleChange={handleChange}
      />
    </S.Volume>
  )
}

const S = {
  Volume: styled.div`
    display: flex;
    flex-direction: row;
    max-width: 9rem;
    display: flex;
    align-items: center;

    button,
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    input {
      margin-left: 0.8rem;
    }
  `,
}
