import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { responsive, layout, timing } from '~/styles'
import handleScroll, { scrollbar } from '~/utils/scroll'
import State from '~/store/state'

const Page: React.FunctionComponent = props => {
  const player = useSelector((state: State) => state.player.visible)
  const appbar = useSelector((state: State) => state.appbar.visible)
  const toolbar = useSelector((state: State) => state.toolbar.visible)
  const abHidden = useSelector((state: State) => state.appbar.hidden)
  const os = useSelector((state: State) => state.platform.os)
  const [scrollbarState, setScrollbarState] = useState()

  useEffect(() => {
    if (os !== 'windows') return
    const callback = (v: boolean) =>
      setScrollbarState(v ? 'active' : 'inactive')
    scrollbar.subscribe(callback)
    return () => scrollbar.unsubscribe(callback)
  }, [os])

  return (
    <ThemeProvider theme={{ topic: 'background' }}>
      <S.Page
        onScroll={e => handleScroll((e.target as HTMLDivElement).scrollTop)}
        data-player={player ? 'visible' : 'hidden'}
        data-appbar={appbar && !abHidden ? 'visible' : 'hidden'}
        data-toolbar={toolbar ? 'visible' : 'hidden'}
        {...(os === 'windows' && {
          'data-os': 'windows',
          'data-scrollbar': scrollbarState ?? 'inactive',
        })}
      >
        {props.children}
      </S.Page>
    </ThemeProvider>
  )
}
export default Page

const scrollbarWidth = 5
const S = {
  Page: styled.div`
    position: relative;
    padding: 2rem;
    overflow-x: auto;
    z-index: 1;

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

    &[data-os='windows'] {
      &::-webkit-scrollbar {
        width: ${scrollbarWidth}px;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: ${scrollbarWidth / 2}px;
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant).on('disabled')};
        transition: background-color 0.2s ease;
      }
    }

    &[data-scrollbar='inactive'] {
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant).color};
      }
    }
  `,
}
