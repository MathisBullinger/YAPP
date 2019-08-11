import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Library from '~/pages/Library'
import Feed from '~/pages/Feed'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'
import { Mainnav } from 'molecules'
import Lab from '~/pages/Lab'
import labs from './pages/labs/**.*sx'
import NotFound from '~/pages/NotFound'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Mainnav />
        <Switch>
          <Route path="/" exact component={Library} />
          <Route path="/feed/" exact component={Feed} />
          <Route path="/discover/" exact component={Discover} />
          <Route path="/profile/" exact component={Profile} />
          <Route path="/lab/" exact component={Lab} />
          {Object.entries(labs).map(([k, v]) => (
            <Route
              key={k}
              path={`/lab/${k.toLowerCase()}`}
              exact
              component={Object.values(v)[0].default}
            />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
