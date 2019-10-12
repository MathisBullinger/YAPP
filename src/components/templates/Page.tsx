import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { responsive, layout, timing } from '~/styles'
import handleScroll from '~/utils/scroll'
import State from '~/store/state'

const Page: React.FunctionComponent = props => {
  const player = useSelector((state: State) => state.player.visible)
  const appbar = useSelector((state: State) => state.appbar.visible)
  const toolbar = useSelector((state: State) => state.toolbar.visible)
  const abHidden = useSelector((state: State) => state.appbar.hidden)

  return (
    <ThemeProvider theme={{ topic: 'background' }}>
      <S.Page
        onScroll={e => handleScroll((e.target as HTMLDivElement).scrollTop)}
        data-player={player ? 'visible' : 'hidden'}
        data-appbar={appbar && !abHidden ? 'visible' : 'hidden'}
        data-toolbar={toolbar ? 'visible' : 'hidden'}
      >
        {props.children}
      </S.Page>
    </ThemeProvider>
  )
}
export default Page

const S = {
  Page: styled.div`
    position: relative;
    padding: 2rem;
    overflow-x: auto;

    pointer-events: none;
    & > * {
      pointer-events: all;
    }

    --buffer-left: 0px;
    --buffer-top: 0px;
    --buffer-bottom: ${layout.mobile.navHeight};

    @media ${responsive.navOnSide} {
      --buffer-bottom: 0px;
      --buffer-left: ${layout.desktop.navWidth};
    }

    @media ${responsive.navCollapsed} {
      --buffer-left: ${layout.desktop.navWidthCollapsed};
    }

    &[data-player='visible'] {
      --buffer-bottom: calc(
        ${layout.mobile.playerHeight} + ${layout.mobile.navHeight}
      );

      @media ${responsive.navOnSide} {
        --buffer-bottom: ${layout.desktop.playerHeight};
      }
    }

    @media ${responsive.appbarVisible} {
      transition: ${timing.appbarHidden} margin-top,
        background-color ${timing.colorSwap};

      &[data-appbar='visible'] {
        --buffer-top: ${layout.mobile.appbarHeight};
      }
    }

    @media ${responsive.toolbarVisible} {
      &[data-toolbar='visible'] {
        --buffer-top: ${layout.toolbarHeight};
      }
    }

    margin-left: var(--buffer-left);
    width: calc(100% - (var(---buffer-left)));

    margin-bottom: var(--buffer-bottom);

    margin-top: var(--buffer-top);

    height: calc(100vh - (var(--buffer-top)) - (var(--buffer-bottom)));
  `,
}
