import imp from './**.*'

const molecules = Object.fromEntries(
  Object.entries(imp)
    .filter(([k]) => k !== 'index')
    .map(([k, v]) => [k, v[Object.keys(v)[0]].default])
)

const Mainnav = molecules.Mainnav
export { Mainnav }

