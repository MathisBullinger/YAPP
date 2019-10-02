import React, { useRef, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useSize } from '~/utils/hooks'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import store from '~/store'

export default function Progress() {
  const canvasRef = useRef(null)
  const theme = useContext(ThemeContext)
  const totalLength = useSelector((state: State) => state.player.length)
  const playState = useSelector((state: State) => state.player.state)
  const playing = playState === 'playing'
  const [width, height] = useSize(canvasRef)

  useEffect(() => {
    if (width === 0 || height === 0) return

    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    const lastKnownProgress = store.getState().player.progress
    let t0 = performance.now()

    let shouldUpdate = playing
    const renderProgress = () => {
      ctx.clearRect(0, 0, width, height)

      const progress =
        (lastKnownProgress + (performance.now() - t0) / 1000) / totalLength

      ctx.fillStyle = `${theme[theme.topic](theme.variant)
        .on()
        .substring(0, 7)}DD`
      ctx.fillRect(0, 0, width * progress, height)

      if (shouldUpdate) requestAnimationFrame(renderProgress)
    }

    renderProgress()

    return () => (shouldUpdate = false)
  }, [width, height, theme, totalLength, playing])

  return (
    <S.Bar ref={canvasRef} width={`${width}px`} height={`${height}px`}></S.Bar>
  )
}

const S = {
  Bar: styled.canvas`
    width: 100%;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: ${({ theme }) =>
      theme[theme.topic](theme.variant)
        .on()
        .substring(0, 7)}33;
  `,
}
