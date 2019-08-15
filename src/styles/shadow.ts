export const shadowConf = {
  baseColor: [0, 0, 0],
  scale: 2.5,
  ambient: true,
  spot: true,
  blur: true,
  spread: true,
}

const ambientBlur = el =>
  !shadowConf.blur ? '0px' : `${el * shadowConf.scale}px`
const ambientAlpha = el => `${(1 / 2 ** (el / 10)) * 0.7 * 100}%`

const ambientShadow = el =>
  `0 0 ${ambientBlur(el)} rgba(${[
    ...shadowConf.baseColor,
    ambientAlpha(el),
  ].join()})`

const spotOff = el => `0 ${el * shadowConf.scale}px`
const spotBlur = el => (!shadowConf.blur ? '0px' : `${el * shadowConf.scale}px`)
const spotSpread = el => (!shadowConf.spread ? '0px' : `${el * 0.2}px`)
const spotAlpha = el => `${(1 / 2 ** (el / 40)) * 0.5 * 100}%`

const spotShadow = el =>
  `${spotOff(el)} ${spotBlur(el)} ${spotSpread(el)} rgba(${[
    ...shadowConf.baseColor,
    spotAlpha(el),
  ].join()})`

export default el =>
  [shadowConf.ambient && ambientShadow(el), shadowConf.spot && spotShadow(el)]
    .filter(s => s)
    .join()
