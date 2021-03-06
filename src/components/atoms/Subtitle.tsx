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

const Subtitle: React.FunctionComponent<Props> = props => (
  <S.Subtitle
    className={props.className}
    tt={typography[`subtitle${[1, 2].find(n => props[`s${n}`]) || 1}`]}
    emp={props.emp || (props.s1 ? 'high' : 'medium')}
  >
    {props.children}
  </S.Subtitle>
)

const S = {
  Subtitle: styled(({ children, className }) =>
    React.createElement('h6', { className }, children)
  )<{ tt: TextType; emp: TextEmp }>`
    font-size: ${({ tt }) => tt.size}rem;
    font-weight: ${({ tt }) => tt.weight};
    letter-spacing: ${({ tt }) => tt.spacing}rem;
    color: ${({ theme, emp }) => theme[theme.topic](theme.variant).on(emp)};
    transition: color ${() => timing.colorSwap};
    margin-top: 1rem;
    margin-bottom: 1rem;
  `,
}

export default Object.assign(Subtitle, { sc: S.Subtitle })
