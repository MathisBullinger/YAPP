import React, { useState, useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import State from '~/store/state'
import styled, { ThemeContext } from 'styled-components'
import { Title, Subtitle, Text, Artwork, Dynamic } from '~/components/atoms'
import { EpisodeList, Episode } from '~/components/organisms'
import { responsive } from '~/styles'
import { useMatchMedia } from '~/utils/hooks'
import { hexToRGB, luminance, contrast } from '~/utils'

interface RouteParams {
  id: string
}
interface Props extends RouteComponentProps<RouteParams> {}

function Podcast(props: Props) {
  const podcast = useSelector(
    (state: State) => state.podcasts.byId[props.match.params.id]
  )
  const dispatch = useDispatch()
  const fetching = useSelector((state: State) => state.podcasts.fetching)
  const theme = useContext(ThemeContext)
  const background = theme[theme.topic](theme.variant).color

  if (!fetching && !(podcast && podcast._fetched))
    dispatch({
      type: 'FETCH_PODCAST',
      value: props.match.params.id,
    })

  if (podcast && podcast.colors && podcast.colors.length) {
    const lBack = luminance(...hexToRGB(background))
    const colors = podcast.colors.map(({ name, value }) => ({
      name,
      value,
      contrast: contrast(lBack, luminance(...hexToRGB(value))),
    }))
    const [muted, vibrant] = ['Muted', 'Vibrant'].map(
      s =>
        colors
          .filter(({ name }) => name.includes(s))
          .reduce((a, c) => (c.contrast >= a.contrast ? c : a)).value
    )
    Object.assign(theme, { muted, vibrant })
  }

  const desktop = useMatchMedia(responsive.navOnSide)

  const description = podcast && podcast.description
  const Descr = description && description.startsWith('\u200c') ? Dynamic : Text

  const [episode, setEpisode] = useState(null)
  function openEpisode(id: string) {
    setEpisode(id)
  }

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
          {desktop && <Descr>{description}</Descr>}
        </div>
        <Artwork
          artworks={podcast && podcast.artworks}
          size={desktop ? 14 : 6}
        />
      </S.Head>
      <EpisodeList
        handleOpen={openEpisode}
        episodes={podcast && podcast.episodes ? podcast.episodes : []}
      />
      <Episode id={episode} close={() => setEpisode(null)} />
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

      *:nth-child(2n) {
        color: ${({ theme }) => theme.vibrant};
      }
    }

    picture {
      flex-shrink: 0;
      img {
        border-radius: 0.25rem;
      }
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
