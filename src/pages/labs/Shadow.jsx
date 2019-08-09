import React from 'react'
import styled from 'styled-components'
import { Page, Title, Dropdown } from 'atoms'

export default class Shadow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'white',
    }
  }

  render() {
    return (
      <ShadowPage color={this.state.backgroundColor}>
        <Title>Shadow Lab</Title>
        <Dropdown
          items={['white', 'light grey', 'dark grey']}
          onInput={c => this.handleColorChange(c)}
        ></Dropdown>
      </ShadowPage>
    )
  }

  handleColorChange(color) {
    this.setState({
      backgroundColor:
        {
          'light grey': 'rgb(229, 229, 229)',
          'dark grey': 'rgb(51, 51, 51)',
        }[color] || color,
    })
  }
}

const ShadowPage = styled(Page).attrs(props => ({
  color: props.color,
}))`
  background-color: ${props => props.color};
`
