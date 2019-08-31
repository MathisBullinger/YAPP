import React from 'react'
import styled from 'styled-components'
import { responsive, layout, timing } from '~/styles'
import { ThemeProvider } from 'styled-components'
import { StyledBar as Appbar } from '~/components/organisms/Appbar'
import { StyledBar as Toolbar } from '~/components/organisms/Toolbar'
import handleScroll from '~/utils/scroll'

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
    height: calc(100vh - ${layout.mobile.navHeight} - ${({ theme }) =>
    theme.appbar ? layout.mobile.appbarHeight : '0rem'});
    margin-bottom: ${layout.mobile.navHeight};
    flex-grow: 1;
    overflow: auto;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    transition: background-color ${timing.colorSwap};

    @media ${responsive.navOnSide} {
      margin-left: ${layout.desktop.navWidth};
      height: 100vh;
      margin-bottom: 0;
      padding-left: 4rem;
    }

    ${Appbar} ~ & {
      padding-top: calc(2rem + ${layout.mobile.appbarHeight});
      height: calc(100vh - ${layout.mobile.navHeight});
    }

    ${Toolbar} ~ & {
      margin-top: ${layout.toolbarHeight};
      height: calc(100vh - ${layout.toolbarHeight} - ${
    layout.mobile.navHeight
  });

      @media ${responsive.navOnSide} {
        height: calc(100vh - ${layout.toolbarHeight});
      }
    }

    @media ${responsive.navCollapsed} {
      margin-left: ${layout.desktop.navWidthCollapsed};
    }
  `
}
