import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Page } from '~/components/templates'
import Routes from './Routes'
import getTheme from '~/styles/theme'
import { responsive, timing } from '~/styles'
import { useSelector, useDispatch, useMatchMedia } from '~/utils/hooks'
import action from '~/store/actions'
import sunCalc from 'suncalc'
import { Mainnav, Toolbar, Player, Message } from '~/components/organisms'
import { scrollbar } from '~/utils/interaction'

export default function App() {
  const theme = useSelector(state => state.theme.current)
  const useSystemDark = useSelector(
    state => state.theme.useSystem && !state.theme.manualOverride
  )
  const useGeoDark = useSelector(state => state.theme.darkAtNight)
  const toolbarAllowed = useMatchMedia(responsive.toolbarVisible)
  const toolbarRequested = useSelector(state => state.toolbar.visible)
  const darkPreferred = useMatchMedia('(prefers-color-scheme: dark)')
  const dispatch = useDispatch()
  const timeProm = useDayTime(useGeoDark)
  const [daytime, setDaytime] = useState('unknown')
  useCustomScrollBar()

  useEffect(() => {
    if (!useSystemDark) return
    if ((theme !== 'light') !== darkPreferred)
      dispatch(action('TOGGLE_DARK_MODE', darkPreferred))
  }, [useSystemDark, theme, darkPreferred, dispatch])

  timeProm.then(time => {
    if (time !== daytime) setDaytime(time)
  })
  if (
    useGeoDark &&
    daytime !== 'unknown' &&
    (daytime === 'day') !== (theme === 'light')
  )
    dispatch(action('TOGGLE_DARK_MODE', daytime !== 'day'))

  useEffect(() => {
    document.body.style.backgroundColor = getTheme(theme).background().color
  })

  useEffect(() => {
    setTimeout(() => {
      document.body.style.transition = `background-color ${timing.colorSwap}`
    })
  }, [])

  return (
    <ThemeProvider
      theme={{ ...getTheme(theme), topic: 'background', variant: 0 }}
    >
      <Router>
        {toolbarAllowed && toolbarRequested && <Toolbar />}
        <Mainnav />
        <Page>
          <Routes />
        </Page>
        <Player />
        <Message />
      </Router>
    </ThemeProvider>
  )
}

function useCustomScrollBar() {
  const os = useSelector(state => state.platform.os)
  const theme = useSelector(state => state.theme.current)

  useEffect(() => {
    if (os !== 'windows') return
    document.documentElement.dataset.os = 'windows'
    document.documentElement.dataset.scrollbar = 'inactive'
    const callback = (v: boolean) => {
      document.documentElement.dataset.scrollbar = v ? 'active' : 'inactive'
    }
    scrollbar.subscribe(callback)
    return () => scrollbar.unsubscribe(callback)
  }, [os])

  useEffect(() => {
    if (os !== 'windows') return
    document.documentElement.style.setProperty(
      '--scrollbar-color',
      getTheme(theme)
        .background(0)
        .on('disabled')
    )
    document.documentElement.style.setProperty(
      '--background-color',
      getTheme(theme).background(0).color
    )
  }, [theme, os])
}

function useDayTime(allowed: boolean): Promise<'unknown' | 'day' | 'night'> {
  const [daytime, setDaytime] = useState(Promise.resolve('unknown'))

  useEffect(() => {
    if (!allowed) return

    setDaytime(
      new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { sunrise, sunset } = sunCalc.getTimes(
            new Date(),
            coords.latitude,
            coords.longitude
          )
          const [now, rise, set] = [
            new Date(),
            new Date(Date.parse(sunrise)),
            new Date(Date.parse(sunset)),
          ].map(date => date.getHours() * 60 + date.getMinutes())
          if (now >= rise && now <= set) resolve('day')
          else resolve('night')
        })
      })
    )
  }, [allowed])

  return daytime as Promise<'unknown' | 'day' | 'night'>
}

// function onScroll() {
//   handleScroll(window.scrollY)
// }
