import React from 'react'
import styled from 'styled-components'
import { Title, Card, Switch, Text } from '~/components/atoms'
import { Labeled } from '~/components/molecules'
import { shadowConf } from '~/styles/shadow'

export default class Shadow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'white',
    }
  }

  render() {
    return (
      <ShadowPage>
        <Title>Shadow Demo</Title>
        <div className="control-panel">
          <Labeled
            for={
              <Switch value={'on'} onInput={v => this.toggleAmbientShadow(v)} />
            }
          >
            ambient
          </Labeled>
          <Labeled
            for={
              <Switch value={'on'} onInput={v => this.toggleSpotShadow(v)} />
            }
          >
            spot
          </Labeled>
          <Labeled
            for={<Switch value={'on'} onInput={v => this.toggleBlur(v)} />}
          >
            blur
          </Labeled>
          <Labeled
            for={<Switch value={'on'} onInput={v => this.toggleSpread(v)} />}
          >
            spread
          </Labeled>
          <Labeled
            for={
              <input
                type="color"
                onInput={e => this.changeShadowColor((e.target as any).value)}
              />
            }
          >
            shadow color
          </Labeled>
        </div>
        <div className="card-wrap">
          {new Array(20).fill(0).map((e, i) => (
            <Card el={i + 1} key={i}>
              <Text>{i + 1}</Text>
            </Card>
          ))}
        </div>
      </ShadowPage>
    )
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

const ShadowPage = styled.div`
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
