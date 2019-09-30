import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import State from '~/store/state'

export default function Progress() {
  const length = useSelector((state: State) => state.player.length)
  const epiProgress = useSelector((state: State) => state.player.progress)
  const playing = useSelector((state: State) => state.player.playing)
  const [progress, setProgress] = useState(epiProgress)

  let timeoutId
  if (playing) timeoutId = setTimeout(() => setProgress(progress + 0.5), 500)
  useEffect(() => () => clearTimeout(timeoutId))

  return (
    <S.Progress
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={length}
      aria-valuenow={progress}
    />
  )
}

const S = {
  Progress: styled.div`
    width: 100%;
    height: 0.4rem;
    background-color: gray;
    position: relative;

    &::after {
      content: '';
      width: ${props =>
        (props['aria-valuenow'] / props['aria-valuemax']) * 100}%;
      height: 100%;
      background-color: blue;
      position: absolute;
      top: 0;
      left: 0;
    }
  `,
}
