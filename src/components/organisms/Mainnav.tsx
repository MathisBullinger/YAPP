import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { shadow, responsive, layout, timing } from '~/styles'
import Item from './mainnav/Item'
import DarkmodeSwitch from './mainnav/DarkmodeSwitch'

export default class Mainnav extends React.Component<{}, { onSide: boolean }> {
  constructor(props) {
    super(props)
    const mql = window.matchMedia(responsive.navOnSide)
    this.state = {
      onSide: mql.matches,
    }
    mql.onchange = ({ matches }) =>
      this.setState({
        onSide: matches,
      })
  }

  render() {
    return (
      <ThemeProvider
        theme={{
          topic: 'surface',
          variant: this.state.onSide ? 1 : 0,
        }}
      >
        <S.Mainnav>
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
          {this.state.onSide && (
            <Item to="/settings" icon="settings" label="settings">
              Settings
            </Item>
          )}
          <DarkmodeSwitch />
        </S.Mainnav>
      </ThemeProvider>
    )
  }

  static navOnSide() {
    return window.matchMedia(responsive.navOnSide).matches
  }
}

namespace S {
  export const Mainnav = styled.div`
    z-index: 2000;
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    width: 100vw;
    height: ${() => layout.mobile.navHeight};
    display: block;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    transition: background-color ${() => timing.colorSwap};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(2)};` : ''}

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    @media ${() => responsive.navOnSide} {
      height: 100vh;
      width: ${() => layout.desktop.navWidth};
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 4rem;
    }

    @media ${() => responsive.navCollapsed} {
      width: ${() => layout.desktop.navWidthCollapsed};
      padding-left: 0;
      padding-right: 0;
      align-items: center;
    }
  `
}
