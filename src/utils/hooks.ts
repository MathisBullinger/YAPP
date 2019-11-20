import { useState, useEffect, MutableRefObject } from 'react'
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux'
import debounce from 'lodash/debounce'
import ResObs from 'resize-observer-polyfill'

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

export function useCanvasSize(ref: MutableRefObject<any>) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleChange = debounce(
    ([entry]) => {
      setWidth(entry.contentRect.width * devicePixelRatio)
      setHeight(entry.contentRect.height * devicePixelRatio)
    },
    200,
    { leading: false, trailing: true }
  )

  useEffect(() => {
    // @ts-ignore
    const sizeOb = new (window.ResizeObserver || ResObs)(handleChange)

    sizeOb.observe(ref.current)

    return () => sizeOb.disconnect()
  }, [handleChange, ref])

  return [width, height]
}

export function useWidth(ref: MutableRefObject<any>) {
  const [width, setWidth] = useState(0)

  const handleChange = debounce(
    ([entry]) => {
      setWidth(entry.contentRect.width)
    },
    200,
    { leading: false, trailing: true }
  )

  useEffect(() => {
    // @ts-ignore
    const sizeOb = new (window.ResizeObserver || ResObs)(handleChange)

    sizeOb.observe(ref.current)

    return () => sizeOb.disconnect()
  }, [handleChange, ref])

  return width
}

export function useWindowWidth() {
  const [width, setWidth] = useState(innerWidth)

  const handleChange = debounce(() => {
    if (window.innerWidth !== width) setWidth(window.innerWidth)
  })

  useEffect(() => {
    window.addEventListener('resize', handleChange)
    return () => window.removeEventListener('resize', handleChange)
  })

  return width
}

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector
export { useDispatch }
