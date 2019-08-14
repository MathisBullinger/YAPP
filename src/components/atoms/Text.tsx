import React from 'react'
import styled from 'styled-components'
import typography, { TextType } from '~/styles/typography'
import { timing } from '~/styles'

interface Props {
  s1?: boolean
  s2?: boolean
  className?: string
}

const Text: React.FunctionComponent<Props> = props => (
  <S.Text
    className={props.className}
    tt={typography[`text${[1, 2].find(n => props[`s${n}`]) || 1}`]}
  >
    {props.children}
  </S.Text>
)
export default Text

namespace S {
  export const Text = styled.p<{ tt: TextType }>`
    font-size: ${({ tt }) => tt.size};
    font-weight: ${({ tt }) => tt.weight};
    letter-spacing: ${({ tt }) => tt.spacing};
    color: ${({ theme }) => theme[theme.topic].on('medium')};
    transition: color ${() => timing.colorSwap};
  `
}
