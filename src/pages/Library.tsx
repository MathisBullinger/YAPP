import React from 'react'
import styled from 'styled-components'
import Podcast from './library/Podcast'
import { CardGrid } from '~/components/organisms'
import { responsive } from '~/styles'

class Library extends React.Component {
  podcasts = new Array(50).fill(0)

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <S.Library>
        <CardGrid>
          {this.podcasts.map((_, i) => (
            <Podcast cl={(i % 7) / 7} key={i} />
          ))}
        </CardGrid>
      </S.Library>
    )
  }
}
// @ts-ignore
Library.pageConf = {
  showAppbar: true,
  appbarTitle: 'Library',
  hideAppbarOnScroll: true,
}
export default Library

namespace S {
  export const Library = styled.div`
    display: grid;
    margin: -2rem;
    overflow: auto;

    @media ${responsive.navOnSide} {
      margin: initial;
    }
  `
}
