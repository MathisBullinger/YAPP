import React from 'react'
import Component from '~/utils/component'
import styled from 'styled-components'
import { typography as sizes } from '~/styles'

export default class Text extends Component {
  public static variants = ['s1', 's2']
  public static defaultVariant = 's1'

  constructor(props) {
    super(props, Text.variants, Text.defaultVariant)
  }

  render() {
    return (
      <Paragraph
        className={this.classStr()}
        size={this.state.variant.replace('s', '')}
      >
        {this.props.children}
      </Paragraph>
    )
  }
}

const Paragraph: any = styled.p`
  font-size: ${({ size }) => `${sizes[`text${size}`].size}rem`};
  font-weight: ${({ size }) => sizes[`text${size}`].weight};
  letter-spacing: ${({ size }) => `${sizes[`text${size}`].spacing}rem`};
`
