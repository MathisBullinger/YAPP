import React from 'react'
import styled from 'styled-components'

interface Props {
  placeholder?: string
}

class Input extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    return <S.Input placeholder={this.props.placeholder} />
  }
}
export default Input

namespace S {
  export const Input = styled.input`
    font: inherit;
    height: 2rem;
    border: none;

    &:focus {
      outline: none;
    }
  `
}
