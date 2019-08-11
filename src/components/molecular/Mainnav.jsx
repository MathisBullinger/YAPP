import React from 'react'
import styled from 'styled-components'
import shadow from '~/styles/shadow'
import Item from './mainnav/Item'

export default class Mainnav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Bar>
        <Item to="/" icon="library">
          Library
        </Item>
        <Item to="/feed" icon="subscriptions">
          Feed
        </Item>
        <Item to="/discover" icon="search">
          Discover
        </Item>
        <Item to="/profile" icon="person">
          Profile
        </Item>
      </Bar>
    )
  }
}

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 4rem;
  display: block;
  background-color: white;
  box-shadow: ${shadow(4)};

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
