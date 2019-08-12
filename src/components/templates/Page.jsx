import React from 'react'
import styled from 'styled-components'
import { responsive, layout } from '~/styles'

export default class Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <PageTag responsive={responsive} layout={layout}>
        {this.props.children}
      </PageTag>
    )
  }
}

const PageTag = styled.div`
  padding: 4rem;
  padding-top: 2rem;
  min-height: calc(100vh - 4rem);
  margin-bottom: 4rem;
  box-sizing: border-box;

  @media ${({ responsive }) => responsive.navOnSide} {
    margin-left: ${({ layout }) => layout.desktop.navWidth};
  }
`
