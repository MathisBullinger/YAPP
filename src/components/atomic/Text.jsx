import React from 'react'
import styled from 'styled-components'

const Paragraph = styled.p`
  font-size: 1rem;
  color: ${props => props.small ? 'red' : 'green'};
  font-size: ${props => props.small ? '1rem': '5rem'};
`

const Text = props => <Paragraph {...props}>{props.children}</Paragraph>

export default Text
