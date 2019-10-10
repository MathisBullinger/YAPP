import React from 'react'
import styled from 'styled-components'

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
  Link: styled.a``,
}
