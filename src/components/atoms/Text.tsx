import React from 'react'
import styled from 'styled-components'
import typography, { TextType, TextEmp } from '~/styles/typography'
import { timing } from '~/styles'

interface Props {
  s1?: boolean
  s2?: boolean
  className?: string
  emp?: TextEmp
}

const Text: React.FunctionComponent<Props> = props => (
  <S.Text
    className={props.className}
    tt={typography[`text${[1, 2].find(n => props[`s${n}`]) || 1}`]}
    emp={props.emp || props.s1 ? 'high' : 'medium'}
  >
    {props.children}
  </S.Text>
)
export default Text

namespace S {
  export const Text = styled.p<{ tt: TextType; emp: TextEmp }>`
    font-size: ${({ tt }) => tt.size}rem;
    font-weight: ${({ tt }) => tt.weight};
    letter-spacing: ${({ tt }) => tt.spacing}rem;
    color: ${({ theme, emp }) => theme[theme.topic]().on(emp)};
    transition: color ${() => timing.colorSwap};
  `
}
