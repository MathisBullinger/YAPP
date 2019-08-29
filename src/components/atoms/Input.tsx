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
  block?: boolean
}

export default function Input(props: Props) {
  const { merge, block } = props
  const select = Object.keys(filterObj({ merge, block }, (k, v) => v))
  const Tag =
    {
      merge: S.Merged,
      block: S.Block,
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
    height: 2rem;
    font-size: 0.9rem;
    padding-left: 1rem;
    padding-right: 1rem;

    &:focus {
      outline: none;
    }

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
  `

  export const Block = styled(Input)`
    border-radius: 0.25rem;
    border: none;
    background-color: ${({ theme }) =>
      theme
        .surface(theme.variant)
        .on()
        .substring(0, 7) + '11'};
  `
}
const InputStyle = S.Input
export { InputStyle }
