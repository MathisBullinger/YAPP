import React from 'react'
import { Text, Title, Subtitle, Link } from '~/components/atoms'
import styled from 'styled-components'
import parse from 'html-react-parser'

function replace(content) {
  if (!content) return
  if (!Array.isArray(content)) content = [content]

  return content.map(item => {
    const { props, type } = item
    switch (type) {
      case 'p':
        return <Text>{props.children}</Text>
      case 'a':
        return <Link to={props.href}>{props.children}</Link>
      case 'h1':
        return <Title s4>{props.children}</Title>
      case 'h2':
        return <Title s5>{props.children}</Title>
      case 'h3':
        return <Title s6>{props.children}</Title>
      case 'h4':
        return <Subtitle s1>{props.children}</Subtitle>
      case 'h5':
      case 'h6':
        return <Subtitle s2>{props.children}</Subtitle>
      default:
        return item
    }
  })
}

export default function Dynamic({ children }) {
  if (!children.startsWith('\u200c'))
    return (
      <S.Dynamic>
        <Text>{children}</Text>
      </S.Dynamic>
    )

  const content = replace(parse(children.substring(1)))

  return <S.Dynamic>{content}</S.Dynamic>
}

const S = {
  Dynamic: styled.div`
    color: ${({ theme }) => theme[theme.topic](theme.variant).on()};
    margin: 0 !important;
    padding: 0 !important;
  `,
}
