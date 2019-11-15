import React, { useState, useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import State from '~/store/state'
import styled, { ThemeContext } from 'styled-components'
import { EpisodeList, Episode } from '~/components/organisms'
import { responsive } from '~/styles'
import { useMatchMedia } from '~/utils/hooks'
import { hexToRGB, luminance, contrast } from '~/utils'
import { subscribe, unsubscribe } from '~/store/actions'
import {
  Title,
  Subtitle,
  Text,
  Artwork,
  Dynamic,
  Progress,
  Button,
} from '~/components/atoms'

interface RouteParams {
  id: string
}
interface Props extends RouteComponentProps<RouteParams> {}

function Podcast(props: Props) {
  const podcast = useSelector(
    (state: State) => state.podcasts.byId[props.match.params.id]
  )
  const subscriptions = useSelector((state: State) => state.subscriptions)
  const subscribed = podcast && subscriptions.includes(podcast.itunesId)
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
    const primary = theme.primary
    theme.primary = () => ({
      color: vibrant + primary().color.substring(7),
      on: primary().on,
    })
  }

  const desktop = useMatchMedia(responsive.navOnSide)

  const description = podcast && podcast.description
  const Descr = description && description.startsWith('\u200c') ? Dynamic : Text

  const [episode, setEpisode] = useState(null)
  function openEpisode(id: string) {
    setEpisode(id)
  }

  function toggleSubscribe() {
    dispatch((subscribed ? unsubscribe : subscribe)(podcast.itunesId))
  }

  return (
    <S.Podcast>
      <>
        <Progress active={fetching} />
        <S.Head>
          <div>
            <S.TitleRow>
              <Title s4={desktop} s5={!desktop}>
                {podcast && podcast.name}
              </Title>
              <Button
                {...{ [subscribed ? 'text' : 'outlined']: true }}
                rounded
                onClick={toggleSubscribe}
              >
                {subscribed ? 'subscribed' : 'subscribe'}
              </Button>
            </S.TitleRow>
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
      </>
    </S.Podcast>
  )
}

export default withRouter(Podcast) as React.ComponentClass<{}>

const S = {
  Podcast: styled.div`
    & > ${Progress.sc} {
      top: 0;
      transform: none;
    }
  `,

  Head: styled.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;

    div {
      overflow-x: hidden;
      padding-right: 1rem;

      & > *:not(${Button.sc}) {
        width: 100%;
        text-overflow: ellipsis;
      }

      ${Subtitle.sc} {
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

      & > div {
        padding-left: 3rem;
      }
    }
  `,

  TitleRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
}
