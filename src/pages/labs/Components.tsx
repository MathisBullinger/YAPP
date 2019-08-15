import React from 'react'
import Component from '~/utils/component'
import styled from 'styled-components'
import {
  Title,
  Text,
  Switch,
  Checkbox,
  Dropdown,
  Card,
  Icon,
} from '~/components/atoms'
import Showcase from './components/Showcase'

export default class Components extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ComponentsPage>
        <Title s1>Components</Title>
        <div className="components">
          <Showcase>
            <Title>The quick brown fox jumps over the lazy dog</Title>
          </Showcase>
          <Showcase>
            <Text>The quick brown fox jumps over the lazy dog</Text>
          </Showcase>
          <Showcase>
            <Switch />
          </Showcase>
          <Showcase>
            <Checkbox />
          </Showcase>
          <Showcase>
            <Dropdown
              items={'The quick brown fox jumps over the lazy dog'.split(' ')}
            />
          </Showcase>
          <Showcase>
            <Card />
          </Showcase>
          <Showcase>
            <Icon />
          </Showcase>
        </div>
      </ComponentsPage>
    )
  }
}

const ComponentsPage: any = styled.div`
  .components {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 4rem;
  }

  & > h1 {
    margin-bottom: 4rem;
  }
`
