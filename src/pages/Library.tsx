import React, { useEffect } from 'react'
import { useSelector, useDispatch } from '~/utils/hooks'
import styled from 'styled-components'
import Podcast from './library/Podcast'
import { CardGrid } from '~/components/organisms'
import { responsive, layout } from '~/styles'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import action from '~/store/actions'
import { sameValues } from '~/utils/array'
import { useWindowWidth, useMatchMedia } from '~/utils/hooks'
import { values } from '~/styles/responsive'
import * as grid from '~/styles/cardGrid'
import { css } from '~/utils'

const gridSteps = grid.steps.map(([min, max]) => [min || 0, max || Infinity])

interface Props {
  subs: string[]
  pods: State['podcasts']['byId']
}

function Library({ subs, pods }: Props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const tileSize = useTileSize()

  useEffect(() => {
    const fetchIds = subs.length && subs.filter(id => !(id in pods))
    if (fetchIds && fetchIds.length) {
      dispatch(action('FETCH_LIBRARY', { values: fetchIds }))
    }
  }, [subs, pods, dispatch])

  function open(id: String) {
    if (id) history.push(`/podcast/${id}`)
  }

  return (
    <S.Library>
      <CardGrid>
        {subs.map(id => (
          <Podcast key={id} podcast={pods[id]} onClick={open} size={tileSize} />
        ))}
      </CardGrid>
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

function useTileSize() {
  const ww = useWindowWidth()
  const portrait = useMatchMedia('(orientation: portrait)')
  const navWidth = portrait
    ? 0
    : css.parseSize(
        ww <= values.navCollapsed.max
          ? layout.desktop.navWidthCollapsed
          : layout.desktop.navWidth
      )
  const buffer = portrait ? 0 : grid.buffer
  const gridWidth =
    ww - navWidth - (portrait ? 0 : 2 * css.parseSize(layout.page.padding))
  const steps =
    gridSteps.findIndex(([min, max]) => ww >= min && ww <= max) + grid.minCards
  return (gridWidth - (steps - 1) * buffer) / steps
}

const S = {
  Library: styled.div`
    display: grid;
    margin: -2rem;

    @media ${responsive.navOnSide} {
      margin: initial;
    }
  `,
}
