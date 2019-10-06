import React from 'react'
import styled from 'styled-components'
import { IconButton } from '~/components/atoms'
import { layout } from '~/styles'

interface Props {
  icon: string
  handleClick(): void
  label: string
}

export default function ControlButton(props: Props) {
  return (
    <S.PlayButton
      icon={props.icon}
      label={props.label}
      onClick={props.handleClick}
    />
  )
}

const S = {
  PlayButton: styled(IconButton)`
    cursor: pointer;
    width: calc(${layout.mobile.playerHeight} / 2);
    height: calc(${layout.mobile.playerHeight} / 2);
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  `,
}
