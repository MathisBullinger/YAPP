import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, timing } from '~/styles'
import { Title, Progress } from '~/components/atoms'
import { useSelector } from 'react-redux'
import ReduxState from '~/store/state'
import Back from './appbarActions/Back'
import Search from './appbarActions/Search'
import Settings from './appbarActions/Settings'
import { mapKeys } from '~/utils'

const actions = mapKeys({ Back, Search, Settings }, k => k.toLowerCase())

export default function Appbar() {
  const title = useSelector((state: ReduxState) => state.appbar.title)
  const barActions = useSelector((state: ReduxState) => state.appbar.actions)
  const loading = useSelector((state: ReduxState) => state.appbar.loading)
  const scrollDir = useSelector((state: ReduxState) => state.scroll.direction)
  const hideOnScroll = useSelector(
    (state: ReduxState) => state.appbar.hideOnScroll
  )

  const [left, right] = barActions
    .reduce(
      (a, c) =>
        !(c.name.toLowerCase() in actions)
          ? a
          : [
              [...a[0], ...(c.align === 'left' ? [c.name.toLowerCase()] : [])],
              [...a[1], ...(c.align === 'right' ? [c.name.toLowerCase()] : [])],
            ],
      [[], []]
    )
    .map((arr, right) =>
      arr.map(action =>
        React.createElement(actions[action], {
          key: action,
          align: right ? 'right' : 'left',
        })
      )
    )

  return (
    <ThemeProvider theme={{ topic: 'surface' }}>
      <S.Appbar data-hidden={hideOnScroll && (scrollDir || 'up') === 'down'}>
        {left}
        <Title s5>{title}</Title>
        {right}
        <Progress active={loading} />
      </S.Appbar>
    </ThemeProvider>
  )
}

namespace S {
  export const Appbar = styled.div`
    z-index: 2000;
    position: fixed;
    display: flex;
    width: 100vw;
    height: ${layout.mobile.appbarHeight};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(0.8)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};
    transition: background-color ${timing.colorSwap}, transform ${
    timing.appbarHidden
  };
    flex-direction: row;
    align-items: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .action.right:first-of-type {
      margin-left: auto;
    }

    .action.left {
      margin-left: -.5rem;
      margin-right: 1rem;
    }

    & > * {
      margin: 0;
    }

    &[data-hidden="true"] {
      transform: translateY(-100%);
    }
  `
}
const StyledBar = S.Appbar
export { StyledBar }
