import React from 'react'
import styled from 'styled-components'
import { Artwork, Text } from '~/components/atoms'
import { useSelector } from '~/utils/hooks'

interface Props {
  id: string
}

export default function PlayingInfo({ id: epId }: Props) {
  const podcast = useSelector(
    state => state.podcasts.byId[(epId ?? '').split(' ')[0]]
  )
  const episode = podcast?.episodes.find(({ id }) => id === epId)
  if (!episode) return null

  return (
    <S.Info>
      <Artwork
        imgs={episode.artworks?.length ? episode.artworks : podcast.artworks}
        size="5rem"
      />
      <S.TextSection>
        <S.Episode s1>{episode.title.replace(/#[0-9.]+ (.+)/, '$1')}</S.Episode>
        <S.Podcast s2>{podcast.name}</S.Podcast>
      </S.TextSection>
    </S.Info>
  )
}

const S = {
  Info: styled.div`
    height: 5rem;
    padding-left: 0.5rem;
    display: flex;
    flex-direction: row;
    width: 100%;

    img {
      height: 100%;
      border-radius: 0.25rem;
    }
  `,

  TextSection: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
    height: 100%;
    flex-grow: 1;
    text-overflow: ellipsis;
    overflow: hidden;

    & > * {
      margin: 0;
    }
  `,

  Episode: styled(Text)`
    margin-bottom: 0.15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  `,

  Podcast: styled(Text)`
    margin-top: 0.15rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
}
