import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useSelector } from '~/utils/hooks'
import { responsive, layout } from '~/styles'
import { handleScroll } from '~/utils/interaction'
import { Appbar } from '~/components/organisms'

const Page: React.FunctionComponent = props => {
  const player = useSelector(state => state.player.visible)
  const toolbar = useSelector(state => state.toolbar.visible)

  return (
    <ThemeProvider theme={{ topic: 'background' }}>
      <S.Page
        data-player={player ? 'visible' : 'hidden'}
        data-toolbar={toolbar ? 'visible' : 'hidden'}
        onScroll={e => {
          handleScroll((e.target as HTMLDivElement).scrollTop)
        }}
      >
        <Appbar />
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
    padding: ${layout.page.padding};
    z-index: 1;
    overflow-y: auto;

    --buffer-left: 0px;
    --buffer-top: 0px;
    --buffer-bottom: ${layout.mobile.navHeight};

    @media ${responsive.navOnSide} {
      --buffer-bottom: 0px;
      --buffer-left: ${layout.desktop.navWidth};
      overscroll-behavior: none;
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
      --buffer-top: ${layout.mobile.appbarHeight};
    }

    @media ${responsive.toolbarVisible} {
      &[data-toolbar='visible'] {
        --buffer-top: ${layout.toolbarHeight};
      }
    }

    margin-left: var(--buffer-left);
    width: calc(100% - (var(---buffer-left)));

    margin-bottom: var(--buffer-bottom);

    padding-top: calc(var(--buffer-top) + ${layout.page.padding});

    height: calc(100vh - (var(--buffer-bottom)));

    &[data-os='windows'] {
      scrollbar-width: thin;
      scrollbar-color: ${({ theme }) =>
        theme[theme.topic](theme.variant).on('disabled')};
      &::-webkit-scrollbar {
        width: ${scrollbarWidth}px;
        background-color: transparent;
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
