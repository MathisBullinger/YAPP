import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import State from '~/store/state'
import styled from 'styled-components'
import { Rem } from '~/utils/css'
import { Title, Subtitle } from '~/components/atoms'

interface RouteParams {
  id: string
}
interface Props extends RouteComponentProps<RouteParams> {}

function Podcast(props: Props) {
  const podcast = useSelector(
    (state: State) => state.podcasts.byId[props.match.params.id]
  )
  const dispatch = useDispatch()
  if (!podcast)
    dispatch({
      type: 'FETCH_PODCAST',
      value: props.match.params.id,
    })

  let thumbnail = null
  if (podcast && podcast.artworks.length) {
    const imgSize = new Rem(1).toPx().value * 6
    thumbnail = podcast.artworks[0]
    for (const art of podcast.artworks) {
      if (thumbnail.size < imgSize && art.size > thumbnail.size) thumbnail = art
      else if (
        thumbnail.size > imgSize &&
        art.size >= imgSize &&
        art.size < thumbnail.size
      )
        thumbnail = art
    }
    thumbnail = thumbnail.url
  }

  return (
    <div>
      <S.Head>
        <div>
          <Title s5>{podcast && podcast.name}</Title>
          <Subtitle s2>{podcast && podcast.creator}</Subtitle>
        </div>
        <img src={thumbnail} />
      </S.Head>
    </div>
  )
}

export default withRouter(Podcast) as React.ComponentClass<{}>

const S = {
  Head: styled.header`
    display: flex;
    justify-content: space-between;

    div {
      overflow-x: hidden;
      padding-right: 1rem;

      & > * {
        width: 100%;
        text-overflow: ellipsis;
      }
    }

    img {
      height: 6rem;
      width: 6rem;
      flex-shrink: 0;
      border-radius: 0.25rem;
    }
  `,
}
