const articleMethods: { [k: string]: (v: string) => string } = {
  include: v => v,
  ignore: v => v.replace(/^(?:a|an|the)(.+)/, '$1'),
  append: v => v.replace(/^(a|an|the)(.+)/, '$2, $1'),
}
const strPrep: typeof articleMethods = Object.fromEntries(
  Object.entries(articleMethods).map(([k, v]) => [k, s => v(s).trim()])
)

type Options<T> = {
  cmp?: (a: string, b: string) => number
  articles?: 'include' | 'ignore' | 'append'
} & (T extends string ? {} : { selector: (v: T) => string })

export default <T>(
  list: T[],
  {
    cmp = (a, b) => a.localeCompare(b),
    selector = (v: unknown) => v as string,
    articles = 'include',
  }: Options<T> & { [v: string]: any }
): T[] => {
  const select = (v: T) => strPrep[articles](selector(v))
  return list.sort((a, b) => cmp(select(a), select(b)))
}
