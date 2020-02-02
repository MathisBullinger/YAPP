import React, { useState, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, timing, responsive } from '~/styles'
import { Title, Progress } from '~/components/atoms'
import { useSelector } from '~/utils/hooks'
import Back from './appbarActions/Back'
import Search from './appbarActions/Search'
import Settings from './appbarActions/Settings'
import { mapKeys } from '~/utils'
import { useMatchMedia, useScrollDir } from '~/utils/hooks'
import { positionRel } from '~/utils/interaction'

const actions = mapKeys({ Back, Search, Settings }, k => k.toLowerCase())
type ScrollState = 'visible' | 'hidden' | 'transition'
const height = 56

export default function Appbar() {
  const title = useSelector(state => state.appbar.title)
  const barActions = useSelector(state => state.appbar.actions)
  const loading = useSelector(state => state.appbar.loading)
  const scrollDir = useScrollDir()
  const appbarAllowed = useMatchMedia(responsive.appbarVisible)
  const appbarRequested = useSelector(state => state.appbar.visible)
  const ref = useRef<HTMLDivElement>()

  const [scrollState, setScrollState] = useState<ScrollState>('visible')

  if (
    (scrollDir === 'down' && scrollState === 'visible') ||
    (scrollDir === 'up' && scrollState === 'hidden')
  ) {
    setScrollState('transition')
    let off = scrollState === 'visible' ? 0 : height
    const { scrollTop } = ref.current.parentElement
    ref.current.style.position = 'absolute'
    ref.current.style.top = `${
      scrollTop - (scrollState === 'hidden' ? height : 0)
    }px`
    positionRel.subscribe(function handleScroll(v: number) {
      off += v
      if (off > height) {
        setScrollState('hidden')
        return positionRel.unsubscribe(handleScroll)
      }
      if (off < 0) {
        setScrollState('visible')
        ref.current.style.position = 'fixed'
        ref.current.style.top = '0'
        return positionRel.unsubscribe(handleScroll)
      }
    })
  }

  const visible =
    (appbarAllowed ||
      document.querySelector('#root').classList.contains('fixed')) &&
    appbarRequested
  if (!visible) return null

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
      <S.Appbar ref={ref}>
        {left}
        <Title s5>{title}</Title>
        {right}
        <Progress active={loading} />
      </S.Appbar>
    </ThemeProvider>
  )
}

const S = {
  Appbar: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2000;
    display: flex;
    width: 100vw;
    height: ${layout.mobile.appbarHeight};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(0.8)};` : ''}
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
}
