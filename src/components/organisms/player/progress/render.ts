export default function(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  function bar(progress: number, color: string, barHeight = height / 3) {
    progress = Math.min(progress, 1)
    ctx.fillStyle = color
    ctx.fillRect(
      barHeight / 2,
      height / 2 - barHeight / 2,
      Math.max(width * progress - barHeight, 0),
      barHeight
    )
    ctx.beginPath()
    ctx.arc(
      Math.min(barHeight / 2, progress * width),
      height / 2,
      Math.min(barHeight / 2, progress * width),
      Math.PI / 2,
      -Math.PI / 2
    )
    ctx.fill()
    ctx.beginPath()
    ctx.arc(
      width * progress - barHeight / 2,
      height / 2,
      Math.min(barHeight / 2, progress * width),
      -Math.PI / 2,
      Math.PI / 2
    )
    ctx.fill()
  }

  function loading(color: string, barHeight = height / 9) {
    ctx.fillStyle = color
    const spacing = width / ((width / 30) | 0)
    const offset = ((performance.now() % 30000) / 30000) * width
    for (let i = 0; i < width / spacing; i++) {
      let posX = (i * spacing - offset) % width
      if (posX < 0) posX += width
      ctx.beginPath()
      ctx.arc(posX, height / 2, barHeight, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return {
    bar,
    loading,
  }
}
