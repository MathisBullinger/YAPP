import React from 'react'
import styled from 'styled-components'
import { IconButton } from '~/components/atoms'
import { layout } from '~/styles'
import { useSelector } from '~/utils/hooks'
import audio from '~/systems/audio'

export default function PlayButton() {
  const playerState = useSelector(state => state.player.state)
  const playing = playerState === 'playing' || playerState === 'waiting'

  return (
    <S.PlayButton
      icon={playing ? 'pauseCircle' : 'playCircle'}
      label={playing ? 'pause' : 'resume'}
      onClick={audio.togglePlay}
    />
  )
}

const S = {
  PlayButton: styled(IconButton)`
    cursor: pointer;
    width: calc(${layout.mobile.playerHeight} / 4 * 3);
    height: calc(${layout.mobile.playerHeight} / 4 * 3);
  `,
}
