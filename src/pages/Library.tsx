import React, { useEffect } from 'react'
import styled from 'styled-components'
import Podcast from './library/Podcast'
import { CardGrid } from '~/components/organisms'
import { responsive } from '~/styles'
import { send } from '~/systems'

function Library() {
  useEffect(() => {
    send('interaction', 'startListenMousePos')
    return () => send('interaction', 'stopListenMousePos')
  })

  const podcasts = new Array(50).fill(0)

  return (
    <S.Library>
      <CardGrid>
        {podcasts.map((_, i) => (
          <Podcast cl={(i % 7) / 7} key={i} />
        ))}
      </CardGrid>
    </S.Library>
  )
}

export default Object.assign(Library, {
  pageConf: {
    showAppbar: true,
    appbarTitle: 'Library',
    hideAppbarOnScroll: true,
  },
})

const S = {
  Library: styled.div`
    display: grid;
    margin: -2rem;
    overflow: auto;

    @media ${responsive.navOnSide} {
      margin: initial;
    }
  `,
}
