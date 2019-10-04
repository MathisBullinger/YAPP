import React from 'react'
import styled from 'styled-components'

interface Props {
  time: string
}

export default function TimeStamp({ time }: Props) {
  return <S.Time>{time}</S.Time>
}

const S = {
  Time: styled.time`
    display: block;
    color: ${({ theme }) => theme[theme.topic](theme.variant).on('medium')};

    font-size: 0.85rem;
    width: 4rem;
    text-align: center;
  `,
}
