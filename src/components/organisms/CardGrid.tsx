import React from 'react'
import styled from 'styled-components'
import { responsive } from '~/styles'

const CardGrid: React.FunctionComponent = ({ children }) => (
  <S.Grid>{children}</S.Grid>
)
export default CardGrid

namespace S {
  export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0;

    @media ${responsive.navOnSide} {
      grid-template-columns: repeat(6, 1fr);
    }

    @media ${responsive.navOnSide} and (max-width: 999px) {
      grid-gap: 3vw;
    }

    @media (min-width: 1000px) {
      grid-gap: 30px;
    }
  `
}
