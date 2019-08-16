import React from 'react'
import styled from 'styled-components'
import { responsive, layout, timing } from '~/styles'
import { ThemeProvider } from 'styled-components'

const Page: React.FunctionComponent = props => (
  <ThemeProvider theme={{ topic: 'background' }}>
    <S.Page>{props.children}</S.Page>
  </ThemeProvider>
)
export default Page

namespace S {
  export const Page = styled.div`
    padding: 2rem;
    // prettier-ignore
    height: calc(100vh - ${() => layout.mobile.navHeight} - ${({ theme }) =>
    theme.appbar ? layout.mobile.appbarHeight : 0});
    ${({ theme }) =>
      !theme.appbar ? '' : `margin-top: ${layout.mobile.appbarHeight};`}
    margin-bottom: ${() => layout.mobile.navHeight};
    flex-grow: 1;
    overflow: auto;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    transition: background-color ${() => timing.colorSwap};

    @media ${() => responsive.navOnSide} {
      margin-left: ${() => layout.desktop.navWidth};
      height: 100vh;
      margin-bottom: 0;
      padding-left: 4rem;
    }

    @media ${() => responsive.navCollapsed} {
      margin-left: ${() => layout.desktop.navWidthCollapsed};
    }
  `
}
