export const cardSize = 180
export const buffer = 20
export const minCards = 3
export const sizes = new Array(15)
  .fill(0)
  .map((_, i) => i + minCards)
  .map(n => n * (cardSize + buffer) - buffer)

export const steps = sizes.map((s, i) => [
  i > 0 && s,
  i < sizes.length - 1 && sizes[i + 1] - 1,
])
