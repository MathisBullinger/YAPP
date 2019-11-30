export function sameValues(arr1, arr2, comp = (a, b) => a === b) {
  if (arr1.length !== arr2.length) return false
  const arrComp = arr2.slice(0)
  for (const e1 of arr1) {
    const i = arrComp.findIndex(e2 => comp(e1, e2))
    if (i === -1) return false
    arrComp.splice(i, 1)
  }
  return true
}
