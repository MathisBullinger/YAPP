import React, { FunctionComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { shadow } from '~/styles'

interface Props {
  el?: number
}

const Card: FunctionComponent<Props> = ({ el = 3, children }) => (
  <ThemeProvider theme={{ topic: 'surface' }}>
    <CardStyled {...{ el }}>{children}</CardStyled>
  </ThemeProvider>
)
export default Card

const CardStyled = styled.div`
  min-width: 11rem;
  min-height: 11rem;
  display: table;
  margin: 1rem;
  box-shadow: ${({ el }: Props) => shadow(el)};
  background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding: 1rem;
`
