import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import styled from 'styled-components'
import { filterObj } from '~/utils'

interface Props {
  type?: 'text'
  placeholder?: string
  value?: string
  onChange?(v: string): void
  elRef?: React.RefObject<HTMLInputElement>
  merge?: boolean
  block?: boolean
  onFocus?(): void
  onBlur?(): void
  onEscape?(): void
}

function Input(props: Props) {
  const [value, setValue] = useState('')
  if (props.value !== undefined && props.value !== value) setValue(props.value)

  const { merge, block } = props
  const select = Object.keys(filterObj({ merge, block }, (k, v) => v))
  const Tag: typeof S.Input =
    {
      merge: S.Merged,
      block: S.Block,
    }[select && select[0]] || S.Input

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    if (props.onChange) props.onChange(e.target.value)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape' && props.onEscape) props.onEscape()
  }

  return (
    <Tag
      type={props.type || 'text'}
      placeholder={props.placeholder}
      value={value}
      onChange={handleChange}
      ref={props.elRef}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyDown={props.onEscape && handleKeyDown}
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
    color: ${({ theme }) => theme[theme.topic](theme.variant).on('high')};

    &::placeholder {
      color: ${({ theme }) => theme[theme.topic](theme.variant).on('disabled')};
    }

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

export default Object.assign(Input, {
  sc: S.Input,
})
