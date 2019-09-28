import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import State from '~/store/state'
import styled from 'styled-components'
import { Title, Subtitle, Text, Artwork } from '~/components/atoms'
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
        <Artwork
          artworks={podcast && podcast.artworks}
          size={desktop ? 14 : 6}
        />
      </S.Head>
      <EpisodeList
        episodes={podcast && podcast.episodes ? podcast.episodes : []}
      />
    </div>
  )
}

export default withRouter(Podcast) as React.ComponentClass<{}>

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
      flex-shrink: 0;
      border-radius: 0.25rem;
    }

    @media ${responsive.navOnSide} {
      flex-direction: row-reverse;
      justify-content: flex-end;

      div {
        padding-left: 3rem;
      }
    }
  `,
}
