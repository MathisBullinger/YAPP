import React from 'react'
import styled from 'styled-components'
import { layout, responsive, shadow } from '~/styles'
import { useSelector } from 'react-redux'
import State from '~/store/state'

export default function Message() {
  const player = useSelector((state: State) => state.player.visible)
  return <S.Message data-player={player ? 'visible' : 'hidden'} />
}

const S = {
  Message: styled.div`
    position: fixed;
    z-index: 1898;
    display: block;

    --left: 0px;
    --bottom: ${layout.mobile.navHeight};
    --margin: 0px;

    &[data-player='visible'] {
      --bottom: calc(
        ${layout.mobile.navHeight} + ${layout.mobile.playerHeight}
      );
    }

    left: calc(var(--left) + var(--margin));
    bottom: calc(var(--bottom) + var(--margin));
    width: calc(100vw - var(--left) - 2 * var(--margin));
    height: 200px;

    background-color: ${({ theme }) => theme.surface(theme.variant).color};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' && `box-shadow: ${shadow(2)};`}
    ${({ theme }) =>
      theme.elevationMode === 'border' &&
      `border: 0.2rem solid ${theme.surface(theme.variant).on('medium')};`}

    @media ${responsive.navOnSide} {
      --left: ${layout.desktop.navWidth};
      --bottom: 0px;
      --margin: 1rem;

      &[data-player='visible'] {
        --bottom: ${layout.desktop.playerHeight};
      }
    }

    @media ${responsive.navCollapsed} {
      --left: ${layout.desktop.navWidthCollapsed};
    }
  `,
}
