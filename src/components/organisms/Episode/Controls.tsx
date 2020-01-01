import React from 'react'
import styled from 'styled-components'
import { IconButton } from '~/components/atoms'

// interface Props {
//   episode: Episode
// }

export default function Controls() {
  function togglePlay() {}

  return (
    <S.Controls>
      <IconButton label="play" icon="playCircle" onClick={togglePlay} />
    </S.Controls>
  )
}

const S = {
  Controls: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid
      ${({ theme }) => theme[theme.topic](theme.variant).on('disabled')};
    border-bottom: 1px solid
      ${({ theme }) => theme[theme.topic](theme.variant).on('disabled')};

    ${IconButton.sc} {
      height: 2.8rem;
      width: 2.8rem;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  `,
}
