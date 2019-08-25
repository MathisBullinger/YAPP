import React from 'react'
import styled from 'styled-components'

interface Props {
  placeholder?: string
  value?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  inputRef?: React.RefObject<HTMLInputElement>
}

class Input extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <S.Input
        placeholder={this.props.placeholder}
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        ref={this.props.inputRef}
      />
    )
  }
}
export default Input

namespace S {
  export const Input = styled.input`
    font: inherit;
    height: 2rem;
    border: none;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    color: ${({ theme }) => theme[theme.topic](theme.variant).on('high')};

    &:focus {
      outline: none;
    }

    &::selection {
      background-color: ${({ theme }) => theme.primary(theme.variant).color};
      color: ${({ theme }) => theme.primary(theme.variant).on('high')};
    }
  `
}
