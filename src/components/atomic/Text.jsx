import React from 'react'
import styled from 'styled-components'

const Paragraph = styled.p`
  font-size: 1rem;
`

const Text = props => <Paragraph {...props}>{props.children}</Paragraph>

export default Text
