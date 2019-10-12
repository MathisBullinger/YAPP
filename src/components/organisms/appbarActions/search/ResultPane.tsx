import React from 'react'
import styled from 'styled-components'
import { shadow } from '~/styles'
import { PodcastStrip } from '~/components/molecules'
import { Podcast } from '~/store/state'

interface Props {
  podcasts: Podcast[]
}

const ResultPane: React.FunctionComponent<Props> = props => {
  return (
    <S.Pane>
      {(props.podcasts || []).map(podcast => (
        <PodcastStrip
          key={podcast.feed || Math.random().toString()}
          {...podcast}
        />
      ))}
    </S.Pane>
  )
}
export default ResultPane

namespace S {
  const transitionTime = '0.2s'

  export const Pane = styled.div`
    position: absolute;
    display: block;
    top: 100%;
    visibility: hidden;
    width: 100%;
    left: 0;
    background-color: inherit;
    height: 2rem;
    transition: all ${transitionTime} ease;
    box-shadow: ${shadow(1)};
    z-index: -1;
    padding: 1.5rem;
    overflow-y: scroll;

    .active > & {
      transition-delay: ${transitionTime};
      visibility: visible;
      height: calc(100vh - 100%);
    }
  `
}
