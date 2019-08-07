import React from 'react'
import ReactDOM from 'react-dom'

class HelloMessage extends React.Component {
  render() {
    return <div>Hello, React!</div>
  }
}

ReactDOM.render(<HelloMessage name="Yomi" />, document.getElementById('app'))
