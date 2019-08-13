import React from 'react'
import styled from 'styled-components'
import { shadow, responsive, layout } from '~/styles/'
import Item from './mainnav/Item'

export default class Mainnav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <S.Mainnav>
        <Item to="/" icon="library">
          Library
        </Item>
        <Item to="/feed" icon="subscriptions">
          Feed
        </Item>
        <Item to="/discover" icon="search">
          Discover
        </Item>
        <Item to="/profile" icon="person">
          Profile
        </Item>
      </S.Mainnav>
    )
  }
}

namespace S {
  export const Mainnav = styled.div`
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    width: 100vw;
    height: 4rem;
    display: block;
    background-color: ${({ theme }) => theme.surface.color};
    box-shadow: ${shadow(4)};

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
      padding-top: 2rem;

      .item {
        margin-bottom: 2rem;
      }
    }

    @media ${() => responsive.navCollapsed} {
      width: ${() => layout.desktop.navWidthCollapsed};
      padding-left: 0;
      align-items: center;
    }
  `
}
