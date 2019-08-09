import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Library from '~/pages/Library'
import Discover from '~/pages/Discover'
import Profile from '~/pages/Profile'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Library}></Route>
        <Route path="/discover/" exact component={Discover}></Route>
        <Route path="/profile/" exact component={Profile}></Route>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
