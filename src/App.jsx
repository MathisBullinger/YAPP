import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import A from '~/pages/A'
import B from '~/pages/B'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/a/" component={A}></Route>
        <Route path="/b/" component={B}></Route>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
