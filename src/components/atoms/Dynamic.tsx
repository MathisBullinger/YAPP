import React from 'react'
import parse, { domToReact } from 'html-react-parser'
import { Text, Title, Subtitle } from '~/components/atoms'
import styled from 'styled-components'

export default function Dynamic({ children }) {
  if (typeof children === 'string' && children.startsWith('\u200c'))
    children = children.substr(1)

  const content = parse(children, {
    replace: node => {
      switch (node.name) {
        case 'p':
          return <Text>{domToReact(node.children)}</Text>
        case 'h1':
          return <Title s4>{domToReact(node.children)}</Title>
        case 'h2':
          return <Title s5>{domToReact(node.children)}</Title>
        case 'h3':
          return <Title s6>{domToReact(node.children)}</Title>
        case 'h4':
          return <Subtitle s1>{domToReact(node.children)}</Subtitle>
        case 'h5':
        case 'h6':
          return <Subtitle s2>{domToReact(node.children)}</Subtitle>
        default:
          return node
      }
    },
  })

  return <S.Dynamic>{content}</S.Dynamic>
}

const S = {
  Dynamic: styled.div`
    color: ${({ theme }) => theme[theme.topic](theme.variant).on()};
    margin: 0 !important;
    padding: 0 !important;
  `,
}
