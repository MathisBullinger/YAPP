import React, { useState } from 'react'
import styled from 'styled-components'
import { responsive } from '~/styles'
import { useMatchMedia } from '~/utils/hooks'
import { IconButton } from '~/components/atoms'
import { timing } from '~/styles'
import Subscribe from './Subscribe'
import Description from './Description'

interface Props {
  id?: string
}

export default function Mobile({ id }: Props) {
  const desktop = useMatchMedia(responsive.navOnSide)
  const [expanded, setExpanded] = useState(false)
  if (desktop) return null

  return (
    <S.Mobile>
      <S.Toolbar>
        <Subscribe id={id} compact={true} expanded={expanded} />
        <S.Expand data-expanded={expanded}>
          <IconButton
            icon="arrow_down"
            onClick={() => setExpanded(!expanded)}
            label="toggle description"
          />
        </S.Expand>
      </S.Toolbar>
      {expanded && <Description id={id} />}
    </S.Mobile>
  )
}

const S = {
  Mobile: styled.div``,

  Toolbar: styled.div`
    margin: 1rem 0;
    display: flex;
    height: 2.2rem;
    align-items: center;
  `,

  Expand: styled.div`
    margin-left: auto;
    display: block;
    height: 24px;
    margin-right: 5px;
    transition: transform ${timing.colorSwap} ease;
    border-radius: 50%;

    &[data-expanded='true'] {
      transform: rotateZ(180deg);
    }
  `,
}
