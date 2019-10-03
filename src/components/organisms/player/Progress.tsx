import React, { useRef, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useCanvasSize } from '~/utils/hooks'
import { useSelector } from 'react-redux'
import State from '~/store/state'
import store from '~/store'
import { blendHexColorString } from '~/utils'
import Total from './progress/Total'
import Current from './progress/Current'
import createRenderer from './progress/render'

export default function Progress() {
  const canvasRef = useRef(null)
  const theme = useContext(ThemeContext)
  const totalLength = useSelector((state: State) => state.player.length)
  const playState = useSelector((state: State) => state.player.state)
  const buffered = useSelector((state: State) => state.player.buffered)
  const [width, height] = useCanvasSize(canvasRef)

  useEffect(() => {
    if (width === 0 || height === 0) return

    const ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d')
    const renderer = createRenderer(ctx, width, height)
    let shouldUpdateProgress = playState === 'playing'
    let shouldUpdateLoading = playState === 'loading'

    const color = {
      progress: theme.primary().color,
      buffer: blendHexColorString(
        theme[theme.topic](theme.variant)
          .on()
          .substring(0, 7) + '4A',
        theme[theme.topic](theme.variant).color
      ),
      background:
        theme[theme.topic](theme.variant)
          .on()
          .substring(0, 7) + '33',
    }

    const progLastUp = store.getState().player.progLastUpdate
    let progress =
      store.getState().player.progress +
      (!shouldUpdateProgress ? 0 : (performance.now() - progLastUp) / 1000)
    let tl = performance.now()
    function update() {
      const tn = performance.now()
      progress += (tn - tl) / 1000
      tl = tn
    }

    const render = () => {
      if (shouldUpdateProgress) update()
      ctx.clearRect(0, 0, width, height)
      if (shouldUpdateLoading) renderer.loading(color.background)
      else renderer.bar(1, color.background)
      renderer.bar(progress / totalLength, color.progress)
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
    position: relative;
    width: calc(100% - 10rem);
    height: 1.2rem;

    transition: background-color 0.5s ease;

    &[aria-busy='true'] {
      background-color: transparent;
    }
  `,
}
