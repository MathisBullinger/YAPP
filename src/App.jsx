import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Library from '~/pages/Library'
import Feed from '~/pages/Feed'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'
import { Mainnav } from 'organisms'
import Lab from '~/pages/Lab'
import labs from './pages/labs/**.*sx'
import NotFound from '~/pages/NotFound'
import { Page } from 'templates'

class App extends React.Component {
  render() {
    return (
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
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
