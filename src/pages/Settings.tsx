import React from 'react'
import styled from 'styled-components'
import { responsive, shadow } from '~/styles'
import { Text, Button } from '~/components/atoms'
import { StackedList } from '~/components/molecules'
import Item from './settings/Item'
import SwitchItem from './settings/SwitchItem'
import { useSelector, useDispatch } from '~/utils/hooks'
import { useMatchMedia } from '~/utils/hooks'
import action from '~/store/actions'
import { importOpml, exportOpml } from '~/utils/opml'

function Settings() {
  const theme = useSelector(state => state.theme)
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
                onInput={v => {
                  dispatch(action('TOGGLE_DARK_MODE', v))
                  dispatch(action('MANUAL_DARK_MODE', v))
                }}
              />,
              <SwitchItem
                text="use AMOLED dark mode"
                key="amoled"
                name="amoled"
                value={theme.useAmoled}
                onInput={v => void dispatch(action('TOGGLE_PREFER_AMOLED', v))}
              />,
              <SwitchItem
                text="use system preference"
                key="system"
                name="system"
                value={theme.useSystem}
                onInput={v =>
                  void dispatch(action('TOGGLE_DARK_USE_SYSTEM', v))
                }
              />,
              <SwitchItem
                text="use dark mode at night"
                key="night"
                name="night"
                value={theme.darkAtNight}
                onInput={v => (
                  dispatch(action('TOGGLE_DARK_AT_NIGHT', v)), false
                )}
              />,
              ...(isDesktop
                ? [
                    <SwitchItem
                      text="show darkmode toggle in navigation"
                      key="darkToggle"
                      name="show darkmode toggle"
                      value={theme.showToggle}
                      onInput={v =>
                        void dispatch(action('SHOW_DARKMODE_TOGGLE', v))
                      }
                    />,
                  ]
                : []),
            ],
          },
          {
            title: 'Import',
            items: [
              <Item
                text="import OPML"
                action={
                  <S.FileInput
                    type="file"
                    accept=".xml"
                    onChange={e => void importOpml(e.target.files[0])}
                  />
                }
                key="import"
              />,
              <Item
                text="export OPML"
                action={<Button onClick={exportOpml}>export</Button>}
                key="export"
              />,
            ],
          },
          {
            title: 'Playback',
            items: Array(20)
              .fill(0)
              .map((_, i) => <Text key={`item2${i}`}>item {i + 1}</Text>),
          },
          {
            title: 'Build',
            items: [
              <Item
                text="version"
                action={process.env.VERSION}
                key="version"
              />,
              <Item text="branch" action={process.env.BRANCH} key="branch" />,
              <Item text="commit" action={process.env.COMMIT} key="commit" />,
            ],
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
    height: calc(100vh - (var(--buffer-top)) - (var(--buffer-bottom)) - 4rem);

    @media ${responsive.navOnSide} {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  `,

  FileInput: styled.input`
    color: ${({ theme }) => theme[theme.topic](theme.variant).on('medium')};
    -webkit-appearance: none;
    text-align: left;
    -webkit-rtl-ordering: left;

    &::-webkit-file-upload-button {
      -webkit-appearance: none;
      float: right;
      margin: 0 0 0 10px;
      border-radius: 4px;

      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant).on('high')};
      color: ${({ theme }) => theme[theme.topic](theme.variant).color};
      box-shadow: ${shadow(0.5)};
    }
  `,
}
