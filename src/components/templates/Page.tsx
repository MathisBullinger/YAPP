import React from 'react'
import styled from 'styled-components'
import { responsive, layout } from '~/styles'
import { ThemeProvider } from 'styled-components'

const Page: React.FunctionComponent = props => (
  <ThemeProvider theme={{ topic: 'background' }}>
    <S.Page>{props.children}</S.Page>
  </ThemeProvider>
)
export default Page

namespace S {
  export const Page = styled.div`
    padding: 4rem;
    padding-top: 2rem;
    min-height: calc(100vh - 4rem);
    margin-bottom: 4rem;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.background.color};

    @media ${() => responsive.navOnSide} {
      margin-left: ${() => layout.desktop.navWidth};
      min-height: 100vh;
      margin-bottom: 0;
    }

    @media ${() => responsive.navCollapsed} {
      margin-left: ${() => layout.desktop.navWidthCollapsed};
    }
  `
}
