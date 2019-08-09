import React from 'react'

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <select onInput={e => this.handleInput(e)}>
        {this.props.items &&
          this.props.items.map(item => <option key={item}>{item}</option>)}
      </select>
    )
  }

  handleInput(e) {
    if (typeof this.props.onInput !== 'function') return
    this.props.onInput(e.target.value)
  }
}
