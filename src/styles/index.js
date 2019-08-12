import imp from './**.*'

const styles = Object.fromEntries(
  Object.entries(imp)
    .filter(([k]) => k !== 'index')
    .map(([k, v]) => [k, v[Object.keys(v)[0]].default])
)

const shadow = styles.shadow
const typography = styles.typography
const responsive = styles.responsive
const layout = styles.layout
export { shadow, typography, responsive, layout }
