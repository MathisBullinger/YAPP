import imp from './**.*'

const organisms = Object.fromEntries(
  Object.entries(imp)
    .filter(([k]) => k !== 'index')
    .map(([k, v]) => [k, v[Object.keys(v)[0]].default])
)

const Mainnav = organisms.Mainnav
export { Mainnav }
