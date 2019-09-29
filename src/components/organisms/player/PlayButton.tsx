import React from 'react'
import styled from 'styled-components'
import { IconButton } from '~/components/atoms'
import { layout } from '~/styles'
import { useSelector } from 'react-redux'
import State from '~/store/state'

interface Props {
  togglePlayer(v: boolean): void
}

export default function PlayButton({ togglePlayer }: Props) {
  const playing = useSelector((state: State) => state.player.playing)

  return (
    <S.PlayButton
      icon={playing ? 'pauseCircle' : 'playCircle'}
      label={playing ? 'pause' : 'resume'}
      onClick={() => togglePlayer(!playing)}
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
