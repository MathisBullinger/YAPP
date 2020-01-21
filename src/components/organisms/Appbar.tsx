import React, { useEffect, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, timing, responsive } from '~/styles'
import { Title, Progress } from '~/components/atoms'
import { useSelector } from '~/utils/hooks'
import Back from './appbarActions/Back'
import Search from './appbarActions/Search'
import Settings from './appbarActions/Settings'
import { mapKeys } from '~/utils'
import { useMatchMedia, useScrollDir } from '~/utils/hooks'

const actions = mapKeys({ Back, Search, Settings }, k => k.toLowerCase())

export default function Appbar() {
  const title = useSelector(state => state.appbar.title)
  const barActions = useSelector(state => state.appbar.actions)
  const loading = useSelector(state => state.appbar.loading)
  const scrollDir = useScrollDir()
  const appbarAllowed = useMatchMedia(responsive.appbarVisible)
  const appbarRequested = useSelector(state => state.appbar.visible)
  const wrapRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (!wrapRef || !wrapRef.current) return
    if (scrollDir === 'down') {
      let off =
        wrapRef.current.offsetTop +
        wrapRef.current.offsetHeight -
        window.scrollY
      wrapRef.current.style.top = `${-Math.max(4 * 14 - off, 0)}px`
      wrapRef.current.style.height = `calc(${window.scrollY}px + ${4 * 14}px)`
    } else {
      const off = Math.max(
        wrapRef.current.offsetTop +
          wrapRef.current.offsetHeight -
          window.scrollY,
        0
      )
      wrapRef.current.style.height = `${document.body.offsetHeight}px`
      wrapRef.current.style.top = `calc(${Math.max(
        window.scrollY + off,
        4 * 14
      )}px - ${document.body.offsetHeight}px)`
    }
  }, [scrollDir, wrapRef])

  const visible =
    (appbarAllowed ||
      document.querySelector('#root').classList.contains('fixed')) &&
    appbarRequested
  if (!visible) return null

  // if (hideOnScroll && ((scrollDir || 'up') === 'up') !== !hidden)
  //   dispatch(action('TOGGLE_APPBAR_HIDDEN', (scrollDir || 'up') === 'down'))

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
      <S.Wrap ref={wrapRef}>
        <S.Appbar>
          {left}
          <Title s5>{title}</Title>
          {right}
          <Progress active={loading} />
        </S.Appbar>
      </S.Wrap>
    </ThemeProvider>
  )
}

const S = {
  // prettier-ignore
  Appbar: styled.div`
    position: sticky;
    top: 0;
    display: flex;
    width: 100vw;
    height: ${layout.mobile.appbarHeight};
    ${({ theme }) => theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(0.8)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};
    transition: background-color ${timing.colorSwap};
    flex-direction: row;
    align-items: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    pointer-events: initial;

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
  `,

  Wrap: styled.div`
    height: ${layout.mobile.appbarHeight};
    width: 100vw;
    position: absolute;
    z-index: 2000;
    top: 0;
    pointer-events: none;
  `,
}
