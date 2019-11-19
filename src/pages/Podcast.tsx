import React, { useState, useContext, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import State from '~/store/state'
import styled, { ThemeContext } from 'styled-components'
import { EpisodeList, Episode } from '~/components/organisms'
import { responsive } from '~/styles'
import { useMatchMedia } from '~/utils/hooks'
import { hexToRGB, luminance, contrast } from '~/utils'
import Mobile from './podcast/Mobile'
import Description from './podcast/Description'
import Subscribe from './podcast/Subscribe'
import { Title, Subtitle, Artwork, Progress } from '~/components/atoms'

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
  const [vibrant, setVibrant] = useState(theme.primary(theme.variant).color)

  if (!fetching && (!podcast?._fetched || !('episodes' in podcast)))
    dispatch({
      type: 'FETCH_PODCAST',
      value: props.match.params.id,
    })

  useEffect(() => {
    if (podcast?.colors?.length) {
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

      setVibrant(vibrant)
    }
  }, [podcast, theme, background])

  if (
    vibrant.substring(0, 7) !==
    theme.primary(theme.variant).color.substring(0, 7)
  ) {
    const primary = theme.primary
    theme.primary = () => ({
      color: vibrant + primary(theme.variant).color.substring(7),
      on: primary().on,
    })
  }

  const [episode, setEpisode] = useState(null)
  function openEpisode(id: string) {
    setEpisode(id)
  }

  const desktop = useMatchMedia(responsive.navOnSide)
  return (
    <S.Podcast>
      <>
        <Progress active={fetching} />
        <S.Head>
          <S.Top>
            <S.TextSection>
              <S.TitleRow>
                <Title s4={desktop} s5={!desktop}>
                  {podcast?.name}
                </Title>
                {desktop && <Subscribe id={podcast?.itunesId} />}
              </S.TitleRow>
              <Subtitle s1={desktop} s2={!desktop}>
                {podcast?.creator}
              </Subtitle>
              {desktop && <Description id={podcast?.itunesId} />}
            </S.TextSection>
            <Artwork
              imgs={podcast?.artworks}
              size={[
                { size: '14rem', query: responsive.navOnSide },
                { size: '6rem', query: responsive.navOnBottom },
              ]}
            />
          </S.Top>
          <Mobile id={podcast?.itunesId} />
        </S.Head>
        <EpisodeList
          handleOpen={openEpisode}
          episodes={podcast?.episodes ?? []}
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
    @media ${responsive.navOnSide} {
      margin-bottom: 3rem;
    }
  `,

  Top: styled.div`
    display: flex;
    justify-content: space-between;
    overflow: auto;

    img {
      flex-shrink: 0;
      border-radius: 0.25rem;
      width: 6rem;
    }

    @media ${responsive.navOnSide} {
      flex-direction: row-reverse;
      justify-content: flex-end;

      & > div {
        padding-left: 3rem;
      }

      img {
        width: 14rem;
      }
    }
  `,

  TextSection: styled.div`
    overflow-x: hidden;
    padding-right: 1rem;
    display: block;
    width: 100%;

    & > * {
      width: 100%;
      text-overflow: ellipsis;
    }

    ${Subtitle.sc} {
      color: ${({ theme }) => theme.vibrant};
    }
  `,

  TitleRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
}
