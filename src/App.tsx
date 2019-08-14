import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Library from '~/pages/Library'
import Feed from '~/pages/Feed'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'
import Settings from '~/pages/Settings'
import { Mainnav } from '~/components/organisms'
import Lab from '~/pages/Lab'
// @ts-ignore
import labs from './pages/labs/**.*sx'
import NotFound from '~/pages/NotFound'
import { Page } from '~/components/templates'
import styled, { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { toggleDarkMode } from './store/actions'
import { theme } from '~/styles'

interface Props {
  theme: 'light' | 'dark'
  toggleDarkMode(value?: boolean): void
}

class App extends React.Component<Props> {
  state = {
    theme: theme('light'),
  }

  render() {
    return (
      <ThemeProvider
        theme={{
          ...this.state.theme,
          ...{ topic: 'background', variant: 0 },
        }}
      >
        <Router>
          <S.App>
            <Mainnav />
            <Page>
              <Switch>
                <Route path="/" exact component={Library} />
                <Route path="/feed/" exact component={Feed} />
                <Route path="/discover/" exact component={Discover} />
                <Route path="/profile/" exact component={Profile} />
                <Route path="/settings/" exact component={Settings} />
                <Route path="/lab/" exact component={Lab} />
                {Object.values(labs)
                  .map(m => Object.values(m)[0].default)
                  .map(lab => (
                    <Route
                      key={lab.name}
                      path={`/lab/${lab.name.toLowerCase()}`}
                      exact
                      component={lab}
                    />
                  ))}
                <Route component={NotFound} />
              </Switch>
            </Page>
          </S.App>
        </Router>
      </ThemeProvider>
    )
  }

  static getDerivedStateFromProps(props) {
    const newTheme = theme(props.theme)
    document.documentElement.style.backgroundColor = newTheme.background().color
    return {
      theme: newTheme,
    }
  }

  componentDidMount() {
    const matchSystem = ({ matches: dark }) => {
      if ((this.props.theme === 'dark') !== dark) this.props.toggleDarkMode()
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.onchange = matchSystem
    matchSystem(mql)
  }
}

export default connect(
  ({ theme }) => ({ theme }),
  { toggleDarkMode }
)(App)

namespace S {
  export const App = styled.div``
}
