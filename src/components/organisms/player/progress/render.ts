export default function(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  return {
    bar(progress: number, color: string, barHeight = height / 3) {
      ctx.fillStyle = color
      ctx.fillRect(0, height / 2 - barHeight / 2, width * progress, barHeight)
      ctx.beginPath()
      ctx.arc(
        width * progress,
        height / 2,
        barHeight / 2,
        -Math.PI / 2,
        Math.PI / 2
      )
      ctx.fill()
    },

    loading(color: string, barHeight = height / 9) {
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
    },
  }
}
