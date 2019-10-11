import React, { useState, MouseEvent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import State from '~/store/state'
import { responsive } from '~/styles'
import { IconButton, Title, Artwork, Subtitle } from '~/components/atoms'
import { Shownotes } from '~/components/molecules'
import { useMatchMedia } from '~/utils/hooks'
import { fetchEpisode } from '~/store/actions'

interface Props {
  id: string
  close(): void
}

export default function Episode(props: Props) {
  const [pId, eId] = (props.id || '').split(' ')
  const podcast = useSelector((state: State) => pId && state.podcasts.byId[pId])
  const episode =
    podcast && eId && podcast.episodes.find(({ id }) => id === `${pId} ${eId}`)
  const dispatch = useDispatch()
  if (!episode._fetched && props.id) dispatch(fetchEpisode(props.id))
  const [hidden, setHidden] = useState(true)
  const isDesktop = useMatchMedia(responsive.navOnSide)

  if (!episode !== hidden) setHidden(!episode)

  function handleClick({ clientX, clientY, target }: MouseEvent) {
    const {
      left,
      right,
      top,
      bottom,
    } = (target as HTMLDivElement).getBoundingClientRect()
    if (clientX < left || clientX > right || clientY < top || clientY > bottom)
      props.close()
  }

  const onKeyDown = ({ keyCode }) => keyCode === 27 && props.close()
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <ThemeProvider theme={{ topic: 'surface' }}>
      <S.Episode data-hidden={hidden} onClick={handleClick}>
        <IconButton
          icon={isDesktop ? 'close' : 'arrow_down'}
          label="hide"
          onClick={props.close}
        />
        {episode && (
          <S.Content>
            <S.Head>
              <Artwork
                artworks={
                  episode.artworks && episode.artworks.length
                    ? episode.artworks
                    : podcast.artworks
                }
                size={isDesktop ? 8 : 6}
              />
              <div className="text">
                <Title s5>{episode.title}</Title>
                <Subtitle s1={isDesktop} s2={!isDesktop}>
                  {podcast.name}
                </Subtitle>
              </div>
            </S.Head>
            <Shownotes episodeId={props.id} />
          </S.Content>
        )}
      </S.Episode>
    </ThemeProvider>
  )
}

const S = {
  Episode: styled.div`
    position: fixed;
    z-index: 5000;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    overflow-y: scroll;
    --side-padding: 1.5rem;

    transition: transform 0.3s ease-in-out;
    &[data-hidden='true'] {
      transform: translateX(-50%) translateY(100vh);
      transition: transform 0.5s ease-in-out, hidden 0.5s;
      display: hidden;
    }

    @media ${responsive.navOnSide} {
      transition: none;
      max-width: 100vw;
      max-height: 100vh;
      min-width: 600px;
      min-height: 500px;
      width: 40vw;
      height: 70vh;
      transform-style: preserve-3d;
      border-radius: 0.25rem;
      overflow-y: initial;

      button:first-child {
        position: absolute;
        right: 1rem;
        top: 1rem;
      }

      &:not([data-hidden='true']) {
        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 200vw;
          height: 200vh;
          transform: translateX(-100vw) translateY(-100vh) translateZ(-1px);
          background-color: #0005;
          backdrop-filter: blur(1px);
        }
      }

      &[data-hidden='true'] {
        transition: none;
      }
    }
  `,

  Content: styled.div`
    width: 100%;

    @media ${responsive.navOnSide} {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  `,

  Head: styled.div`
    display: flex;
    padding: var(--side-padding);
    padding-top: 0;
    padding-bottom: 1rem;
    flex-direction: row-reverse;
    justify-content: space-between;

    .text {
      margin-right: 1rem;

      *:last-child {
        color: ${({ theme }) =>
          theme.vibrant || theme.primary(theme.variant).color};
      }
    }

    @media ${responsive.navOnSide} {
      flex-direction: row;
      justify-content: flex-start;
      padding-top: var(--side-padding);

      .text {
        margin-left: 1rem;
        margin-right: 0;
      }
    }
  `,
}
