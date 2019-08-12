import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { shadow } from '~/styles'

interface Props {
  el?: number
}

const Card: FunctionComponent<Props> = ({ el = 3, children }) => (
  <CardStyled {...{ el }}>{children}</CardStyled>
)
export default Card

const CardStyled = styled.div`
  min-width: 11rem;
  min-height: 11rem;
  display: table;
  margin-top: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${({ el }: Props) => shadow(el)};
  background-color: white;
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding: 1rem;
`
