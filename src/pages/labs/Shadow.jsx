import React from 'react'
import styled from 'styled-components'
import { Page, Title, Dropdown, Card, Switch, Text } from 'atoms'
import { Labeled } from 'molecules'
import { shadowConf } from '~styles/shadow'

export default class Shadow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'white',
    }
  }

  render() {
    return (
      <ShadowPage color={this.state.backgroundColor}>
        <Title>Shadow Demo</Title>
        <div className="control-panel">
          <Dropdown
            items={['white', 'light grey', 'dark grey']}
            onInput={c => this.handleColorChange(c)}
          ></Dropdown>
          <Labeled
            for={
              <Switch
                value={true}
                onInput={v => this.toggleAmbientShadow(v)}
              ></Switch>
            }
          >
            ambient
          </Labeled>
          <Labeled
            for={
              <Switch
                value={true}
                onInput={v => this.toggleSpotShadow(v)}
              ></Switch>
            }
          >
            spot
          </Labeled>
          <Labeled
            for={
              <Switch value={true} onInput={v => this.toggleBlur(v)}></Switch>
            }
          >
            blur
          </Labeled>
          <Labeled
            for={
              <Switch value={true} onInput={v => this.toggleSpread(v)}></Switch>
            }
          >
            spread
          </Labeled>
          <Labeled
            for={
              <input
                type="color"
                onInput={e => this.changeShadowColor(e.target.value)}
              ></input>
            }
          >
            shadow color
          </Labeled>
        </div>
        <div className="card-wrap">
          {new Array(20).fill().map((e, i) => (
            <Card el={i + 1} key={i}>
              <Text>{i + 1}</Text>
            </Card>
          ))}
        </div>
      </ShadowPage>
    )
  }

  handleColorChange(color) {
    this.setState({
      backgroundColor:
        {
          'light grey': 'rgb(229, 229, 229)',
          'dark grey': 'rgb(51, 51, 51)',
        }[color] || color,
    })
  }

  toggleAmbientShadow(v) {
    shadowConf.ambient = v
    this.forceUpdate()
  }

  toggleSpotShadow(v) {
    shadowConf.spot = v
    this.forceUpdate()
  }

  changeShadowColor(v) {
    shadowConf.baseColor = v
      .replace('#', '')
      .match(/.{1,2}/g)
      .map(v => parseInt(v, 16))
    this.forceUpdate()
  }

  toggleBlur(v) {
    shadowConf.blur = v
    this.forceUpdate()
  }

  toggleSpread(v) {
    shadowConf.spread = v
    this.forceUpdate()
  }
}

const ShadowPage = styled(Page).attrs(props => ({
  color: props.color,
}))`
  background-color: ${props => props.color};

  .control-panel {
    position: absolute;
    padding: 2rem;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-content: right;
    text-align: right;
    & > * {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  .card-wrap {
    display: flex;
    width: 100%;
    overflow: wrap;
    flex-wrap: wrap;
    margin-left: -2rem;
    margin-right: -2rem;

    div {
      margin: 2rem;
      text-align: center;
    }
  }
`
