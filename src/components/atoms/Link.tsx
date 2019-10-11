import React from 'react'
import styled from 'styled-components'
import { blendHexColorString } from '~/utils'

interface Props {
  children?: any
  to: string
  external?: boolean
}

export default function Link({ children, to, external = true }: Props) {
  return (
    <S.Link href={to} target={external && '_blank'}>
      {children}
    </S.Link>
  )
}

const S = {
  Link: styled.a`
    color: ${({ theme }) => theme.primary(theme.variant).color};
    color: ${({ theme }) => theme.vibrant};

    &:visited {
      color: ${({ theme }) =>
        theme.muted ||
        blendHexColorString(
          theme.primary(theme.variant).color.substring(0, 7) + '88',
          theme[theme.topic](theme.variant).color
        )};
    }
  `,
}
