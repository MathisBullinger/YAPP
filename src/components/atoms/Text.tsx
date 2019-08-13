import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { typography } from '~/styles'

interface Props {
  s1?: boolean
  s2?: boolean
  className?: string
}

const Text: FunctionComponent<Props> = props => (
  <S.P
    className={props.className}
    typo={typography[`text${[1, 2].find(n => props[`s${n}`]) || 1}`]}
  >
    {props.children}
  </S.P>
)
export default Text

namespace S {
  interface Props {
    typo: {
      size: string
      weight: string
      spacing: string
    }
  }

  export const P: any = styled.div`
    font-size: ${({ typo }: Props) => typo.size};
    font-weight: ${({ typo }: Props) => typo.weight};
    letter-spacing: ${({ typo }: Props) => typo.spacing};
  `
}
