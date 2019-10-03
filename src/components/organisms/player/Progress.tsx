import React, { useRef, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useCanvasSize } from '~/utils/hooks'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import store from '~/store'
import { blendHexColorString } from '~/utils'
import Total from './progress/Total'
import Current from './progress/Current'

export default function Progress() {
  const canvasRef = useRef(null)
  const theme = useContext(ThemeContext)
  const totalLength = useSelector((state: State) => state.player.length)
  const playState = useSelector((state: State) => state.player.state)
  const buffered = useSelector((state: State) => state.player.buffered)
  const [width, height] = useCanvasSize(canvasRef)

  useEffect(() => {
    if (width === 0 || height === 0) return

    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    let progress = store.getState().player.progress / totalLength

    const loadingColor =
      theme[theme.topic](theme.variant)
        .on()
        .substring(0, 7) + '33'

    const progressColor = theme.primary().color

    const bufferColor = blendHexColorString(
      theme[theme.topic](theme.variant)
        .on()
        .substring(0, 7) + '4A',
      theme[theme.topic](theme.variant).color
    )

    let shouldUpdateProgress = playState === 'playing'
    let tl = performance.now()
    const renderProgress = () => {
      if (shouldUpdateProgress) {
        const tn = performance.now()
        progress = (progress * totalLength + (tn - tl) / 1000) / totalLength
        tl = tn
      }

      ctx.fillStyle = progressColor
      ctx.fillRect(0, 0, width * progress - height / 2, height)
      ctx.beginPath()
      ctx.arc(
        width * progress - height / 2,
        height / 2,
        height / 2,
        -Math.PI / 2,
        Math.PI / 2
      )
      ctx.fill()
    }

    let shouldUpdateLoading = playState === 'loading'
    const renderLoading = () => {
      if (playState !== 'loading') return
      ctx.fillStyle = loadingColor
      const spacing = width / ((width / 30) | 0)
      const offset = ((performance.now() % 30000) / 30000) * width
      for (let i = 0; i < width / spacing; i++) {
        let posX = (i * spacing - offset) % width
        if (posX < 0) posX += width
        ctx.beginPath()
        ctx.arc(posX, height / 2, height / 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const renderBuffer = () => {
      ctx.fillStyle = bufferColor
      ctx.fillRect(0, 0, (buffered / totalLength) * width, height)
      ctx.beginPath()
      ctx.arc(
        (buffered / totalLength) * width,
        height / 2,
        height / 2,
        -Math.PI / 2,
        Math.PI / 2
      )
      ctx.fill()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      renderBuffer()
      renderLoading()
      renderProgress()
      if (shouldUpdateProgress || shouldUpdateLoading)
        requestAnimationFrame(render)
    }

    render()

    return () => {
      shouldUpdateProgress = false
      shouldUpdateLoading = false
    }
  }, [width, height, theme, totalLength, playState, buffered])

  return (
    <S.Progress>
      <Current />
      <S.Bar
        ref={canvasRef}
        width={`${width}px`}
        height={`${height}px`}
        aria-busy={playState === 'loading'}
      ></S.Bar>
      <Total />
    </S.Progress>
  )
}

const S = {
  Progress: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  `,

  Bar: styled.canvas`
    width: calc(100% - 10rem);
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: ${({ theme }) =>
      theme[theme.topic](theme.variant)
        .on()
        .substring(0, 7)}33;

    transition: background-color 0.5s ease;

    &[aria-busy='true'] {
      background-color: transparent;
    }
  `,
}
