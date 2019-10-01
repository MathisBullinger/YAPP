import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import State from '~/store/state'

export default function Progress() {
  const length = useSelector((state: State) => state.player.length)
  const epiProgress = useSelector((state: State) => state.player.progress)
  const playerState = useSelector((state: State) => state.player.state)
  const [progress, setProgress] = useState(epiProgress)
  const playing = playerState === 'playing'

  let timeoutId
  if (playing) timeoutId = setTimeout(() => setProgress(progress + 0.5), 500)
  useEffect(() => () => clearTimeout(timeoutId))

  return (
    <S.Progress
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={length}
      aria-valuenow={progress}
    >
      <div />
    </S.Progress>
  )
}

function formatTime(totalSeconds: number, crop = false): string {
  totalSeconds |= 0
  const seconds = totalSeconds % 60
  const minutes = ((totalSeconds - seconds) / 60) % 60
  const hours = (totalSeconds - minutes * 60 - seconds) / 60 ** 2

  let timeStr = [hours, minutes, seconds]
    .map(n => ('0' + n).substr(-2))
    .join(':')

  if (crop)
    while (timeStr.length && ['0', ':'].includes(timeStr[0]))
      timeStr = timeStr.substring(1)

  return timeStr
}

let _tstr: string
const S = {
  Progress: styled.div`
    width: 100%;
    height: 0.4rem;
    background-color: gray;
    position: relative;
    margin-left: 2rem;
    margin-right: 2rem;

    &::before,
    &::after {
      color: ${({ theme }) => theme[theme.topic](theme.variant).on()};
      font-size: 0.8rem;
      position: absolute;
      display: block;
      top: 50%;
    }

    &::before {
      content: "${props =>
        formatTime(props['aria-valuenow']).substr(
          -((_tstr && _tstr.length) || 4)
        )}";
      left: -1rem;
      transform: translateX(-100%) translateY(-50%);
    }
    &::after {
      content: "${props => (
        (_tstr = formatTime(props['aria-valuemax'], true)), _tstr
      )}";
      left: calc(100% + 1rem);
      transform: translateY(-50%);
    }

    & > div {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      height: 100%;
      width: ${props =>
        (props['aria-valuenow'] / props['aria-valuemax']) * 100}%;
      background-color: blue;
    }
  `,
}
