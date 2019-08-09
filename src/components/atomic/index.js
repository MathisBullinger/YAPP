import imp from './**.*'

const atoms = Object.fromEntries(
  Object.entries(imp)
    .filter(([k]) => k !== 'index')
    .map(([k, v]) => [k, v[Object.keys(v)[0]].default])
)

const Text = atoms.Text
const Page = atoms.Page
const Title = atoms.Title
export { Text, Page, Title }
