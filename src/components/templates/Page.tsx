import React from 'react'
import styled from 'styled-components'
import { responsive, layout, timing } from '~/styles'
import { ThemeProvider } from 'styled-components'
import { StyledBar as Appbar } from '~/components/organisms/Appbar'
import { StyledBar as Toolbar } from '~/components/organisms/Toolbar'
import handleScroll from '~/utils/scroll'
import store from '~/store'

const Page: React.FunctionComponent = props => {
  return (
    <ThemeProvider theme={{ topic: 'background' }}>
      <S.Page
        onScroll={e => handleScroll((e.target as HTMLDivElement).scrollTop)}
      >
        {props.children}
      </S.Page>
    </ThemeProvider>
  )
}
export default Page

namespace S {
  export const Page = styled.div`
    padding: 2rem;
    // prettier-ignore
    height: calc(100vh - ${layout.mobile.navHeight} - ${
    store.getState().player.visible ? layout.mobile.playerHeight : '0rem'
  });
    margin-bottom: calc(${layout.mobile.navHeight} + ${
    store.getState().player.visible ? layout.mobile.playerHeight : '0rem'
  });
    flex-grow: 1;
    overflow: auto;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    transition: background-color ${timing.colorSwap};

    @media ${responsive.navOnSide} {
      margin-left: ${layout.desktop.navWidth};
      height: calc(100vh - ${
        store.getState().player.visible ? layout.desktop.playerHeight : '0rem'
      });
      margin-bottom: ${
        store.getState().player.visible ? layout.desktop.playerHeight : '0rem'
      };
      padding-left: 4rem;
      padding-right: 4rem;
    }

    ${Appbar} ~ & {
      padding-top: calc(2rem + ${layout.mobile.appbarHeight});
      transition: background-color ${timing.colorSwap}, transform ${
    timing.appbarHidden
  } ease, height 0s ${timing.appbarHidden};}
    ${Appbar}[data-hidden="true"] ~ & {
      transform: translateY(-${layout.mobile.appbarHeight});
      height: 100vh;
      transition: background-color ${timing.colorSwap}, transform ${
    timing.appbarHidden
  } ease;
      margin-bottom: 0;
    }

    ${Toolbar} ~ & {
      margin-top: ${layout.toolbarHeight};
      height: calc(100vh - ${layout.toolbarHeight} - ${
    layout.mobile.navHeight
  } - ${
    store.getState().player.visible ? layout.desktop.playerHeight : '0rem'
  });

      @media ${responsive.navOnSide} {
        height: calc(100vh - ${layout.toolbarHeight} - ${
    store.getState().player.visible ? layout.desktop.playerHeight : '0rem'
  });
      }
    }

    @media ${responsive.navCollapsed} {
      margin-left: ${layout.desktop.navWidthCollapsed};
    }
  `
}
