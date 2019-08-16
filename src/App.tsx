import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Mainnav, Appbar } from '~/components/organisms'
import { Page } from '~/components/templates'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { toggleDarkMode, setTheme } from './store/actions'
import { Themes, Theme } from './styles/theme'
import { theme, responsive } from '~/styles'
import Routes from './Routes'

interface Props {
  theme: 'light' | 'dark'
  toggleDarkMode(value?: boolean): void
  setTheme(value: Themes): void
  showAppbar: boolean
}

interface State {
  theme: Theme
  allowAppbar: boolean
  showAppbar: boolean
}

class App extends React.Component<Props, State> {
  state = {
    theme: theme('light'),
    allowAppbar: true,
    showAppbar: true,
  }

  render() {
    return (
      <ThemeProvider
        theme={{
          ...this.state.theme,
          ...{
            topic: 'background',
            variant: 0,
            appbar: this.state.allowAppbar && this.state.showAppbar,
          },
        }}
      >
        <Router>
          <Appbar />
          <Mainnav />
          <Page>
            <Routes />
          </Page>
        </Router>
      </ThemeProvider>
    )
  }

  static getDerivedStateFromProps(props) {
    const newTheme = theme(props.theme)
    document.documentElement.style.backgroundColor = newTheme.background().color
    return {
      theme: newTheme,
      showAppbar: props.showAppbar,
    }
  }

  componentDidMount() {
    const matchSystem = ({ matches: dark }) => {
      if ((this.props.theme === 'dark') !== dark) this.props.toggleDarkMode()
    }
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    colorScheme.onchange = matchSystem
    matchSystem(colorScheme)

    const setAppbar = ({ matches }) => {
      this.setState({ allowAppbar: matches })
    }
    const appbar = window.matchMedia(responsive.appbarVisible)
    appbar.onchange = setAppbar
    setAppbar(appbar)
  }
}

export default connect(
  ({ theme, appbarVisible }) => ({ theme, showAppbar: appbarVisible }),
  { toggleDarkMode, setTheme }
)(App)
