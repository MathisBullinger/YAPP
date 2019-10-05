export default function(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  noBuffer = false
) {
  const buffer = noBuffer ? 0 : height / 3
  width -= buffer * 2

  function bar(
    progress: number,
    color: string,
    barHeight = height / 3,
    roundLeft = true,
    roundRight = true
  ) {
    progress = Math.max(0, Math.min(progress, 1))
    ctx.fillStyle = color
    ctx.fillRect(
      buffer + (roundLeft ? barHeight / 2 : 0),
      height / 2 - barHeight / 2,
      Math.max(
        width * progress -
          (roundLeft ? barHeight / 2 : 0) -
          (roundRight ? barHeight / 2 : 0),
        0
      ),
      barHeight
    )
    if (roundLeft) {
      ctx.beginPath()
      ctx.arc(
        buffer + Math.min(barHeight / 2, progress * width),
        height / 2,
        Math.max(Math.min(barHeight / 2, progress * width), 0),
        Math.PI / 2,
        -Math.PI / 2
      )
      ctx.fill()
    }
    if (roundRight) {
      ctx.beginPath()
      ctx.arc(
        buffer + Math.max(width * progress - barHeight / 2, 0),
        height / 2,
        Math.max(Math.min(barHeight / 2, progress * width), 0),
        -Math.PI / 2,
        Math.PI / 2
      )
      ctx.fill()
    }
  }

  function loading(color: string, barHeight = height / 9) {
    ctx.fillStyle = color
    const spacing = width / ((width / 30) | 0)
    const offset = ((performance.now() % 30000) / 30000) * width
    for (let i = 0; i < width / spacing; i++) {
      let posX = buffer + ((i * spacing - offset) % width)
      if (posX < buffer) posX += width
      ctx.beginPath()
      ctx.arc(posX, height / 2, barHeight, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function circle(color: string, x: number, radius: number) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(buffer + x * width, height / 2, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  return {
    bar,
    loading,
    circle,
  }
}
