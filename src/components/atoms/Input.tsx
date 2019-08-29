import React from 'react'
import styled from 'styled-components'
import { filterObj } from '~/utils'

interface Props {
  type?: 'text'
  placeholder?: string
  value?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
  elRef?: React.RefObject<HTMLInputElement>
  merge?: boolean
}

export default function Input(props: Props) {
  const { merge } = props
  const select = Object.keys(filterObj({ merge }, (k, v) => v))
  const Tag =
    {
      merge: S.Merged,
    }[select && select[0]] || S.Input

  return (
    <Tag
      type={props.type || 'text'}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      ref={props.elRef}
    />
  )
}

namespace S {
  export const Input = styled.input`
    font: inherit;

    &::selection {
      background-color: ${({ theme }) => theme.primary(theme.variant).color};
      color: ${({ theme }) => theme.primary(theme.variant).on('high')};
    }
  `

  export const Merged = styled(Input)`
    height: 2rem;
    border: none;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    color: ${({ theme }) => theme[theme.topic](theme.variant).on('high')};
    &:focus {
      outline: none;
    }
  `
}
