import React from 'react'
import styled from 'styled-components'
import typography, { TextType } from '~/styles/typography'
import { timing } from '~/styles'

interface Props {
  s1?: boolean
  s2?: boolean
  s3?: boolean
  s4?: boolean
  s5?: boolean
  s6?: boolean
  className?: string
}

const Title: React.FunctionComponent<Props> = props => {
  const size = [1, 2, 3, 4, 5, 6].find(n => props[`s${n}`]) || 2
  return (
    <S.Title
      className={props.className}
      tt={typography[`title${size}`]}
      size={size}
    >
      {props.children}
    </S.Title>
  )
}
export default Title

namespace S {
  export const Title = styled(({ size, children, ...props }) =>
    React.createElement(`h${size}`, props, children)
  )<{ tt: TextType }>`
    font-size: ${({ tt }) => tt.size}rem;
    font-weight: ${({ tt }) => tt.weight};
    letter-spacing: ${({ tt }) => tt.spacing}rem;
    color: ${({ theme }) => theme[theme.topic].on('high')};
    transition: color ${() => timing.colorSwap};
  `
}
