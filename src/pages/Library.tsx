import React, { useEffect } from 'react'
import { useSelector, useDispatch } from '~/utils/hooks'
import styled from 'styled-components'
import Podcasts from './library/Podcasts'
import Controls from './library/Controls'
import { responsive } from '~/styles'
import action from '~/store/actions'
import { sameValues } from '~/utils/array'

interface Props {
  subs: string[]
  pods: State['podcasts']['byId']
}

function Library({ subs, pods }: Props) {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchIds = subs.length && subs.filter(id => !(id in pods))
    if (fetchIds && fetchIds.length) {
      dispatch(action('FETCH_LIBRARY', { values: fetchIds }))
    }
  }, [subs, pods, dispatch])

  return (
    <S.Library>
      <Controls />
      <Podcasts subs={subs} pods={pods} />
    </S.Library>
  )
}

const LibraryMemo = React.memo(
  Library,
  ({ subs: subOld, pods: podOld }, { subs: subNew, pods: podNew }) =>
    sameValues(subOld, subNew) &&
    sameValues(Object.keys(podOld), Object.keys(podNew))
)

export default Object.assign(
  () => {
    const subs = useSelector(state => state.subscriptions)
    const pods = useSelector(state => state.podcasts)
    return <LibraryMemo subs={subs} pods={pods.byId} />
  },
  {
    pageConf: {
      showAppbar: true,
      appbarTitle: 'Library',
      hideAppbarOnScroll: true,
    },
  }
)

const S = {
  Library: styled.div`
    display: grid;
    margin: -2rem;

    @media ${responsive.navOnSide} {
      margin: initial;
    }
  `,
}
