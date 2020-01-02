import React from 'react'
import styled from 'styled-components'
import { Text } from '~/components/atoms'
import { responsive } from '~/styles'

interface Props {
  name?: string
  text: string
  action: JSX.Element | string
}

const Item: React.FunctionComponent<Props> = props => (
  <S.Item>
    <Text label={props.name || props.text}>{props.text}</Text>
    {typeof props.action !== 'string' ? (
      props.action
    ) : (
      <S.TextValue>{props.action}</S.TextValue>
    )}
  </S.Item>
)
export default Item

const S = {
  Item: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    @media ${responsive.navOnSide} {
      margin-bottom: 1.6rem;
    }

    & > * {
      margin: 0;
    }
  `,

  TextValue: styled(Text)`
    margin-left: 1rem;
    overflow-x: auto;
    user-select: text;
  `,
}
