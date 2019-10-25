import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Mask from './Mask'
import State from '~/store/state'

interface Props {
  cl: number
}

export default function Podcast(props: Props) {
  const method = useSelector((state: State) => state.interaction.method)

  return (
    <S.Podcast data-cl={props.cl}>{method === 'mouse' && <Mask />}</S.Podcast>
  )
}

const S = {
  Podcast: styled.div`
    position: relative;
    display: block;
    background-color: ${props =>
      '#' + (props['data-cl'] * 255).toString(16)[0].repeat(6)};
    padding-bottom: 100%;
  `,
}
