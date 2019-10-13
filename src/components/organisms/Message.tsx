import React from 'react'
import styled from 'styled-components'
import { layout, responsive, shadow, timing } from '~/styles'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import { Text, Button } from '~/components/atoms'
import { send } from '~/systems'

export default function Message() {
  const player = useSelector((state: State) => state.player.visible)
  const state = useSelector((state: State) => state.useCom)
  if (!state.show) return null
  return (
    <S.Message data-player={player ? 'visible' : 'hidden'}>
      <Text>{state.text}</Text>
      {state.type === 'request' && (
        <S.Responses>
          <Button text onClick={() => send('usecom', 'response', 'deny')}>
            deny
          </Button>
          <Button onClick={() => send('usecom', 'response', 'allow')}>
            allow
          </Button>
        </S.Responses>
      )}
    </S.Message>
  )
}

const S = {
  Message: styled.div`
    position: fixed;
    z-index: 1898;
    display: block;
    padding: 1rem;

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
    min-height: 5rem;

    background-color: ${({ theme }) => theme.surface(theme.variant).color};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' && `box-shadow: ${shadow(2)};`}
    ${({ theme }) =>
      theme.elevationMode === 'border' &&
      `border: 0.2rem solid ${theme.surface(theme.variant).on('medium')};`}
    transition: background-color ${timing.colorSwap};

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

    & > p:first-child {
      margin-top: 0;
    }
  `,

  Responses: styled.div`
    display: block;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;

    & > *:not(:last-child) {
      margin-right: 1rem;
    }
  `,
}
