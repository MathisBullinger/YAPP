import React from 'react'

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <input type="checkbox" onInput={e => this.props.onInput && this.props.onInput(e.target.checked)}></input>
    )
  }
}
