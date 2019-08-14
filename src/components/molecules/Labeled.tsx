import React from 'react'
import styled from 'styled-components'
import { timing } from '~/styles'

interface Props {
  for: JSX.Element
}

const Labeled: React.FunctionComponent<Props> = props => (
  <S.Labeled>
    {props.children}
    {props.for}
  </S.Labeled>
)
export default Labeled

namespace S {
  export const Labeled = styled.label`
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    * {
      vertical-align: middle;
      margin-left: 1rem;
    }
    color: ${({ theme }) => theme[theme.topic].on};
    transition: color ${() => timing.colorSwap};
  `
}
