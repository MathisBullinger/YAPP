import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import State, { Artwork } from '~/store/state'
import styled from 'styled-components'
import { Rem } from '~/utils/css'
import { Title, Subtitle, Text } from '~/components/atoms'
import { EpisodeList } from '~/components/organisms'
import { responsive } from '~/styles'
import { useMatchMedia } from '~/utils/hooks'

interface RouteParams {
  id: string
}
interface Props extends RouteComponentProps<RouteParams> {}

function Podcast(props: Props) {
  const podcast = useSelector(
    (state: State) => state.podcasts.byId[props.match.params.id]
  )
  const dispatch = useDispatch()
  if (!podcast || !podcast.episodes.length)
    dispatch({
      type: 'FETCH_PODCAST',
      value: props.match.params.id,
    })

  const desktop = useMatchMedia(responsive.navOnSide)

  const thumbnails = getArtwork(
    podcast && podcast.artworks,
    new Rem(desktop ? 14 : 6)
  )

  return (
    <div>
      <S.Head>
        <div>
          <Title s4={desktop} s5={!desktop}>
            {podcast && podcast.name}
          </Title>
          <Subtitle s1={desktop} s2={!desktop}>
            {podcast && podcast.creator}
          </Subtitle>
          {desktop && <Text>{podcast && podcast.description}</Text>}
        </div>
        <picture>
          {thumbnails
            .map(img => (
              <source
                srcSet={img.url}
                type={`image/${img.type}`}
                key={img.url}
              />
            ))
            .sort(({ type }) => (type === 'webp' ? 1 : -1))}
          <img src={thumbnails.length && thumbnails[0].url} />
        </picture>
      </S.Head>
      <EpisodeList
        episodes={podcast && podcast.episodes ? podcast.episodes : []}
      />
    </div>
  )
}

export default withRouter(Podcast) as React.ComponentClass<{}>

function getArtwork(artworks: Artwork[], sizeRem: Rem): Artwork[] {
  if (!artworks || !artworks.length) return []
  if (!artworks.find(({ size }) => size)) return artworks
  const imgSize = sizeRem.toPx().value
  let img = artworks[0]
  for (const art of artworks) {
    if (img.size === imgSize) break
    if (img.size < imgSize) {
      if (art.size > img.size) img = art
    } else if (art.size < img.size && art.size >= imgSize) img = art
  }
  return artworks.filter(art => art.size === img.size)
}

const S = {
  Head: styled.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;

    div {
      overflow-x: hidden;
      padding-right: 1rem;

      & > * {
        width: 100%;
        text-overflow: ellipsis;
      }
    }

    picture {
      height: 6rem;
      width: 6rem;
      flex-shrink: 0;
      border-radius: 0.25rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    @media ${responsive.navOnSide} {
      flex-direction: row-reverse;
      justify-content: flex-end;

      div {
        padding-left: 3rem;
      }

      picture {
        height: 14rem;
        width: 14rem;
      }
    }
  `,
}
