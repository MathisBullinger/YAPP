import React from 'react'
import styled from 'styled-components'
import { Title, Dropdown } from 'atoms'

export default class Showcase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      child: React.createElement(
        this.props.comp,
        { [this.state.size]: true },
        this.props.children[0].children
      ),
    }
  }

  render() {
    return (
      <Case className="showcase">
        <div className="info">
          <Title s2>{this.props.comp.name}</Title>
          {this.state.child.nodeName.variants && (
            <Dropdown
              onInput={v => this.handleVariantChange(v)}
              items={this.state.child.nodeName.variants}
            ></Dropdown>
          )}
        </div>
        <div className="comp">{this.state.child}</div>
      </Case>
    )
  }

  handleVariantChange(v) {
    this.setState({
      child: React.createElement(
        this.props.comp,
        { [v]: true, key: v },
        this.props.children[0].children
      ),
    })
  }
}

const Case = styled.div`
  border-bottom: 1px solid black;
  display: contents;

  *:not(.showcase) + & {
    border-top: 1px solid black;
  }
`
