import React from 'react'
import styled from 'styled-components'
import Component from '~/utils/component'

export default class Title extends Component {
  private static variants = ['s1', 's2', 's3', 's4', 's5', 's6']
  private static defaultVariant = 's1'

  props: {
    children: any
  }

  constructor(props) {
    super(props, Title.variants, Title.defaultVariant)
  }

  render() {
    return (
      <Header tag={this.variant.replace('s', 'h')} className={this.variant}>
        {this.props.children}
      </Header>
    )
  }
}

const Header: any = styled(({ tag = 'h2', children, ...props }) => {
  return React.createElement(tag, props, children)
})``
