import React from 'react'
import styled from 'styled-components'

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Select onInput={e => this.handleInput(e)}>
        {this.props.items &&
          this.props.items.map(item => <option key={item}>{item}</option>)}
      </Select>
    )
  }

  handleInput(e) {
    if (typeof this.props.onInput !== 'function') return
    this.props.onInput(e.target.value)
  }
}

const Select = styled.select`
  display: block;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
