import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Library from '~/pages/Library'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'
import { Mainnav } from 'molecules'
import Lab from '~/pages/Lab'
import labs from './pages/labs/**.*sx'
import NotFound from '~/pages/NotFound'

class App extends React.Component {
  render() {
    return (
      <div>
        <Mainnav></Mainnav>
        <Router>
          <Switch>
            <Route path="/" exact component={Library}></Route>
            <Route path="/discover/" exact component={Discover}></Route>
            <Route path="/profile/" exact component={Profile}></Route>
            <Route path="/lab/" exact component={Lab}></Route>
            {Object.entries(labs).map(([k, v]) => (
              <Route
                key={k}
                path={`/lab/${k.toLowerCase()}`}
                exact
                component={Object.values(v)[0].default}
              ></Route>
            ))}
            <Route component={NotFound}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
