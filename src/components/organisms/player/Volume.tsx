import React, { useState } from 'react'
import styled from 'styled-components'
import { Slider, IconButton } from '~/components/atoms'
import audio from '~/systems/audio'
import { useSelector } from '~/utils/hooks'

export default function Volume() {
  const [muted, setMuted] = useState(false)
  const value = useSelector(state => state.player.volume)

  function handleChange(v: number) {
    if (muted) {
      setMuted(false)
      return
    }
    audio.setVolume(v / 100)
  }

  return (
    <S.Volume>
      <IconButton
        icon={muted ? 'muted' : 'volume'}
        label={muted ? 'unmute' : 'mute'}
        onClick={() => {
          setMuted(!muted)
          audio.setVolume(muted ? value : 0)
        }}
      />
      <Slider
        min={0}
        max={100}
        step={1}
        value={muted ? 0 : value * 100}
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
