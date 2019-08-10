import React from 'react'
import Component from '~/utils/component'
import styled from 'styled-components'
import { Page, Title, Text } from 'atoms'
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
          <Showcase comp={Title}>
            <Title>The quick brown fox jumps over the lazy dog</Title>
          </Showcase>
          <Showcase comp={Text}>
            <Text>The quick brown fox jumps over the lazy dog</Text>
          </Showcase>
        </div>
      </ComponentsPage>
    )
  }
}

const ComponentsPage: any = styled(Page)`
  .components {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 4rem;
  }

  & > h1 {
    margin-bottom: 4rem;
  }
`
