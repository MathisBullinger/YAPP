import React from 'react'
import styled from 'styled-components'
import { Card, Progress, Spinner, Button } from '~/components/atoms'

export default function Compoents() {
  return (
    <S.Components>
      <Card>
        <Progress active={true} />
      </Card>
      <Card>
        <Spinner />
      </Card>
      <Card>
        <Button>Button</Button>
      </Card>
      <Card>
        <Button outlined>Button</Button>
      </Card>
      <Card>
        <Button text>Button</Button>
      </Card>
    </S.Components>
  )
}

const S = {
  Components: styled.div`
    display: flex;
    flex-wrap: wrap;

    & > div {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  `,
}
