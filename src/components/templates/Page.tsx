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
    height: calc(100vh - ${() => layout.mobile.navHeight});
    overflow: scroll;
    margin-bottom: ${() => layout.mobile.navHeight};
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
