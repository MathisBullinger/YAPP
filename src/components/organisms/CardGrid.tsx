import React from 'react'
import styled from 'styled-components'
import { responsive } from '~/styles'

const CardGrid: React.FunctionComponent = ({ children }) => (
  <S.Grid>{children}</S.Grid>
)
export default CardGrid

const cardSize = 180
const buffer = 20
const minCards = 3

const sizes = new Array(15)
  .fill(0)
  .map((_, i) => i + minCards)
  .map(n => n * (cardSize + buffer) - buffer)

const queries = sizes.map((s, i) => {
  const min = i > 0 && `(min-width: ${s}px)`
  const max = i < sizes.length - 1 && `(max-width: ${sizes[i + 1] - 1}px)`
  return `@media ${[...(min ? [min] : []), ...(max ? [max] : [])].join(
    ' and '
  )} {
    grid-template-columns: repeat(${i + minCards}, 1fr);
  }`
})

namespace S {
  export const Grid = styled.div`
    display: grid;
    ${queries}

    @media ${responsive.navOnSide} {
      grid-gap: ${buffer}px;
    }
  `
}
