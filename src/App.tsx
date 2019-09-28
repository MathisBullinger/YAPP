import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Mainnav, Appbar, Toolbar } from '~/components/organisms'
import { Page } from '~/components/templates'
import Routes from './Routes'
import getTheme from '~/styles/theme'
import { responsive } from '~/styles'
import State from './store/state'
import { useSelector, useDispatch } from 'react-redux'
import { useMatchMedia } from '~/utils/hooks'
import { toggleDarkMode } from '~/store/actions'

export default function App() {
  const theme = useSelector((state: State) => state.theme.current)
  const manualDark = useSelector((state: State) => state.theme.manualOverride)
  const appbarAllowed = useMatchMedia(responsive.appbarVisible)
  const appbarRequested = useSelector((state: State) => state.appbar.visible)
  const toolbarAllowed = useMatchMedia(responsive.toolbarVisible)
  const toolbarRequested = useSelector((state: State) => state.toolbar.visible)
  const darkPreferred = useMatchMedia('(prefers-color-scheme: dark)')
  const dispatch = useDispatch()

  if (!manualDark && (theme !== 'light') !== darkPreferred)
    dispatch(toggleDarkMode())

  useEffect(() => {
    document.body.style.backgroundColor = getTheme(theme).background().color
  })

  return (
    <ThemeProvider
      theme={{ ...getTheme(theme), topic: 'background', variant: 0 }}
    >
      <Router>
        {appbarAllowed && appbarRequested && <Appbar />}
        {toolbarAllowed && toolbarRequested && <Toolbar />}
        <Mainnav />
        <Page>
          <Routes />
        </Page>
      </Router>
    </ThemeProvider>
  )
}
