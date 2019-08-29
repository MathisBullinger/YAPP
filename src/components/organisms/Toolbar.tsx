import React from 'react'
import styled from 'styled-components'
import { responsive, layout } from '~/styles'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import { Title } from '~/components/atoms'

export default function Toolbar() {
  const title = useSelector((data: State) => data.toolbar.title)

  return (
    <S.Toolbar>
      <Title s4>{title}</Title>
    </S.Toolbar>
  )
}

namespace S {
  export const Toolbar = styled.div`
    position: fixed;
    top: 0;
    --nav-width: 0px;
    left: var(--nav-width);
    width: calc(100vw - var(--nav-width));
    height: ${layout.toolbarHeight};
    border-bottom: 1px dotted red;
    display: flex;
    flex-direction: row;
    align-items: center;
    --side-padding: 2rem;
    padding-left: var(--side-padding);
    padding-right: var(--side-padding);

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
  `
}
const StyledBar = S.Toolbar
export { StyledBar }
