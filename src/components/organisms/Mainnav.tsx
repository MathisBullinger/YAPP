import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { shadow, responsive, layout, timing } from '~/styles'
import Item from './mainnav/Item'
import DarkmodeSwitch from './mainnav/DarkmodeSwitch'
import { useMatchMedia } from '~/utils/hooks'
import { useSelector } from 'react-redux'
import State from '~/store/state'

export default function Mainnav() {
  const onSide = useMatchMedia(responsive.navOnSide)
  const playerVisible = useSelector((state: State) => state.player.visible)

  return (
    <ThemeProvider
      theme={{
        topic: 'surface',
        variant: onSide ? 1 : 0,
      }}
    >
      <S.Mainnav data-player={playerVisible}>
        <Item to="/" exact icon="library" label="library">
          Library
        </Item>
        <Item to="/feed" icon="subscriptions" label="feed">
          Feed
        </Item>
        <Item to="/discover" icon="search" label="discover">
          Discover
        </Item>
        <Item to="/profile" icon="person" label="profile">
          Profile
        </Item>
        {onSide && (
          <Item to="/settings" icon="settings" label="settings">
            Settings
          </Item>
        )}
        <DarkmodeSwitch />
      </S.Mainnav>
    </ThemeProvider>
  )
}

const S = {
  Mainnav: styled.div`
    z-index: 2000;
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    width: 100vw;
    height: ${layout.mobile.navHeight};
    display: block;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    transition: background-color ${timing.colorSwap};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(2)};` : ''}

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    @media ${responsive.navOnSide} {
      top: 0;
      bottom: initial;
      height: 100vh;
      width: ${layout.desktop.navWidth};
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 4rem;
    }

    @media ${responsive.navCollapsed} {
      width: ${layout.desktop.navWidthCollapsed};
      padding-left: 0;
      padding-right: 0;
      align-items: center;
    }

    ${props =>
      props['data-player'] &&
      `
      @media ${responsive.navOnBottom} {
        box-shadow: none;
        outline: 1px solid ${props.theme[props.theme.topic](props.theme.variant)
          .on()
          .substring(0, 7)}22;
      }

      @media ${responsive.navOnSide} {
        height: calc(100vh - ${layout.desktop.playerHeight});
      }
    `}
  `,
}
