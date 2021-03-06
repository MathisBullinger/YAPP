import React from 'react'
import styled from 'styled-components'
import { responsive } from '~/styles'
import { useSelector, useDispatch } from '~/utils/hooks'
import { Switch } from '~/components/atoms'
import action from '~/store/actions'

export default function DarkmodeSwitch() {
  const theme = useSelector(state => state.theme.current)
  const visible = useSelector(state => state.theme.showToggle)
  const dispatch = useDispatch()

  if (!visible) return null

  return (
    <S.Wrap>
      <Switch
        inset
        value={theme !== 'light' ? 'on' : 'off'}
        onInput={v => {
          dispatch(action('MANUAL_DARK_MODE'))
          dispatch(action('TOGGLE_DARK_MODE', v))
        }}
      />
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
    position: absolute;
    bottom: 1.5rem;
    display: none;

    @media ${() => responsive.navOnSide} {
      display: initial;

      div[data-value='on'].inset {
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant)
            .on('')
            .substring(0, 7)}88;
      }
    }
  `,
}
