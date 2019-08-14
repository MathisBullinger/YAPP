import React from 'react'
import styled from 'styled-components'
import typography, { TextType } from '~/styles/typography'
import { timing } from '~/styles'

interface Props {
  s1?: boolean
  s2?: boolean
  className?: string
}

const Subtitle: React.FunctionComponent<Props> = props => (
  <S.Subtitle
    className={props.className}
    tt={typography[`subtitle${[1, 2].find(n => props[`s${n}`]) || 1}`]}
  >
    {props.children}
  </S.Subtitle>
)
export default Subtitle

namespace S {
  export const Subtitle = styled.h6<{ tt: TextType }>`
    font-size: ${({ tt }) => tt.size};
    font-weight: ${({ tt }) => tt.weight};
    letter-spacing: ${({ tt }) => tt.spacing};
    color: ${({ theme }) => theme[theme.topic].on('medium')};
    transition: color ${() => timing.colorSwap};
  `
}
