import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Library from '~/pages/Library'
import Feed from '~/pages/Feed'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'
import { Mainnav } from '~/components/organisms'
import Lab from '~/pages/Lab'
// @ts-ignore
import labs from './pages/labs/**.*sx'
import NotFound from '~/pages/NotFound'
import { Page } from '~/components/templates'
import { ThemeProvider } from 'styled-components'
import theme, { Themes } from '~/styles/theme'

class App extends React.Component {
  theme = theme(Themes.LIGHT)

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Router>
          <Mainnav />
          <Page>
            <Switch>
              <Route path="/" exact component={Library} />
              <Route path="/feed/" exact component={Feed} />
              <Route path="/discover/" exact component={Discover} />
              <Route path="/profile/" exact component={Profile} />
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
        </Router>
      </ThemeProvider>
    )
  }

  changeTheme(name: Themes) {
    this.theme = theme(name)
    this.forceUpdate()
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
