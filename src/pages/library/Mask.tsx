import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

export default function Mask() {
  const { x, y } = useSelector((state: State) => state.interaction.mousePos)
  const ref = useRef(null)

  useSelector((state: State) => state.interaction.scrollPos)

  let mouseDir = 0
  let dist = Infinity
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect()

    if (rect.y + rect.height <= 0 || rect.y > window.innerHeight) return null

    const mouseVec = [
      x - (rect.x + rect.width / 2),
      y - (rect.y + rect.height / 2 - scrollY),
    ]

    if (Math.sqrt(mouseVec[0] ** 2 + mouseVec[1] ** 2) / rect.width > 1)
      return null

    mouseDir =
      Math.atan(mouseVec[1] / mouseVec[0]) +
      (mouseVec[0] > 0 ? Math.PI : -Math.PI) / 2

    dist =
      Math.max(Math.abs(x - (rect.x + rect.width / 2)) - rect.width / 2, 0) **
        2 +
      Math.max(Math.abs(y - (rect.y + rect.height / 2)) - rect.height / 2, 0) **
        2

    if (dist === 0)
      dist = -Math.sqrt(mouseVec[0] ** 2 + mouseVec[1] ** 2) / rect.width
  }

  return <S.Mask ref={ref} data-mouse={mouseDir} data-prox={dist} />
}

const S = {
  Mask: styled.div.attrs(props => ({
    style: {
      ...(props['data-prox'] > 0
        ? {
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
              100}%, ${props.theme[props.theme.topic](props.theme.variant)
              .on()
              .substring(0, 7)}aa, transparent ${Math.min(
              20,
              1 / (Math.max(props['data-prox'], 1) / 3000) ** 4
            )}%) 1`,
          }
        : {
            background: `radial-gradient(circle at ${Math.sin(
              props['data-mouse']
            ) *
              props['data-prox'] *
              -100 +
              50}% ${Math.cos(props['data-mouse']) * props['data-prox'] * 100 +
              50}%, ${props.theme[props.theme.topic](props.theme.variant)
              .on()
              .substring(0, 7)}22, ${props.theme[props.theme.topic](
              props.theme.variant
            )
              .on()
              .substring(0, 7)}11)`,
            borderColor: `${props.theme[props.theme.topic](props.theme.variant)
              .on()
              .substring(0, 7)}33`,
          }),
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
