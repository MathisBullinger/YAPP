import React from 'react'
import styled from 'styled-components'
import { Text } from '~/components/atoms'
import { responsive } from '~/styles'

interface Props {
  name: string
  text: string
  action: JSX.Element
}

const Item: React.FunctionComponent<Props> = props => (
  <S.Item>
    <Text label={props.name}>{props.text}</Text>
    {props.action}
  </S.Item>
)
export default Item

const S = {
  Item: styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 2rem;

    @media ${responsive.navOnSide} {
      margin-bottom: 1.6rem;
    }

    & > * {
      margin: 0;
    }
  `,
}
