import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Icon, Text } from 'atoms'

export default class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MenuItem to={this.props.to} className="menu-item">
        <Icon name={this.props.icon} />
        <Text className="pageName">{this.props.children}</Text>
      </MenuItem>
    )
  }
}

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;

  .pageName {
    margin-left: 1rem;
  }
`
