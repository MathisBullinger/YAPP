export function blendHexColorString(
  foreground: string,
  background: string
): string {
  const split = str =>
    str
      .substring(1, 7)
      .match(/.{2}/g)
      .map(v => parseInt(v, 16))

  const clb = split(background)
  const clf = split(foreground)
  const a = parseInt(foreground.substr(-2), 16) / 255

  const blend = new Array(3)
    .fill(0)
    .map((_, i) => clb[i] + (clf[i] - clb[i]) * a)
    .map(n =>
      n
        .toString(16)
        .split('.')
        .shift()
    )

  return '#' + blend.join('')
}
