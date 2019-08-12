import React from 'react'
import styled from 'styled-components'
import Component from '~/utils/component'
import { typography as sizes } from '~/styles'

export default class Title extends Component {
  public static variants = ['s1', 's2', 's3', 's4', 's5', 's6']
  public static defaultVariant = 's5'

  props: {
    children: any
  }

  constructor(props) {
    super(props, Title.variants, Title.defaultVariant)
  }

  render() {
    return (
      <Header
        className={this.classStr()}
        size={this.state.variant.replace('s', '')}
        tag={this.state.variant.replace('s', 'h')}
      >
        {this.props.children}
      </Header>
    )
  }
}

const Header: any = styled(({ tag = 'h2', children, ...props }) => {
  return React.createElement(tag, props, children)
})`
  font-weight: 500;
  font-size: ${({ size }) => `${sizes[`title${size}`].size}rem`};
  font-weight: ${({ size }) => sizes[`title${size}`].weight};
  letter-spacing: ${({ size }) => `${sizes[`title${size}`].spacing}rem`};
`
