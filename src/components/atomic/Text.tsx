import React from 'react'
import Component from '~/utils/component'
import styled from 'styled-components'

export default class Text extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Paragraph>{this.props.children}</Paragraph>
  }
}

const Paragraph = styled.p``
