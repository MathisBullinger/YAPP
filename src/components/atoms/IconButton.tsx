import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'
import Icon from '~/components/atoms/Icon'

interface Props {
  icon: string
  onClick(e?: SyntheticEvent): void
  className?: string
  label: string
}

const IconButton: React.FunctionComponent<Props> = props => (
  <S.Button onClick={props.onClick} aria-label={props.label}>
    <Icon icon={props.icon} className={props.className} />
  </S.Button>
)

const S = {
  Button: styled.button`
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  `,
}

export default Object.assign(IconButton, { sc: S.Button })
