import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Icon } from 'atoms'

export default class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MenuItem to={this.props.to}>
        <Icon name={this.props.icon} />
        {this.props.children}
      </MenuItem>
    )
  }
}

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
`
