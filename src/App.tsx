import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Page } from '~/components/templates'
import Routes from './Routes'
import getTheme from '~/styles/theme'
import { responsive, timing } from '~/styles'
import State from './store/state'
import { useSelector, useDispatch } from 'react-redux'
import { useMatchMedia } from '~/utils/hooks'
import { toggleDarkMode } from '~/store/actions'
import {
  Mainnav,
  Appbar,
  Toolbar,
  Player,
  Message,
} from '~/components/organisms'

export default function App() {
  const theme = useSelector((state: State) => state.theme.current)
  const useSystemDark = useSelector((state: State) => state.theme.useSystem)

  const toolbarAllowed = useMatchMedia(responsive.toolbarVisible)
  const toolbarRequested = useSelector((state: State) => state.toolbar.visible)
  const darkPreferred = useMatchMedia('(prefers-color-scheme: dark)')
  const dispatch = useDispatch()

  if (useSystemDark && (theme !== 'light') !== darkPreferred)
    dispatch(toggleDarkMode())

  useEffect(() => {
    document.body.style.backgroundColor = getTheme(theme).background().color
  })

  useEffect(() => {
    setTimeout(
      () =>
        (document.body.style.transition = `background-color ${timing.colorSwap}`)
    )
  }, [])

  return (
    <ThemeProvider
      theme={{ ...getTheme(theme), topic: 'background', variant: 0 }}
    >
      <Router>
        <Appbar />
        {toolbarAllowed && toolbarRequested && <Toolbar />}
        <Mainnav />
        <Page>
          <Routes />
        </Page>
        <Player />
        <Message />
      </Router>
    </ThemeProvider>
  )
}
