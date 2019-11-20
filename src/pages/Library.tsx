import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from '~/utils/hooks'
import styled from 'styled-components'
import Podcast from './library/Podcast'
import { CardGrid } from '~/components/organisms'
import { responsive } from '~/styles'
import { send } from '~/systems'
import { fetchLibrary } from '~/store/actions'
import { useMatchMedia } from '~/utils/hooks'
import steps from './library/steps'
// @ts-ignore
import { useHistory } from 'react-router-dom'

function Library() {
  const dispatch = useDispatch()
  const sub = useSelector(state => state.subscriptions)
  const subscriptions = sub.length > 0 ? sub : new Array(50).fill('')
  const podcasts = useSelector(state => state.podcasts.byId)
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    send('interaction', 'startListenMousePos')
    const fetchIds = subscriptions.filter(id => id && !(id in podcasts))
    if (fetchIds.length) dispatch(fetchLibrary(...fetchIds))
    return () => send('interaction', 'stopListenMousePos')
  })

  const method = useSelector(state => state.interaction.method)
  const navOnSide = useMatchMedia(responsive.navOnSide)

  function open(itunesId: string) {
    if (itunesId) history.push(`/podcast/${itunesId}`)
  }

  return (
    <S.Library ref={ref}>
      {steps.length > 0 && (
        <CardGrid>
          {subscriptions.map((id, i) => (
            <Podcast
              key={i}
              isSpaced={navOnSide}
              method={method}
              podcast={podcasts[id]}
              steps={steps}
              onClick={open}
            />
          ))}
        </CardGrid>
      )}
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
