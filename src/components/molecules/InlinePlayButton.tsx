import React from 'react'
import styled from 'styled-components'
import { IconButton } from '~/components/atoms'

interface Props {
  progress: number
  onClick(): void
  playing: boolean
}

export default function InlinePlayButton({
  playing,
  progress,
  onClick,
}: Props) {
  return (
    <S.Button>
      <IconButton
        icon={playing ? 'pause' : 'play'}
        label="play episode"
        onClick={e => (e.stopPropagation(), onClick())}
      />
      <S.ProgressCircle viewBox="0 0 30 30">
        <circle cx="15" cy="15" r="13" />
        <circle
          className="progress"
          cx="15"
          cy="15"
          r="13"
          strokeDashoffset={progress * 81.68141 * -1}
        />
      </S.ProgressCircle>
    </S.Button>
  )
}

const S = {
  Button: styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    z-index: 5;

    button {
      width: 100%;
      height: 100%;

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }

    svg {
      path {
        fill: ${({ theme }) => theme.primary().color};
        fill: ${({ theme }) => theme.vibrant};
      }
    }
  `,
  ProgressCircle: styled.svg`
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;

    circle {
      fill: transparent;
      stroke-width: 2;
      stroke: ${({ theme }) =>
        (theme.vibrant || theme.primary().color).substring(0, 7)}33;
    }

    .progress {
      transform-origin: center;
      transform: rotate(-90deg);
      stroke-dasharray: 81.68141;
      stroke: ${({ theme }) => theme.primary().color};
      stroke: ${({ theme }) => theme.vibrant};
    }
  `,
}
