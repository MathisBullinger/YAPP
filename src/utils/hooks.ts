import { useState, useEffect } from 'react'

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
