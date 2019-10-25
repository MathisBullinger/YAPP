import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import State from '~/store/state'

export default function Mask() {
  const { x, y } = useSelector((state: State) => state.interaction.mousePos)
  const ref = useRef(null)

  let mouseDir = 0
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect()
    const mouseVec = [
      x - (rect.x + rect.width / 2),
      y - (rect.y + rect.height / 2 - scrollY),
    ]
    mouseDir =
      Math.atan(mouseVec[1] / mouseVec[0]) +
      (mouseVec[0] > 0 ? Math.PI : -Math.PI) / 2
  }

  return <S.Mask ref={ref} data-mouse={mouseDir} />
}

const S = {
  Mask: styled.div.attrs(props => ({
    style: {
      borderImage: `linear-gradient(${
        props['data-mouse']
      }rad, #0000, ${props.theme[props.theme.topic](props.theme.variant).on(
        'high'
      )}) 1`,
    },
  }))`
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-style: solid;
  `,
}
