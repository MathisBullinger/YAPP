import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { responsive, layout, timing } from '~/styles'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import { Title } from '~/components/atoms'
import { mapKeys } from '~/utils'
import Search from './toolbarActions/Search'

const toolActions = mapKeys({ Search }, k => k.toLowerCase())

export default function Toolbar() {
  const title = useSelector((data: State) => data.toolbar.title)
  const actions = useSelector((data: State) => data.toolbar.actions)

  return (
    <ThemeProvider theme={{ topic: 'background' }}>
      <S.Toolbar>
        <Title s4>{title}</Title>
        {actions
          .map(a => a.toLowerCase())
          .filter(a => a in toolActions)
          .map(action =>
            React.createElement(toolActions[action], { key: action })
          )}
      </S.Toolbar>
    </ThemeProvider>
  )
}

const S = {
  Toolbar: styled.div`
    position: fixed;
    top: 0;
    --nav-width: 0px;
    left: var(--nav-width);
    width: calc(100vw - var(--nav-width));
    height: ${layout.toolbarHeight};
    display: flex;
    flex-direction: row;
    align-items: center;
    --side-padding: 2rem;
    padding-left: var(--side-padding);
    padding-right: var(--side-padding);
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    transition: background-color ${timing.colorSwap};

    & > * {
      margin: 0;
    }

    @media ${responsive.navOnSide} {
      --nav-width: ${layout.desktop.navWidth};
      --side-padding: 4rem;
    }

    @media ${responsive.navCollapsed} {
      --nav-width: ${layout.desktop.navWidthCollapsed};
    }

    .action:first-of-type {
      margin-left: auto;
    }
  `,
}
