import React from 'react'
import styled from 'styled-components'
import { IconButton } from '~/components/atoms'
import { layout } from '~/styles'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import { send } from '~/systems'

export default function PlayButton() {
  const playing = useSelector((state: State) => state.player.playing)

  return (
    <S.PlayButton
      icon={playing ? 'pauseCircle' : 'playCircle'}
      label={playing ? 'pause' : 'resume'}
      onClick={() => send('audio', playing ? 'pause' : 'play')}
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
