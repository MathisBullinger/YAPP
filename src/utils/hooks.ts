import { useState, useEffect, MutableRefObject } from 'react'
import debounce from 'lodash/debounce'

export function useMatchMedia(query: string) {
  const [match, setMatch] = useState(true)

  function handleEvent(e: MediaQueryListEvent | MediaQueryList) {
    setMatch(e.matches)
  }

  useEffect(() => {
    const mql = window.matchMedia(query)
    handleEvent(mql)
    mql.onchange = handleEvent

    return () => {
      mql.onchange = null
    }
  })

  return match
}

export function useSize(ref: MutableRefObject<any>) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleChange = debounce(
    ([entry]) => {
      setWidth(entry.contentRect.width)
      setHeight(entry.contentRect.height)
    },
    200,
    { leading: false, trailing: true }
  )

  useEffect(() => {
    // @ts-ignore
    const sizeOb = new ResizeObserver(handleChange)

    sizeOb.observe(ref.current)

    return () => sizeOb.disconnect()
  }, [handleChange, ref])

  return [width, height]
}
