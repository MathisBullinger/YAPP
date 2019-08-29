export const mapObj = (
  obj: object,
  func: (k: string, v: any) => object
): object =>
  Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => func(k, v))
      .map(Object.entries)
      .flat()
  )

export const mapKeys = (obj: Object, func: (k: string) => string) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [func(k), v]))

export const mapValues = (obj: Object, func: (v: any) => any) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]))
