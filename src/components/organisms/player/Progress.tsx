import React, { useRef, useEffect, useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useCanvasSize, useMatchMedia } from '~/utils/hooks'
import { useSelector } from '~/utils/hooks'
import { store } from '~/store'
import { blendHexColorString } from '~/utils'
import Total from './progress/Total'
import Current from './progress/Current'
import createRenderer from './progress/render'
import { responsive } from '~/styles'

export default function Progress() {
  const canvasRef = useRef(null)
  const theme = useContext(ThemeContext)
  const totalLength = useSelector(state => state.player.length)
  const playState = useSelector(state => state.player.state)
  const fetching = useSelector(state => state.player.fetching)
  const buffered = useSelector(state => state.player.buffered)
  const [width, height] = useCanvasSize(canvasRef)
  const [hovered, setHovered] = useState(false)
  const [ctx, setCtx] = useState(null)
  const isDesktop = useMatchMedia(responsive.navOnSide)

  const canvas = canvasRef.current
  useEffect(() => {
    if (canvas)
      setCtx((canvasRef.current as HTMLCanvasElement).getContext('2d'))
  }, [canvas])

  useEffect(() => {
    if (width === 0 || height === 0) return

    const renderer = createRenderer(ctx, width, height, !isDesktop)
    let shouldUpdateProgress = playState === 'playing'
    let shouldUpdateLoading = fetching

    const color = {
      progress: !hovered
        ? theme[theme.topic](theme.variant).on('high')
        : theme.primary().color,
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
      knob: theme[theme.topic](theme.variant).on('high'),
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
      if (shouldUpdateLoading)
        renderer.loading(color.background, height / (isDesktop ? 9 : 3))
      else
        renderer.bar(
          1,
          color.background,
          isDesktop ? height / 3 : height,
          ...(!isDesktop ? [false, false] : [true, true])
        )
      renderer.bar(
        buffered / totalLength,
        color.buffer,
        isDesktop ? height / 3 : height,
        ...(isDesktop
          ? [true, true]
          : [false, buffered / totalLength >= 1 ? false : true])
      )
      renderer.bar(
        progress / totalLength,
        color.progress,
        isDesktop ? height / 3 : height,
        ...(isDesktop
          ? [true, true]
          : [false, buffered / totalLength >= 1 ? false : true])
      )
      if (hovered && isDesktop)
        renderer.circle(color.knob, progress / totalLength, height / 3)
      if (shouldUpdateProgress || shouldUpdateLoading)
        requestAnimationFrame(render)
    }

    render()

    return () => {
      shouldUpdateProgress = false
      shouldUpdateLoading = false
    }
  }, [
    width,
    height,
    theme,
    totalLength,
    playState,
    buffered,
    hovered,
    fetching,
    ctx,
    isDesktop,
  ])

  function handleClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const { x, width, height } = canvasRef.current.getBoundingClientRect()
    const v = (e.pageX - x - height / 3) / (width - (height / 3) * 2)
    if (v < 0 || v > 1) return
    // send('audio', 'goto', v * totalLength)
  }

  return (
    <S.Progress>
      {isDesktop && <Current />}
      <S.Bar
        ref={canvasRef}
        width={`${width}px`}
        height={`${height}px`}
        aria-busy={fetching}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={handleClick}
      ></S.Bar>
      {isDesktop && <Total />}
    </S.Progress>
  )
}

const S = {
  Progress: styled.div`
    width: 100%;

    position: absolute;
    top: 100%;
    transform: translateY(-100%);

    @media ${responsive.navOnSide} {
      position: initial;
      top: initial;
      transform: initial;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  `,

  Bar: styled.canvas`
    position: relative;
    width: 100%;
    height: 0.4rem;

    @media ${responsive.navOnSide} {
      height: 1.2rem;
      width: calc(100% - 10rem);
    }
  `,
}
