import React from 'react'
import styled from 'styled-components'
import shadow from '~styles/shadow'

export default class Switch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      on: props.value || false,
    }
  }

  render() {
    return (
      <SwitchStyled
        onClick={() => this.toggle()}
        role="switch"
        aria-checked={this.state.on.toString()}
      >
        <div></div>
      </SwitchStyled>
    )
  }

  toggle() {
    this.setState({
      on: !this.state.on,
    })
    if (typeof this.props.onInput === 'function')
      this.props.onInput(this.state.on)
  }
}

const activeColor = [56, 131, 131]
const SwitchStyled = styled.div`
  display: inline-block;
  width: 2rem;
  height: 0.8rem;
  border-radius: 0.4rem;
  background-color: gray;
  cursor: pointer;

  div {
    margin: 0;
    margin-top: -0.1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: ${shadow(1)};
    transition: transform 0.15s ease;
  }

  &[aria-checked='true'] {
    background-color: rgba(${activeColor.join()}, 50%);

    div {
      transform: translateX(100%);
      background-color: rgb(${activeColor.join()});
    }
  }
`
