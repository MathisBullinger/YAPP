import React from 'react'
import styled from 'styled-components'
import shadow from '~/styles/shadow'

export default class Mainnav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Bar>Nav</Bar>
  }
}

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 4rem;
  display: block;
  background-color: gray;
  box-shadow: ${shadow(4)};
`
