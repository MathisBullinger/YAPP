import React from 'react'
import styled from 'styled-components'
import { Icon } from '.'

interface Props {
  icon: string
  onClick(): void
  className?: string
}

const IconButton: React.FunctionComponent<Props> = props => (
  <S.Button onClick={props.onClick}>
    <Icon icon={props.icon} className={props.className} />
  </S.Button>
)
export default IconButton

namespace S {
  export const Button = styled.button`
    display: contents;
  `
}
