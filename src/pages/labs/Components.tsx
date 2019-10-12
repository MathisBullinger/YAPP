import React from 'react'
import styled from 'styled-components'
import { Card, Progress, Spinner } from '~/components/atoms'

export default function Compoents() {
  return (
    <S.Components>
      <Card>
        <Progress active={true} />
      </Card>
      <Card>
        <Spinner />
      </Card>
    </S.Components>
  )
}

const S = {
  Components: styled.div`
    display: flex;

    & > div {
      position: relative;
    }
  `,
}
