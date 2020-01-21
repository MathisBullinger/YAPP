import React from 'react'
import Text from '~/components/atoms/Text'
import Title from '~/components/atoms/Title'
import Subtitle from '~/components/atoms/Subtitle'
import Link from '~/components/atoms/Link'
import styled from 'styled-components'
import parse from 'html-react-parser'

function replace(content, layer: number[] = [0]) {
  if (!content) return
  if (!Array.isArray(content)) content = [content]

  return content.map((item, i) => {
    const { props, type } = item
    const nextLayer = [...layer, layer.slice(-1)[0] + 1]
    const key = [...layer, i].join('-')
    switch (type) {
      case 'p':
        return <Text key={key}>{replace(props.children, nextLayer)}</Text>
      case 'a':
        return (
          <Link key={key} to={props.href}>
            {replace(props.children, nextLayer)}
          </Link>
        )
      case 'h1':
        return (
          <Title key={key} s4>
            {replace(props.children, nextLayer)}
          </Title>
        )
      case 'h2':
        return (
          <Title key={key} s5>
            {replace(props.children, nextLayer)}
          </Title>
        )
      case 'h3':
        return (
          <Title key={key} s6>
            {replace(props.children, nextLayer)}
          </Title>
        )
      case 'h4':
        return (
          <Subtitle key={key} s1>
            {replace(props.children, nextLayer)}
          </Subtitle>
        )
      case 'h5':
      case 'h6':
        return (
          <Subtitle key={key} s2>
            {replace(props.children, nextLayer)}
          </Subtitle>
        )
      default:
        return !type
          ? item
          : React.createElement(
              type,
              { ...props, key },
              replace(props.children, nextLayer)
            )
    }
  })
}

export default function Dynamic({ children }) {
  if (!children) return null

  const content = replace(parse(children)).map((item, i) =>
    item.type ? item : <Text key={`root-${i}`}>{item}</Text>
  )

  return <S.Dynamic>{content}</S.Dynamic>
}

const S = {
  Dynamic: styled.div`
    color: ${({ theme }) => theme[theme.topic](theme.variant).on()};
    margin: 0 !important;
    padding: 0 !important;
  `,
}
