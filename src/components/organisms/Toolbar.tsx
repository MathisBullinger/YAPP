import React from 'react'
import styled from 'styled-components'
import { responsive, layout } from '~/styles'

export default function Toolbar() {
  return <S.Toolbar>Toolbar</S.Toolbar>
}

namespace S {
  export const Toolbar = styled.div`
    position: fixed;
    top: 0;
    --nav-width: 0px;
    left: var(--nav-width);
    width: calc(100vw - var(--nav-width));
    height: ${layout.toolbarHeight};
    background-color: yellow;

    @media ${responsive.navOnSide} {
      --nav-width: ${layout.desktop.navWidth};
    }

    @media ${responsive.navCollapsed} {
      --nav-width: ${layout.desktop.navWidthCollapsed};
    }
  `
}
