import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, timing } from '~/styles'
import { Title, Progress } from '~/components/atoms'
import { useSelector } from 'react-redux'
import ReduxState from '~/store/state'

// @ts-ignore
import actionImport from './appbarActions/**.*'
const actions = Object.fromEntries(
  Object.entries(actionImport).map(([k, v]) => [
    k.toLowerCase(),
    Object.values(v)[0].default,
  ])
)

export default function Appbar() {
  const title = useSelector((state: ReduxState) => state.appbar.title)
  const barActions = useSelector((state: ReduxState) => state.appbar.actions)
  const loading = useSelector((state: ReduxState) => state.appbar.loading)

  const [left, right] = barActions
    .reduce(
      (a, c) =>
        !(c.name.toLowerCase() in actions)
          ? a
          : [
              [...a[0], ...(c.align === 'left' ? [c.name.toLowerCase()] : [])],
              [...a[1], ...(c.align === 'right' ? [c.name.toLowerCase()] : [])],
            ],
      [[], []]
    )
    .map((arr, right) =>
      arr.map(action =>
        React.createElement(actions[action], {
          key: action,
          align: right ? 'right' : 'left',
        })
      )
    )

  return (
    <ThemeProvider theme={{ topic: 'surface' }}>
      <S.Appbar>
        {left}
        <Title s5>{title}</Title>
        {right}
        <Progress active={loading} />
      </S.Appbar>
    </ThemeProvider>
  )
}

namespace S {
  export const Appbar = styled.div`
    z-index: 2000;
    position: fixed;
    display: flex;
    width: 100vw;
    height: ${() => layout.mobile.appbarHeight};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(2)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};
    transition: background-color ${() => timing.colorSwap};
    flex-direction: row;
    align-items: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .action.right:first-of-type {
      margin-left: auto;
    }

    .action.left {
      margin-left: -.5rem;
      margin-right: 1rem;
    }

    & > * {
      margin: 0;
    }
  `
}
const StyledBar = S.Appbar
export { StyledBar }
