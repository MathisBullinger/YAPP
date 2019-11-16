import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Podcast from './library/Podcast'
import { CardGrid } from '~/components/organisms'
import { responsive } from '~/styles'
import { send } from '~/systems'
import State from '~/store/state'
import { fetchPodcast } from '~/store/actions'

function Library() {
  useEffect(() => {
    send('interaction', 'startListenMousePos')
    return () => send('interaction', 'stopListenMousePos')
  })

  const sub = useSelector((state: State) => state.subscriptions)
  const subscriptions = sub.length > 0 ? sub : new Array(50).fill('')

  const dispatch = useDispatch()
  const podcasts = useSelector((state: State) => state.podcasts.byId)
  subscriptions
    .filter(id => id)
    .forEach(id => {
      if (!(id in podcasts)) dispatch(fetchPodcast(id, true))
    })

  return (
    <S.Library>
      <CardGrid>
        {subscriptions.map((id, i) => (
          <Podcast cl={(i % 7) / 7} key={i} itunesId={id} />
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
