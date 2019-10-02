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

  return (
    '#' +
    clb
      .map((_, i) => [clf[i], clb[i]])
      .map(([f, b]) =>
        (b * a + f * (1.0 - a) * 255).toString(16).substring(0, 2)
      )
      .join('')
  )
}
