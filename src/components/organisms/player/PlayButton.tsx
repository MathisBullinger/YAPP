import React from 'react'
import styled from 'styled-components'
import { IconButton } from '~/components/atoms'
import { layout } from '~/styles'

interface Props {
  playing: boolean
}

export default function PlayButton({ playing }: Props) {
  return (
    <S.PlayButton
      icon={playing ? 'playCircle' : 'pauseCircle'}
      label={playing ? 'pause' : 'resume'}
      onClick={() => {}}
    />
  )
}

const S = {
  PlayButton: styled(IconButton)`
    width: calc(${layout.mobile.playerHeight} / 4 * 3);
    height: calc(${layout.mobile.playerHeight} / 4 * 3);
  `,
}
