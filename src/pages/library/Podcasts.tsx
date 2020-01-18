import React, { useState, useEffect } from 'react'
import { useSelector } from '~/utils/hooks'
import { CardGrid } from '~/components/organisms'
import Podcast from './Podcast'
// @ts-ignore
import { useHistory } from 'react-router-dom'
import { layout } from '~/styles'
import { useWindowWidth, useMatchMedia } from '~/utils/hooks'
import { values } from '~/styles/responsive'
import * as grid from '~/styles/cardGrid'
import { css } from '~/utils'
import Fuse from 'fuse.js'
import sort from '~/utils/sort'

const gridSteps = grid.steps.map(([min, max]) => [min || 0, max || Infinity])

interface Props {
  subs: string[]
  pods: State['podcasts']['byId']
}

export default function Podcasts({ subs, pods }: Props) {
  const history = useHistory()
  const tileSize = useTileSize()
  const [imgLoaded, setImgLoaded] = useState([])
  const { search } = useSelector(state => state.library)
  const [sorted, setSorted] = useState<string[]>([])
  const [filtered, setFiltered] = useState(subs)
  const [fuse, setFuse] = useState()

  useEffect(() => {
    if (!pods || !subs) return
    setSorted(
      sort(
        subs.map(id => pods[id]).filter(v => v),
        { selector: ({ name }) => name, articles: 'append' }
      ).map(({ itunesId }) => itunesId)
    )
  }, [pods, subs])

  useEffect(() => {
    setFuse(
      new Fuse(
        subs
          .map(id => pods[id])
          .filter(pod => pod && pod.name && pod.creator && pod.itunesId),
        {
          shouldSort: true,
          keys: ['name', 'creator', 'itunesId'],
          threshold: 0.2,
        }
      )
    )
  }, [subs, pods])

  useEffect(() => {
    if (!search || !fuse) {
      setFiltered(sorted)
      return
    }
    const filter = fuse.search(search)
    setFiltered(filter.map(({ itunesId }) => itunesId))
  }, [search, sorted, pods, fuse])

  function open(id: string) {
    if (id) history.push(`/podcast/${id}`)
  }

  function onImgLoaded(id: string) {
    setImgLoaded(
      Object.assign([], imgLoaded, {
        [filtered.findIndex(sub => sub === id)]: true,
      })
    )
  }
  const loadedUpTo = imgLoaded.findIndex(v => !v) - 1

  useEffect(() => {
    if (!filtered || !filtered.length) return
    setImgLoaded(filtered.map(id => imgLoaded[id] ?? false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered])

  return (
    <CardGrid>
      {filtered.map((id, i) => (
        <Podcast
          key={id}
          podcast={pods[id]}
          onClick={open}
          size={tileSize}
          onImgLoaded={onImgLoaded}
          preLoad={i === loadedUpTo + 1}
        />
      ))}
    </CardGrid>
  )
}

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
