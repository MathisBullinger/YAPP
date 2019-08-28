import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Mainnav, Appbar } from '~/components/organisms'
import { Page } from '~/components/templates'
import Routes from './routes'
import getTheme from '~/styles/theme'
import { responsive } from '~/styles'
import State from './store/state'
import { useSelector } from 'react-redux'
import { useMatchMedia } from '~/utils/hooks'

export default function App() {
  const theme = useSelector((state: State) => state.theme.current)
  const appbarRequested = useSelector((state: State) => state.appbar.visible)
  const appbarAllowed = useMatchMedia(responsive.appbarVisible)

  return (
    <ThemeProvider
      theme={{ ...getTheme(theme), topic: 'background', variant: 0 }}
    >
      <Router>
        {appbarAllowed && appbarRequested && <Appbar />}
        <Mainnav />
        <Page>
          <Routes />
        </Page>
      </Router>
    </ThemeProvider>
  )
}
