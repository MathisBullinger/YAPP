import React from 'React'
import { Page } from '~/components/templates'
import { Title } from '~/components/atoms'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Page>
        <Title s4>Test</Title>
      </Page>
    )
  }
}
