import React from 'react'
import styled from 'styled-components'

export default class Labeled extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <LabelStyled>
        {this.props.children}
        {this.props.for}
      </LabelStyled>
    )
  }
}

const LabelStyled = styled.label`
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;

  * {
    vertical-align: middle;
    margin-left: 1rem;
  }
`
