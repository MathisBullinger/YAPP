import React, { useEffect } from 'react'
import styled from 'styled-components'
import { responsive } from '~/styles'
import { Text } from '~/components/atoms'
import { StackedList } from '~/components/molecules'
import SwitchItem from './settings/SwitchItem'
import State from '~/store/state'
import { useSelector, useDispatch } from 'react-redux'
import { useMatchMedia } from '~/utils/hooks'
import {
  toggleDarkMode,
  togglePreferAmoled,
  toggleDarkAtNight,
  manualDarkmode,
  toggleDarkUseSystem,
  showDarkmodeToggle,
} from '~/store/actions'

function Settings() {
  const theme = useSelector((state: State) => state.theme)
  const dispatch = useDispatch()
  const isDesktop = useMatchMedia(responsive.navOnSide)

  return (
    <S.Settings>
      <StackedList
        sections={[
          {
            title: 'Appearance',
            items: [
              <SwitchItem
                text="dark mode"
                key="darkmode"
                name="darkmode"
                value={theme.current !== 'light'}
                onInput={v =>
                  void (dispatch(toggleDarkMode(v)), dispatch(manualDarkmode()))
                }
              />,
              <SwitchItem
                text="use AMOLED dark mode"
                key="amoled"
                name="amoled"
                value={theme.useAmoled}
                onInput={v => void dispatch(togglePreferAmoled(v))}
              />,
              <SwitchItem
                text="use system preference"
                key="system"
                name="system"
                value={theme.useSystem}
                onInput={v => void dispatch(toggleDarkUseSystem(v))}
              />,
              <SwitchItem
                text="use dark mode at night"
                key="night"
                name="night"
                value={theme.darkAtNight}
                onInput={v => (dispatch(toggleDarkAtNight(v)), false)}
              />,
              ...(isDesktop
                ? [
                    <SwitchItem
                      text="show darkmode toggle in navigation"
                      key="darkToggle"
                      name="show darkmode toggle"
                      value={theme.showToggle}
                      onInput={v => void dispatch(showDarkmodeToggle(v))}
                    />,
                  ]
                : []),
            ],
          },
          {
            title: 'Playback',
            items: Array(100)
              .fill(0)
              .map((_, i) => <Text key={`item2${i}`}>item {i}</Text>),
          },
        ]}
      />
    </S.Settings>
  )
}

export default Object.assign(Settings, {
  pageConf: {
    showAppbar: true,
    appbarTitle: 'Settings',
    appbarActions: [{ name: 'back', align: 'left' }],
    showToolbar: true,
    toolbarTitle: 'Settings',
    hideAppbarOnScroll: true,
  },
})

const S = {
  Settings: styled.div`
    @media ${responsive.navOnSide} {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  `,
}
