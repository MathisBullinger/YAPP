import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, timing, responsive } from '~/styles'
import { Title, Progress } from '~/components/atoms'
import { useSelector, useDispatch } from 'react-redux'
import State from '~/store/state'
import Back from './appbarActions/Back'
import Search from './appbarActions/Search'
import Settings from './appbarActions/Settings'
import { mapKeys } from '~/utils'
import { toggleAppbarHidden } from '~/store/actions'
import { useMatchMedia } from '~/utils/hooks'

const actions = mapKeys({ Back, Search, Settings }, k => k.toLowerCase())

export default function Appbar() {
  const title = useSelector((state: State) => state.appbar.title)
  const barActions = useSelector((state: State) => state.appbar.actions)
  const loading = useSelector((state: State) => state.appbar.loading)
  let scrollDir = useSelector((state: State) => state.scroll.direction)
  const hideOnScroll = useSelector((state: State) => state.appbar.hideOnScroll)
  const hidden = useSelector((state: State) => state.appbar.hidden)
  const dispatch = useDispatch()
  const appbarAllowed = useMatchMedia(responsive.appbarVisible)
  const appbarRequested = useSelector((state: State) => state.appbar.visible)

  const visible =
    (appbarAllowed ||
      document.querySelector('#root').classList.contains('fixed')) &&
    appbarRequested
  if (!visible) return null

  if (hideOnScroll && ((scrollDir || 'up') === 'up') !== !hidden) {
    dispatch(toggleAppbarHidden((scrollDir || 'up') === 'down'))
  }

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
      <S.Appbar
        data-hidden={hideOnScroll && (scrollDir || 'up') === 'down'}
        hidden={!visible}
      >
        {left}
        <Title s5>{title}</Title>
        {right}
        <Progress active={loading} />
      </S.Appbar>
    </ThemeProvider>
  )
}

const S = {
  // prettier-ignore
  Appbar: styled.div`
    z-index: 2000;
    position: fixed;
    display: flex;
    width: 100vw;
    height: ${layout.mobile.appbarHeight};
    ${({ theme }) => theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(0.8)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};
    transition: background-color ${timing.colorSwap}, transform ${timing.appbarHidden};
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
