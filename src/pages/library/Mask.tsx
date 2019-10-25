import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import State from '~/store/state'

export default function Mask() {
  const { x, y } = useSelector((state: State) => state.interaction.mousePos)
  const ref = useRef(null)

  let mouseDir = 0
  let dist = 0
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect()
    const mouseVec = [
      x - (rect.x + rect.width / 2),
      y - (rect.y + rect.height / 2 - scrollY),
    ]
    mouseDir =
      Math.atan(mouseVec[1] / mouseVec[0]) +
      (mouseVec[0] > 0 ? Math.PI : -Math.PI) / 2
    dist = Math.sqrt(mouseVec[0] ** 2 + mouseVec[1] ** 2)
  }

  return <S.Mask ref={ref} data-mouse={mouseDir} data-prox={dist} />
}

const S = {
  Mask: styled.div.attrs(props => ({
    style: {
      borderImage: `radial-gradient(circle at ${(((Math.min(
        Math.abs(props['data-mouse']) <= Math.PI / 2
          ? Math.abs(props['data-mouse'])
          : Math.PI - Math.abs(props['data-mouse']),
        Math.PI / 4
      ) /
        (Math.PI / 4)) *
        (props['data-mouse'] > 0 ? 1 : -1)) /
        2 +
        0.5) *
        100}% ${((Math.max(
        Math.PI / 4,
        Math.min(Math.abs(props['data-mouse']), (Math.PI / 4) * 3)
      ) -
        Math.PI / 4) /
        (Math.PI / 2)) *
        100}%, #fff, transparent 20%) 1`,
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
