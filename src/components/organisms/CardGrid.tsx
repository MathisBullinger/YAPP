import React from 'react'
import styled from 'styled-components'
import { responsive, cardGrid as grid } from '~/styles'

export default function CardGrid({ children }) {
  return <S.Grid>{children}</S.Grid>
}

const queries = grid.steps.map(([min, max], i) => {
  return `@media ${[
    ...(min ? [`(min-width: ${min}px)`] : []),
    ...(max ? [`(max-width: ${max}px)`] : []),
  ].join(' and ')} {
    grid-template-columns: repeat(${i + grid.minCards}, 1fr);
  }`
})

const S = {
  Grid: styled.div`
    display: grid;
    ${queries}

    @media ${responsive.navOnSide} {
      grid-gap: calc(${grid.buffer}px - 1rem);
    }
  `,
}
